/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentSpells } from '../documentationSlice';

function MagicUpdateForm(prop) {
  const {
    hide, magic, newDoc, update, errors,
  } = prop;
  const spellsList = useSelector(selectCurrentSpells);

  const getSpells = () => {
    const list = spellsList[Object.keys(spellsList)[0]]
      .filter((spell) => (!!magic.spells.find((id) => id === spell._id)));
    return list.map((spell) => ({ id: spell._id, spellName: spell.name }));
  };

  const [name, setName] = useState(magic.name);
  const [spells, setSpells] = useState([...getSpells()]);
  const [description, setDescription] = useState(magic.description);

  const changeName = (e) => setName(e.target.value);

  const changeSpells = (e) => {
    if (spells.length > 0 && spells.find((spell) => e.target.value === spell.id)) {
      return;
    }
    const { text } = e.target.options[e.target.selectedIndex];
    const spellName = text.split(' :')[0].trim();
    setSpells([...spells, { id: e.target.value, spellName }]);
  };

  const changeDescription = (e) => setDescription(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSpells = spells.map((spell) => spell.id);

    newDoc.id = magic._id;
    newDoc.name = name;
    newDoc.spells = newSpells;
    newDoc.description = description;

    update();
  };

  const removeSpell = (e) => {
    setSpells(spells.length === 1 ? [] : spells.splice(e.target.key, 1));
  };

  return (
    <div className="fixed bg-black/60 h-full w-full top-[4rem] left-0">
      <form onSubmit={handleSubmit} className="bg-white text-xl p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%]">
        <button className="px-2" type="button" onClick={hide}>X</button>
        <div>
          <label htmlFor="name">
            Name:
            <input type="text" id="name" onChange={changeName} value={name} required />
          </label>
        </div>
        <div>
          <label htmlFor="spells">
            Spells:
            <select id="spells" name="spells" onClick={changeSpells}>
              {spellsList[Object.keys(spellsList)[0]].map((spell) => (
                <option key={spell._id} value={spell._id}>
                  {spell.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        {spells.length < 1 ? '' : spells.map((spell, i) => (
          <div key={spell.id}>
            {' '}
            {spell.spellName}
            {' '}
            <button key={i} type="button" onClick={removeSpell}>X</button>
          </div>
        )) }
        <div>
          <label htmlFor="description">
            Description:
            <textarea value={description} onChange={changeDescription} name="description" id="description" required />
          </label>
        </div>
        {errors !== undefined && errors.length > 0 ? errors.map((err) => (
          <div className="red bg-red-500 text-white text-bold" key={err.msg}>
            *
            {err.msg}
          </div>
        )) : ''}
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default MagicUpdateForm;
