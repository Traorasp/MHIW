/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentTitles } from '../../../documentation/documentationSlice';
import { useUpdateCharacterMutation } from '../../characterApeSlice';
import DetailsBtn from '../inventory/DetailsBtn';
import ListDisplay from '../inventory/ListDisplay';
import AbilitiesSearchBar from './AbilitiesSearchBar';

function TitlesView(prop) {
  const { character, update } = prop;

  const categories = ['Name', 'Level', 'Description'];
  const data = useSelector(selectCurrentTitles).titles;
  const titles = character.titles ? character.titles : [];
  const [titlesShown, settitlessShown] = useState(titles);
  const [showForm, setShowForm] = useState(false);
  const [updateCharacter, { isLoading }] = useUpdateCharacterMutation();
  const [error, setError] = useState(false);

  useEffect(() => {
    settitlessShown(titles);
  });

  const handleShowForm = () => setShowForm(!showForm);
  const updatetitles = async (newtitles) => {
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
      newChar.titles = newtitles;
      await updateCharacter(newChar);
      setShowForm(false);
      update();
    } catch (err) {
      console.log(err);
    }
  };

  const addTitle = (e) => {
    const id = e.target.value;
    if (titles.find((title) => title._id === id)) {
      setError('Character already has this title');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }
    updatetitles([...titles, id]);
  };

  const removeTitle = (e) => {
    const index = e.target.value;
    const titleList = [...titles];
    titleList.splice(index, 1);
    updatetitles(titleList);
  };

  const displaytitles = () => titlesShown.map((title, index) => (
    <div className="border-2 border-black" key={title._id}>
      {`${title.name}  LV ${title.level} `}
      <button type="button" value={index} onClick={removeTitle}>Remove</button>
      <DetailsBtn
        id={title._id}
        data={title}
        listOf="titles"
      />
    </div>
  ));

  return titles ? (
    <main>
      <AbilitiesSearchBar
        abilities={titles}
        categories={categories}
        setSelectedAbilities={settitlessShown}
      />
      <button type="button" onClick={handleShowForm}>+</button>
      {showForm ? <ListDisplay categories={categories} listOf="titles" addItem={addTitle} hide={handleShowForm} data={data} /> : ''}
      {displaytitles()}
      {error !== '' ? (
        <div className="absolute left-2 bottom-16 bg-red-600 text-white">
          {error}
        </div>
      ) : ''}
    </main>
  ) : '';
}

export default TitlesView;
