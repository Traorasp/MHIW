/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AbilitiesSearchBar from './AbilitiesSearchBar';
import ListDisplay from '../inventory/ListDisplay';
import { selectCurrentClasses } from '../../../documentation/documentationSlice';
import { useUpdateCharacterMutation } from '../../characterApeSlice';
import DetailsBtn from '../inventory/DetailsBtn';

function ClassView(prop) {
  const { character, update } = prop;

  const categories = ['Name', 'Requirements', 'Type', 'Description'];
  let data = useSelector(selectCurrentClasses);
  data = data.classes ? data.classes : data.data;
  const classes = character.class ? character.class : [];
  const [classesShown, setClassessShown] = useState(classes);
  const [showForm, setShowForm] = useState(false);
  const [updateCharacter, { isLoading }] = useUpdateCharacterMutation();
  const [error, setError] = useState(false);

  useEffect(() => {
    setClassessShown(classes);
  }, [classes]);

  const handleShowForm = () => setShowForm(!showForm);
  const updateClasses = async (newClasses) => {
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
      newChar.class = newClasses;
      await updateCharacter(newChar);
      setShowForm(false);
      update();
    } catch (err) {
      console.log(err);
    }
  };

  const addClass = (e) => {
    const id = e.target.value;
    if (classes.find((aClass) => aClass._id === id)) {
      setError('Character already has this class');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }
    if (classes.length === 2) {
      setError('Chrarcter already has 2 classes');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }
    updateClasses([...classes, id]);
  };

  const removeClass = (e) => {
    const index = e.target.value;
    const classList = [...classes];
    classList.splice(index, 1);
    updateClasses(classList);
  };

  const displayClasses = () => classesShown.map((aClass, index) => (
    <div className="border-2 border-black" key={aClass._id}>
      {`${aClass.name} ${aClass.type} `}
      <button type="button" value={index} onClick={removeClass}>Remove</button>
      <DetailsBtn
        id={aClass._id}
        data={aClass}
        listOf="class"
      />
    </div>
  ));

  return classes ? (
    <main>
      <AbilitiesSearchBar
        abilities={classes}
        categories={categories}
        setSelectedAbilities={setClassessShown}
      />
      <button type="button" onClick={handleShowForm}>+</button>
      {showForm ? <ListDisplay categories={categories} listOf="classes" addItem={addClass} hide={handleShowForm} data={data} /> : ''}
      {displayClasses()}
      {error !== '' ? (
        <div className="absolute left-2 bottom-16 bg-red-600 text-white">
          {error}
        </div>
      ) : ''}
    </main>
  ) : '';
}

export default ClassView;
