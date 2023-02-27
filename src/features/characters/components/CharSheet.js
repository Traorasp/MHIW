import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetCharacterDetailsMutation, useUpdateCharacterMutation } from '../characterApeSlice';
import { useGetImage } from '../../image/getImage';
import { selectCurrentToken } from '../../auth/authSlice';
import ImageForm from '../../../component/imageForm';

function CharSheet() {
  const params = useParams();
  const [getDetails, { isLoading }] = useGetCharacterDetailsMutation();
  const [character, setCharacter] = useState();
  const [icon, setIcon] = useState();
  const [iconUrl, setIconUrl] = useState();
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const token = useSelector(selectCurrentToken);
  const [updateCharacter] = useUpdateCharacterMutation();

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

  const content = () => (
    <div>
      <Link to="/characters">Back</Link>
      <ImageForm hideForm="None" setImageId={handleIconChange} prevImageId={character.charIcon} />
      <ImageForm hideForm="None" setImageId={handleImageChange} prevImageId={character.charImage} />

      {imageUrl ? <img className="object-scale-down h-36 w-36" src={imageUrl} alt={character.firstName} /> : ''}
      {iconUrl ? <img className="object-scale-down h-36 w-36" src={iconUrl} alt={`${character.firstName} icon`} /> : ''}

    </div>
  );
  console.log(character);
  return isLoading || !character ? <h1>Loading...</h1> : content();
}

export default CharSheet;
