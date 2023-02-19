/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addDoc } from './documentationSlice';
import { useDeleteImageMutation } from '../image/imageApiSlice';
import AoeUpdateForm from './aoes/AoeUpdateForm';
import EffectUpdateForm from './effects/EffectUpdateForm';
import SkillUpdateForm from './skills/SkillUpdateForm';
import SpellUpdateForm from './spells/SpellUpdateForm';
import TalentUpdateForm from './talents/TalentUpdateForm';
import TitleUpdateForm from './titles/TitleUpdateForm';
import MagicUpdateForm from './magics/MagicUpdateForm';
import MaterialUpdateForm from './materials/MaterialUpdateForm';
import RaceUpdateForm from './races/RaceUpdateForm';

/* eslint-disable react/prop-types */
function DocInfoCard(prop) {
  const {
    data, docUpdate, docDelete, id, list, listOf, url,
  } = prop;
  const [showForm, displayForm] = useState(false);
  const [deleteImage] = useDeleteImageMutation();
  const dispatch = useDispatch();
  const newDoc = {};

  const updateForm = () => {
    displayForm(!showForm);
  };

  const update = async () => {
    try {
      docUpdate(newDoc);
      const prevList = Array.isArray(list) ? [...list] : [...list[Object.keys(list)[0]]];
      const index = Array.isArray(list) || prevList[0].material ? prevList.findIndex((doc) => doc.material._id === id) : prevList.findIndex((doc) => doc._id === id);
      newDoc._id = newDoc.id;
      delete newDoc.id;
      if (newDoc.measurements) {
        newDoc.measurements = newDoc.measurements.join(', ');
      }

      if (newDoc.file !== undefined) {
        newDoc.image = newDoc.file;
        delete newDoc.file;
      }
      if (newDoc.url !== undefined) {
        const newUrl = newDoc.url;
        delete newDoc.url;
        prevList[index] = { material: newDoc, url: newUrl };
      } else {
        prevList[index] = newDoc;
      }
      dispatch(addDoc({ key: listOf.toLowerCase(), data: [...prevList] }));
      updateForm();
    } catch (err) {
      console.log(err);
    }
  };

  const selectForm = () => {
    switch (listOf) {
      case 'AOEs':
        return <AoeUpdateForm aoe={data} newDoc={newDoc} update={update} hide={updateForm} />;
      case 'Effects':
        return <EffectUpdateForm oldEffect={data} newDoc={newDoc} update={update} hide={updateForm} />;
      case 'Items':
        return <AoeUpdateForm />;
      case 'Magics':
        return <MagicUpdateForm magic={data} newDoc={newDoc} update={update} hide={updateForm} />;
      case 'Materials':
        return <MaterialUpdateForm material={data} imageUrl={url} newDoc={newDoc} update={update} hide={updateForm} />;
      case 'Races':
        return <RaceUpdateForm race={data} newDoc={newDoc} update={update} hide={updateForm} />;
      case 'Spells':
        return <SpellUpdateForm spell={data} newDoc={newDoc} update={update} hide={updateForm} />;
      case 'Skills':
        return <SkillUpdateForm skill={data} newDoc={newDoc} update={update} hide={updateForm} />;
      case 'Talents':
        return <TalentUpdateForm talent={data} newDoc={newDoc} update={update} hide={updateForm} />;
      case 'Titles':
        return <TitleUpdateForm title={data} newDoc={newDoc} update={update} hide={updateForm} />;
      default:
        return '';
    }
  };

  const deleteCard = async () => {
    try {
      docDelete(id);
      if (url !== '' && url) {
        if (data.material) {
          deleteImage(data.material.image);
        } else {
          deleteImage(data.image);
        }
      }
      const prevList = Array.isArray(list) ? [...list] : [...list[Object.keys(list)[0]]];
      const index = Array.isArray(list) ? prevList.findIndex((doc) => doc.material._id === id) : prevList.findIndex((doc) => doc._id === id);
      prevList.splice(index, 1);
      dispatch(addDoc({ key: listOf.toLowerCase(), data: [...prevList] }));
    } catch (err) {
      console.log(err);
    }
  };

  const dataList = () => {
    const arrayList = data.material ? Object.entries(data.material) : Object.entries(data);
    return arrayList;
  };

  const ignoredKeys = ['effects', 'aoe', 'spells', 'skills', 'mainSkills', 'subSkills'];

  const info = dataList().map(([key, value]) => {
    if (value === '' || value === null || value === undefined || value === 0 || key.substring(0, 1) === '_' || ignoredKeys.find((ignore) => ignore === key) || (Array.isArray(value) && (value.length === 0 || value[0] === ''))) {
      return '';
    }
    if (key === 'baseStats') {
      return (
        <div key={key}>
          {Object.entries(value).map(([statKey, statValue]) => (
            <div key={statKey}>
              {`${statKey.substring(0, 1).toUpperCase() + statKey.substring(1)} : `}
              {statValue}
            </div>
          ))}
        </div>
      );
    }
    if (key === 'image') {
      return <img key={url} className="object-scale-down h-36 w-36" src={url} alt="Material" />;
    }
    if (key === 'weakness') {
      return (
        <div key={key}>
          {`${key.substring(0, 1).toUpperCase() + key.substring(1)} : `}
          {value.join(', ')}
        </div>
      );
    }
    return (
      <div key={key}>
        { key !== 'name' ? `${key.substring(0, 1).toUpperCase() + key.substring(1)} : ` : ''}
        {typeof value === 'boolean' ? value ? 'True' : 'False' : value}
      </div>
    );
  });

  return (
    <div className="border-2 border-black pl-2">
      {info}
      <button className="hover:bg-red-600 hover:border-black hover:border-2" onClick={deleteCard} type="button">Delete</button>
      {listOf === 'Enchantments' ? '' : <button className="hover:bg-yellow-400 hover:border-black hover:border-2" onClick={updateForm} type="button">Edit</button>}
      {showForm ? selectForm() : ''}
    </div>
  );
}
export default DocInfoCard;
