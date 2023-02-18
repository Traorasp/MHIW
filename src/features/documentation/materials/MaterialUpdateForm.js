/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentEffects } from '../documentationSlice';
import ImageForm from '../../../component/imageForm';
import { useGetImage } from '../../image/getImage';
import { selectCurrentToken } from '../../auth/authSlice';
import { useDeleteImageMutation } from '../../image/imageApiSlice';

function MaterialUpdateForm(prop) {
  const {
    hide, material, newDoc, update, imageUrl,
  } = prop;
  const effectsList = useSelector(selectCurrentEffects);
  const token = useSelector(selectCurrentToken);

  const oldMaterial = material.material ? material.material : material;

  const getEffects = () => {
    const list = effectsList[Object.keys(effectsList)[0]]
      .filter((effect) => (!!oldMaterial.effects.find((id) => id._id === effect._id)));
    return list.map((effect) => ({ id: effect._id, effectName: effect.name }));
  };

  const [name, setName] = useState(oldMaterial.name);
  const [effects, setEffects] = useState([...getEffects()]);
  const [image, setImage] = useState(oldMaterial.image);
  const [description, setDescription] = useState(oldMaterial.description);
  const [url, setUrl] = useState(imageUrl);
  const [deleteImage] = useDeleteImageMutation();

  const changeName = (e) => setName(e.target.value);
  const changeEffects = (e) => {
    if (effects.length > 0 && effects.find((effect) => e.target.value === effect.id)) {
      return;
    }
    const { text } = e.target.options[e.target.selectedIndex];
    const effectName = text.split(' :')[0].trim();
    setEffects([...effects, { id: e.target.value, effectName }]);
  };

  const changeDescription = (e) => setDescription(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEffects = effects.map((effect) => effect.id);

    newDoc.id = oldMaterial._id;
    newDoc.name = name;
    newDoc.effects = newEffects;
    newDoc.file = image;
    newDoc.description = description;
    newDoc.url = url;

    update();
  };

  const removeEffect = (e) => {
    setEffects(effects.length === 1 ? [] : effects.splice(e.target.key, 1));
  };

  const getImage = () => {
    useGetImage(image, token)
      .then((res) => {
        const href = URL.createObjectURL(res.data);
        setUrl(href);
      }).catch(() => {
        console.log('Failed to load image');
      });
  };

  const handleDeleteImage = () => {
    try {
      deleteImage(image);
      setImage('');
      setUrl('');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (image !== '' && image) {
      getImage();
    }
  }, [image]);

  return (
    <div className="fixed bg-black/60 h-full w-full top-[4rem] left-0">
      <div className="bg-white text-xl p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%]">
        <button className="px-2" type="button" onClick={hide}>X</button>
        <ImageForm hideForm="None" setImageId={setImage} prevImageId={image} />
        {url !== ''
          ? (
            <div>
              <img className="object-scale-down h-36 w-36" src={url} alt="User profile" />
              <button type="button" onClick={handleDeleteImage}>Delete</button>
            </div>
          ) : ''}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">
              Name:
              <input type="text" id="name" onChange={changeName} value={name} required />
            </label>
          </div>
          <div>
            <label htmlFor="effects">
              Effects:
              <select id="effects" name="effects" onClick={changeEffects}>
                {effectsList[Object.keys(effectsList)[0]].map((effect) => (
                  <option key={effect._id} value={effect._id}>
                    {effect.name}
                    {' '}
                    :
                    {' '}
                    {effect.damage}
                    {' '}
                    :
                    {' '}
                    {effect.duration}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {effects.length < 1 ? '' : effects.map((effect, i) => (
            <div key={effect.id}>
              {' '}
              {effect.effectName}
              {' '}
              <button key={i} type="button" onClick={removeEffect}>X</button>
            </div>
          )) }
          <div>
            <label htmlFor="description">
              Description:
              <textarea value={description} onChange={changeDescription} name="description" id="description" required />
            </label>
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

export default MaterialUpdateForm;
