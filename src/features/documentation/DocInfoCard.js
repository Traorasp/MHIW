/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { addDoc } from './documentationSlice';
import { useDeleteImageMutation } from '../image/imageApiSlice';
import { useGetEnchantmentMutation } from './enchantments/enchantmentApiSlice';
import AoeUpdateForm from './aoes/AoeUpdateForm';
import EffectUpdateForm from './effects/EffectUpdateForm';
import SkillUpdateForm from './skills/SkillUpdateForm';
import SpellUpdateForm from './spells/SpellUpdateForm';
import TalentUpdateForm from './talents/TalentUpdateForm';
import TitleUpdateForm from './titles/TitleUpdateForm';
import MagicUpdateForm from './magics/MagicUpdateForm';
import MaterialUpdateForm from './materials/MaterialUpdateForm';
import RaceUpdateForm from './races/RaceUpdateForm';
import ItemUpdateForm from './items/ItemUpdateForm';
import ClassesUpdateForm from './classes/ClassesUpdateForm';
import DetailedCard from './DetailedCard';

/* eslint-disable react/prop-types */
function DocInfoCard(prop) {
  const {
    data, docUpdate, docDelete, id, list, listOf, url,
  } = prop;
  const [showForm, displayForm] = useState(false);
  const [showDetails, displayDetailsForm] = useState(false);
  const [newData, setNewData] = useState('');
  const [title, setTitle] = useState('');
  const [errors, setErrors] = useState([]);

  const [deleteImage] = useDeleteImageMutation();
  const dispatch = useDispatch();
  const newDoc = {};
  const [enchantDetails] = useGetEnchantmentMutation();

  const updateForm = () => {
    if (showForm) {
      setErrors([]);
    }
    displayForm(!showForm);
  };

  const update = async () => {
    try {
      newDoc._id = newDoc.id;
      delete newDoc.id;
      const result = await docUpdate(newDoc);
      if (result.error) { throw result; }
      const prevList = Array.isArray(list) ? [...list] : [...list[Object.keys(list)[0]]];
      let index;
      if (listOf === 'Items') {
        index = prevList.findIndex((doc) => doc.item._id === id);
      } else if (listOf === 'Materials') {
        index = prevList.findIndex((doc) => doc.material._id === id);
      } else {
        index = prevList.findIndex((doc) => doc._id === id);
      }
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
      setErrors([]);
      dispatch(addDoc({ key: listOf.toLowerCase(), data: [...prevList] }));
      updateForm();
    } catch (err) {
      setErrors(err.error.data.errors);
    }
  };

  const selectForm = () => {
    switch (listOf) {
      case 'AOEs':
        return <AoeUpdateForm errors={errors} aoe={data} newDoc={newDoc} update={update} hide={updateForm} />;
      case 'Effects':
        return <EffectUpdateForm errors={errors} oldEffect={data} newDoc={newDoc} update={update} hide={updateForm} />;
      case 'Items':
        return <ItemUpdateForm errors={errors} item={data} imageUrl={url} newDoc={newDoc} update={update} hide={updateForm} />;
      case 'Magics':
        return <MagicUpdateForm errors={errors} magic={data} newDoc={newDoc} update={update} hide={updateForm} />;
      case 'Materials':
        return <MaterialUpdateForm errors={errors} material={data} imageUrl={url} newDoc={newDoc} update={update} hide={updateForm} />;
      case 'Races':
        return <RaceUpdateForm errors={errors} race={data} newDoc={newDoc} update={update} hide={updateForm} />;
      case 'Spells':
        return <SpellUpdateForm errors={errors} spell={data} newDoc={newDoc} update={update} hide={updateForm} />;
      case 'Skills':
        return <SkillUpdateForm errors={errors} skill={data} newDoc={newDoc} update={update} hide={updateForm} />;
      case 'Talents':
        return <TalentUpdateForm errors={errors} talent={data} newDoc={newDoc} update={update} hide={updateForm} />;
      case 'Titles':
        return <TitleUpdateForm errors={errors} title={data} newDoc={newDoc} update={update} hide={updateForm} />;
      case 'Classes':
        return <ClassesUpdateForm errors={errors} oldClass={data} newDoc={newDoc} update={update} hide={updateForm} />;
      default:
        return '';
    }
  };

  const deleteCard = async () => {
    try {
      docDelete(id);
      if (url !== '' && url !== undefined && url !== null && url) {
        if (data.material) {
          deleteImage(data.material.image);
        } else {
          deleteImage(data.image);
        }
      }
      const prevList = Array.isArray(list) ? [...list] : [...list[Object.keys(list)[0]]];
      let index;
      if (listOf === 'Items') {
        index = prevList.findIndex((doc) => doc.item._id === id);
      } else if (listOf === 'Materials') {
        index = prevList.findIndex((doc) => doc.material._id === id);
      } else {
        index = prevList.findIndex((doc) => doc._id === id);
      }
      prevList.splice(index, 1);
      dispatch(addDoc({ key: listOf.toLowerCase(), data: [...prevList] }));
    } catch (err) {
      console.log(err);
    }
  };

  const dataList = () => {
    if (data.item) {
      return Object.entries(data.item);
    }
    if (data.material && !data.baseStats) {
      return Object.entries(data.material);
    }
    return Object.entries(data);
  };

  const ignoredKeys = ['magics', 'effects', 'aoes', 'spells', 'skills', 'mainSkills', 'subSkills', 'enchantments', 'material', 'subStats'];

  const info = dataList().map(([key, value]) => {
    if (!title && key === 'name') {
      setTitle(value);
      return '';
    }
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
    if (key === 'weakness' || (key === 'damageType' && listOf === 'spells')) {
      return (
        <div key={key}>
          {`${key.substring(0, 1).toUpperCase() + key.substring(1)} : `}
          {value.join(', ')}
        </div>
      );
    }

    return (
      <div key={key}>
        {`${key.substring(0, 1).toUpperCase() + key.substring(1)} : `}
        {typeof value === 'boolean' ? value ? 'True' : 'False' : value}
      </div>
    );
  });

  const populateEnchants = async () => {
    try {
      const enchants = await enchantDetails(data._id).unwrap();
      setNewData(enchants.enchantment);
    } catch (err) {
      console.log(err);
    }
  };

  const enchantmentInfo = () => Object.entries(newData).map(([key, value]) => {
    if (key === 'amount') {
      return (
        <div key={key}>
          Amount:
          {' '}
          {value}
        </div>
      );
    }
    if (typeof value === 'object') {
      const objectInfo = Object.entries(value).map(([objKey, objValue]) => {
        if (!title && objKey === 'name') {
          setTitle(objValue);
          return '';
        }
        if (objKey === 'name') return '';
        if (objValue === '' || objValue === null || objValue === undefined || objValue === 0 || objKey.substring(0, 1) === '_' || ignoredKeys.find((ignore) => ignore === objKey) || (Array.isArray(objValue) && (objValue.length === 0 || objValue[0] === ''))) {
          return '';
        }
        return (
          <div key={objKey}>
            { objKey !== 'name' ? `${objKey.substring(0, 1).toUpperCase() + objKey.substring(1)} : ` : ''}
            {objValue}
          </div>
        );
      });
      return <div key={key}>{objectInfo}</div>;
    }
    return '';
  });

  useEffect(() => {
    if (listOf === 'Enchantments') {
      populateEnchants();
    }
  }, []);

  const handleShowDetails = () => displayDetailsForm(!showDetails);

  const ignoreDetails = ['AOEs', 'Talents', 'Effects', 'Enchantments', 'Magics'];

  return (
    <div className="border-2 border-black pl-2">
      <h2 className="font-bold">{title}</h2>
      {newData !== '' ? enchantmentInfo() : info}
      <button className="hover:bg-red-600 hover:border-black hover:border-2" onClick={deleteCard} type="button">Delete</button>
      {listOf === 'Enchantments' ? '' : <button className="hover:bg-yellow-400 hover:border-black hover:border-2" onClick={updateForm} type="button">Edit</button>}
      {showForm ? selectForm() : ''}
      {!ignoreDetails.find((type) => type === listOf) ? <button className="hover:bg-cyan-400 hover:border-black hover:border-2" type="button" onClick={handleShowDetails}>Details</button> : ''}
      {showDetails ? <DetailedCard id={id} count={0} listOf={listOf} /> : ''}
    </div>
  );
}
export default DocInfoCard;
