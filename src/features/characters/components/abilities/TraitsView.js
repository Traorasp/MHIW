/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentSkills } from '../../../documentation/documentationSlice';
import { useUpdateCharacterMutation } from '../../characterApeSlice';
import DetailsBtn from '../inventory/DetailsBtn';
import ListDisplay from '../inventory/ListDisplay';
import AbilitiesSearchBar from './AbilitiesSearchBar';

function TraitsView(prop) {
  const { character, update } = prop;

  const categories = ['Name', 'Type', 'Priority', 'Cooldown', 'Duration', 'Stat', 'Roll', 'Range', 'Description'];
  const data = useSelector(selectCurrentSkills).skills.filter((skill) => (skill.type === 'Charisma' || skill.type === 'Will' || skill.type === 'Intimidation') && skill.type !== 'Racial');
  const traits = character.traits ? character.traits : [];
  const [traitsShown, setTraitsShown] = useState(traits);
  const [showForm, setShowForm] = useState(false);
  const [updateCharacter, { isLoading }] = useUpdateCharacterMutation();
  const [error, setError] = useState(false);

  useEffect(() => {
    setTraitsShown(traits);
  }, [traits]);

  const handleShowForm = () => setShowForm(!showForm);
  const updatetraits = async (newtraits) => {
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
      newChar.traits = newtraits;
      await updateCharacter(newChar);
      setShowForm(false);
      update();
    } catch (err) {
      console.log(err);
    }
  };

  const addTrait = (e) => {
    const id = e.target.value;
    if (traits.find((trait) => trait._id === id)) {
      setError('Character already has this trait');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }
    updatetraits([...traits, id]);
  };

  const removeTrait = (e) => {
    const index = e.target.value;
    const traitList = [...traits];
    traitList.splice(index, 1);
    updatetraits(traitList);
  };

  const displaytraits = () => traitsShown.map((trait, index) => (
    <div className="border-2 border-black" key={trait._id}>
      {`${trait.name}  LV ${trait.level} `}
      <button type="button" value={index} onClick={removeTrait}>Remove</button>
      <DetailsBtn
        id={trait._id}
        data={trait}
        listOf="skills"
      />
    </div>
  ));

  return traits ? (
    <main>
      <AbilitiesSearchBar
        abilities={traits}
        categories={categories}
        setSelectedAbilities={setTraitsShown}
      />
      <button type="button" onClick={handleShowForm}>+</button>
      {showForm ? <ListDisplay categories={categories} listOf="traits" addItem={addTrait} hide={handleShowForm} data={data} /> : ''}
      {displaytraits()}
      {error !== '' ? (
        <div className="absolute left-2 bottom-16 bg-red-600 text-white">
          {error}
        </div>
      ) : ''}
    </main>
  ) : '';
}

export default TraitsView;
