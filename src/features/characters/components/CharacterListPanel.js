/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentCharacters, setCharacterList } from '../charactersSlice';
import profileSVG from '../../../images/profile.svg';
import CharacterForm from './CharacterForm';
import { useDeleteCharacterMutation, useGetCharacterListMutation } from '../characterApeSlice';
import { selectCurrentId, selectCurrentToken } from '../../auth/authSlice';
import { useGetImage } from '../../image/getImage';
import DeleteConfirmation from '../../../component/DeleteConfirmation';

function CharacterListPanel() {
  const characters = useSelector(selectCurrentCharacters);

  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState('');
  const [characterList, setCharacters] = useState(characters);
  const [useDeleteCharacter] = useDeleteCharacterMutation();
  const [getCharacterList] = useGetCharacterListMutation();
  const id = useSelector(selectCurrentId);
  const token = useSelector(selectCurrentToken);

  const displayForm = () => setShowForm(!showForm);
  const displayDeleteForm = (e) => {
    if (deleteTarget !== '') {
      setDeleteTarget('');
    } else {
      setDeleteTarget(characterList[e.target.value].char);
    }
  };
  const dispatch = useDispatch();
  const updateCharacterList = (newList) => setCharacters(newList);

  const getImageUrl = async (imgId) => {
    if (imgId === null || imgId === undefined) return '';
    return useGetImage(imgId, token)
      .then((res) => URL.createObjectURL(res.data));
  };

  const getCharacters = async () => {
    let charList = await getCharacterList(id).unwrap();
    if (charList.length === 0) {
      dispatch(setCharacterList({ characters: [] }));
    } else {
      let images = charList.map((char) => getImageUrl(char.charIcon));
      images = await Promise.all(images);
      charList = charList.map((char, i) => ({ char, icon: images[i] }));
      dispatch(setCharacterList({ characters: charList }));
    }
    updateCharacterList(charList);
  };

  const deleteCharacter = async () => {
    try {
      const input = [deleteTarget._id, id];
      await useDeleteCharacter(input);
      await getCharacters();
      displayDeleteForm();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {

  }, [characterList]);

  useEffect(() => {
    getCharacters();
  }, []);

  const createCardList = () => characterList.map((character, i) => (
    <div key={character.char._id}>
      <a href={`/characters/${character.char._id}`} className="border-black border-2 flex w-[100%] items-center">
        <div>
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
        </div>
      </a>
      <button value={i} type="button" onClick={displayDeleteForm}>Delete</button>
    </div>
  ));

  return (
    <div>
      <button onClick={displayForm} className="bg-green-400 p-5 border-black border-2 text-2xl active:bg-green-500" type="button">+</button>
      {showForm ? <CharacterForm update={getCharacters} hide={displayForm} list={characterList || []} /> : ''}
      {deleteTarget ? <DeleteConfirmation name={`${deleteTarget.firstName} ${deleteTarget.lastName}`} hide={displayDeleteForm} confirmDelete={deleteCharacter} /> : ''}
      {characterList ? createCardList() : ''}
    </div>
  );
}

export default CharacterListPanel;
