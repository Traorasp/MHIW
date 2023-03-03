/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentCharacters } from '../charactersSlice';
import profileSVG from '../../../images/profile.svg';
import CharacterForm from './CharacterForm';

function CharacterListPanel() {
  const characterList = useSelector(selectCurrentCharacters);

  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const displayForm = () => setShowForm(!showForm);

  const openCharacter = (e) => {
    navigate(`/characters/${e.target.id}`);
  };

  const createCardList = () => characterList.map((character) => (
    <button type="button" onClick={openCharacter} key={character.char._id} id={character.char._id} className="border-black border-2 flex w-[100%] items-center">
      <img src={(character.icon !== '' && character.icon) ? character.icon : profileSVG} alt={`Profile of ${character.char.firstName}`} className="object-scale-down h-24 w-24" />
      <div>
        <h2>
          {character.char.firstName}
          {' '}
          {character.char.lastName}
        </h2>
        <h3>
          {character.char.level}
          {' '}
        </h3>
      </div>
    </button>
  ));

  return (
    <div>
      <button onClick={displayForm} className="bg-green-400 p-5 border-black border-2 text-2xl active:bg-green-500" type="button">+</button>
      {showForm ? <CharacterForm hide={displayForm} list={characterList} /> : ''}
      {characterList ? createCardList() : ''}
    </div>
  );
}

export default CharacterListPanel;
