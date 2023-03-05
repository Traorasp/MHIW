/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateMaterialMutation } from './materialApiSlice';
import {
  addDoc, selectCurrentMaterials, selectCurrentEffects,
} from '../documentationSlice';
import ImageForm from '../../../component/imageForm';
import { useGetImage } from '../../image/getImage';
import { selectCurrentToken } from '../../auth/authSlice';
import { useDeleteImageMutation } from '../../image/imageApiSlice';

function MaterialForm(prop) {
  const { hide } = prop;
  const effectsList = useSelector(selectCurrentEffects);
  const materials = useSelector(selectCurrentMaterials);
  const token = useSelector(selectCurrentToken);

  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [effects, setEffects] = useState([]);
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [deleteImage] = useDeleteImageMutation();
  const [errors, setErrors] = useState([]);

  const [createMaterial] = useCreateMaterialMutation();

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
    try {
      const newEffects = effects.map((effect) => effect.id);
      const { material } = await createMaterial({
        name,
        effects: newEffects,
        file: image,
        description,
      }).unwrap();

      const prevMaterials = !materials.data ? materials : materials.data;
      dispatch(addDoc({ key: 'materials', data: [...prevMaterials, { material, url }] }));
      hide();

      setName('');
      setEffects([]);
      setImage('');
      setUrl('');
      setDescription('');
      setErrors([]);
    } catch (err) {
      setErrors(err.data.errors.errors);
    }
  };

  const removeEffect = (e) => {
    const newEffects = effects.map((info) => info);
    newEffects.splice(e.target.value, 1);
    setEffects(newEffects);
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
    if (image !== '') {
      getImage();
    }
  }, [image]);

  return (
    <div className="fixed bg-black/60 h-full w-full">
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
                    {effect.effect}
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
              <button value={i} type="button" onClick={removeEffect}>X</button>
            </div>
          )) }
          <div>
            <label htmlFor="description">
              Description:
              <textarea onChange={changeDescription} name="description" id="description" required />
            </label>
          </div>
          {errors !== undefined && errors.length > 0 ? errors.map((err) => (
            <div className="red bg-red-500 text-white text-bold" key={err.msg}>
              *
              {err.msg}
            </div>
          )) : ''}
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}

export default MaterialForm;
