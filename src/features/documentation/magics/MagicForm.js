/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateMagicMutation } from './magicApiSlice';
import {
  addDoc, selectCurrentMagics, selectCurrentSpells,
} from '../documentationSlice';

function MagicForm(prop) {
  const { hide } = prop;
  const spellsList = useSelector(selectCurrentSpells);
  const magics = useSelector(selectCurrentMagics);

  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [spells, setSpells] = useState([]);
  const [description, setDescription] = useState('');

  const [createMagic] = useCreateMagicMutation();

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
    try {
      const newSpells = spells.map((spell) => spell.id);
      const { magic } = await createMagic({
        name,
        spells: newSpells,
        description,
      }).unwrap();

      setName('');
      setSpells([]);
      setDescription('');

      const prevMagics = magics.magics ? magics.magics : magics.data;
      dispatch(addDoc({ key: 'magics', data: [...prevMagics, magic] }));
      hide();
    } catch (err) {
      console.log(err);
    }
  };

  const removeSpell = (e) => {
    setSpells(spells.length === 1 ? [] : spells.splice(e.target.key, 1));
  };

  return (
    <div className="fixed bg-black/60 h-full w-full">
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
            <textarea onChange={changeDescription} name="description" id="description" required />
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default MagicForm;
