/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentCharacters, setCharacterList } from '../charactersSlice';
import profileSVG from '../../../images/profile.svg';
import CharacterForm from './CharacterForm';
import { useDeleteCharacterMutation, useGetCharacterListMutation } from '../characterApeSlice';
import { selectCurrentId, selectCurrentToken } from '../../auth/authSlice';
import { useGetImage } from '../../image/getImage';

function CharacterListPanel() {
  const characters = useSelector(selectCurrentCharacters);

  const [showForm, setShowForm] = useState(false);
  const [characterList, setCharacters] = useState(characters);
  const [useDeleteCharacter] = useDeleteCharacterMutation();
  const [getCharacterList] = useGetCharacterListMutation();
  const id = useSelector(selectCurrentId);
  const token = useSelector(selectCurrentToken);
  const navigate = useNavigate();

  const displayForm = () => setShowForm(!showForm);
  const dispatch = useDispatch();

  const updateCharacterList = (newList) => setCharacters(newList);

  const openCharacter = (e) => {
    navigate(`/characters/${e.target.id}`);
  };

  const getImageUrl = async (imgId) => {
    if (imgId === null || imgId === undefined) return '';
    return useGetImage(imgId, token)
      .then((res) => URL.createObjectURL(res.data));
  };

  const getCharacters = async () => {
    let charList = await getCharacterList(id).unwrap();
    if (charList.length === 0) {
      dispatch(setCharacterList({ characters: [] }));
      return;
    }
    let images = charList.map((char) => getImageUrl(char.charIcon));
    images = await Promise.all(images);
    charList = charList.map((char, i) => ({ char, icon: images[i] }));
    dispatch(setCharacterList({ characters: charList }));
    updateCharacterList(charList);
  };

  const deleteCharacter = async (e) => {
    try {
      const input = [e.target.value, id];
      await useDeleteCharacter(input);
      getCharacters();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {

  }, [characterList]);

  const createCardList = () => characterList.map((character) => (
    <div className="border-black border-2 flex w-[100%] items-center">
      <button type="button" onClick={openCharacter} key={character.char._id} id={character.char._id}>
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
      <button value={character.char._id} type="button" onClick={deleteCharacter}>Delete</button>
    </div>
  ));

  return (
    <div>
      <button onClick={displayForm} className="bg-green-400 p-5 border-black border-2 text-2xl active:bg-green-500" type="button">+</button>
      {showForm ? <CharacterForm update={getCharacters} hide={displayForm} list={characterList} /> : ''}
      {characterList ? createCardList() : ''}
    </div>
  );
}

export default CharacterListPanel;
