import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetCharacterDetailsMutation, useUpdateCharacterMutation } from '../characterApeSlice';
import { useGetImage } from '../../image/getImage';
import { selectCurrentToken } from '../../auth/authSlice';
import StatsView from './stats/StatsView';
import InformationView from './information/InformationView';
import CharacterInvenory from './inventory/CharacterInventory';
import Abilities from './abilities/Abilities';

function CharSheet() {
  const params = useParams();
  const token = useSelector(selectCurrentToken);

  const [getDetails, { isLoading }] = useGetCharacterDetailsMutation();
  const [updateCharacter] = useUpdateCharacterMutation();

  const [character, setCharacter] = useState();
  const [icon, setIcon] = useState();
  const [iconUrl, setIconUrl] = useState();
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [currentView, setCurrentView] = useState('Stats');
  const [abilityOn, setAbilityOn] = useState('Skills');

  const handleAbilityOn = (target) => setAbilityOn(target);

  const getImageUrl = async (id) => {
    if (id === null || id === undefined) return '';
    return useGetImage(id, token)
      .then((res) => URL.createObjectURL(res.data));
  };

  const getCharacterDetails = async () => {
    try {
      const data = await getDetails(params.charId).unwrap();
      setIcon(data.charIcon);
      setImage(data.charImage);

      setCharacter(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!isLoading && !character) {
      getCharacterDetails();
    }
  }, []);

  const handleImageUrl = async () => {
    setImageUrl(await getImageUrl(image));
  };

  useEffect(() => {
    if (image !== '' && image !== undefined) {
      handleImageUrl();
    }
  }, [image]);

  const handleIconUrl = async () => {
    setIconUrl(await getImageUrl(icon));
  };

  useEffect(() => {
    if (icon !== '' && icon !== undefined) {
      handleIconUrl();
    }
  }, [icon]);

  const handleIconChange = (id) => {
    try {
      const newChar = {};
      Object.entries(character).forEach(([key, value]) => { newChar[key] = value; });
      newChar.charIcon = id;
      updateCharacter(newChar);
      setIcon(id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageChange = (id) => {
    try {
      const newChar = {};
      Object.entries(character).forEach(([key, value]) => { newChar[key] = value; });
      newChar.charImage = id;
      updateCharacter(newChar);
      setImage(id);
    } catch (err) {
      console.log(err);
    }
  };

  const content = () => {
    switch (currentView) {
      case 'Stats':
        return <StatsView character={character} url={imageUrl} imageChange={handleImageChange} />;
      case 'Abilities':
        return (
          <Abilities
            abilityOn={abilityOn}
            moveAbilityOn={handleAbilityOn}
            update={getCharacterDetails}
            character={character}
          />
        );
      case 'Inventory':
        return <CharacterInvenory update={getCharacterDetails} character={character} />;
      case 'Information':
        return (
          <InformationView
            character={character}
            url={iconUrl}
            iconChange={handleIconChange}
          />
        );
      default:
        return '';
    }
  };

  const changeView = (e) => {
    setCurrentView(e.target.textContent);
  };

  return isLoading || !character ? <h1>Loading...</h1> : (
    <div>
      <nav>
        <button type="button" onClick={changeView}>Stats</button>
        <button type="button" onClick={changeView}>Abilities</button>
        <button type="button" onClick={changeView}>Inventory</button>
        <button type="button" onClick={changeView}>Information</button>
      </nav>
      <Link to="/characters">Back</Link>
      {currentView ? content() : ''}
    </div>
  );
}

export default CharSheet;
