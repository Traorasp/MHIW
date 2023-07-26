/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AbilitiesSearchBar from './AbilitiesSearchBar';
import ListDisplay from '../inventory/ListDisplay';
import { selectCurrentSpells } from '../../../documentation/documentationSlice';
import { useUpdateCharacterMutation } from '../../characterApeSlice';
import DetailsBtn from '../inventory/DetailsBtn';

function Spellsview(prop) {
  const { character, update } = prop;

  const categories = ['Name', 'Type', 'Requirements', 'DamageType', 'DamageRatio', 'DurabilityRatio', 'KnockbackRatio', 'Cost', 'Range', 'Aoes', 'Charge', 'Description'];
  let data = useSelector(selectCurrentSpells);
  data = data.spells ? data.spells : data.data;
  const spells = character.spells ? character.spells : [];
  const [spellsShown, setSpellsShown] = useState(spells);
  const [showForm, setShowForm] = useState(false);
  const [updateCharacter, { isLoading }] = useUpdateCharacterMutation();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setSpellsShown(spells);
  }, [spells]);

  const handleShowForm = () => setShowForm(!showForm);
  const updateSpells = async (newSpells) => {
    try {
      if (isLoading) return;
      const newChar = {};
      Object.entries(character).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          newChar[key] = [...value];
        } else {
          newChar[key] = value;
        }
      });
      newChar.spells = newSpells;
      await updateCharacter(newChar);
      setShowForm(false);
      update();
    } catch (err) {
      console.log(err);
    }
  };

  const addAbility = (e) => {
    const id = e.target.value;
    if (spells.find((spell) => spell._id === id)) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
    }
    updateSpells([...spells, id]);
  };

  const removeSpell = (e) => {
    const index = e.target.value;
    const spellList = [...spells];
    spellList.splice(index, 1);
    updateSpells(spellList);
  };

  const displaySpells = () => spellsShown.map((spell, index) => (
    <div className="border-2 border-black" key={spell._id}>
      {`${spell.name} ${spell.type} `}
      <button type="button" value={index} onClick={removeSpell}>Remove</button>
      <DetailsBtn
        id={spell._id}
        data={spell}
        listOf="spells"
      />
    </div>
  ));

  return spells ? (
    <main>
      <AbilitiesSearchBar
        abilities={spells}
        categories={categories}
        setSelectedAbilities={setSpellsShown}
      />
      <button type="button" onClick={handleShowForm}>+</button>
      {showForm ? <ListDisplay categories={categories} listOf="spells" addItem={addAbility} hide={handleShowForm} data={data} /> : ''}
      {displaySpells()}
      {showError ? (
        <div className="absolute left-2 bottom-16 bg-red-600 text-white">
          Character already has this spell
        </div>
      ) : ''}
    </main>
  ) : '';
}

export default Spellsview;
