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
        newDoc.url = '';
        index = prevList.findIndex((doc) => doc.item._id === id);
      } else if (listOf === 'Materials') {
        index = prevList.findIndex((doc) => doc.material._id === id);
      } else {
        index = prevList.findIndex((doc) => doc._id === id);
      }
      if (newDoc.file !== undefined) {
        newDoc.image = newDoc.file;
        delete newDoc.file;
      }
      if (newDoc.url !== undefined) {
        const newUrl = newDoc.url;
        delete newDoc.url;
        switch (listOf) {
          case 'Items':
            prevList[index] = { item: newDoc, url: newUrl };
            break;
          case 'Materials':
            prevList[index] = { material: newDoc, url: newUrl };
            break;
          default:
        }
      } else {
        prevList[index] = newDoc;
      }
      setErrors([]);
      dispatch(addDoc({ key: listOf.toLowerCase(), data: [...prevList] }));
      updateForm();
    } catch (err) {
      if (err.data) {
        setErrors(err.data);
      } else if (err.error.error) {
        setErrors([{ msg: err.error.error }]);
      } else if (err.error.data.errors.errors) {
        setErrors(err.error.data.errors.errors);
      } else {
        setErrors(err.error.data.errors);
      }
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
      const response = await docDelete(id);
      if (response.fail) {
        return;
      }
      if (response.reload) {
        window.location.reload();
        return;
      }
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

  const ignoredKeys = ['parent', 'magics', 'effects', 'aoes', 'spells', 'followUp', 'skills', 'mainSkills', 'subSkills', 'enchantments', 'material', 'subStats', 'training'];

  const info = dataList().map(([key, value]) => {
    if (value === '' || value === null || value === undefined || value === 0 || key.substring(0, 1) === '_' || ignoredKeys.find((ignore) => ignore === key) || (Array.isArray(value) && (value.length === 0 || value[0] === ''))) {
      return '';
    }
    if (key === 'name') {
      return (
        <div className="font-bold" key={key}>
          {value}
        </div>
      );
    }
    if (key === 'measurements') {
      return (
        <div key={key}>
          Measurements:
          {' '}
          {value.join(', ')}
        </div>
      );
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
      let enchants = await enchantDetails(data._id).unwrap();
      enchants = enchants.enchantment;
      const enchantKey = Object.keys(enchants)[1];
      let desiredOrder = [];
      switch (enchantKey) {
        case 'spell':
          desiredOrder = ['name', 'type', 'magics', 'requirements', 'damageType', 'damageRatio', 'durabilityRatio', 'knockbackRatio', 'cost', 'range', 'aoes', 'effects', 'description', 'charge', 'followUp'];
          break;
        case 'skill':
          desiredOrder = ['name', 'type', 'priority', 'cooldown', 'duration', 'stat', 'roll', 'range', 'aoes', 'effects', 'description'];
          break;
        case 'antiTalent':
          desiredOrder = ['name', 'talent', 'parent', 'priority', 'measurements', 'castTime', 'duration', 'cooldown', 'charges', 'description'];
          break;
        default:
      }
      const rearrangedObject = Object.fromEntries(
        Object.entries(enchants[enchantKey]).sort(([keyA], [keyB]) => desiredOrder.indexOf(keyA) - desiredOrder.indexOf(keyB)),
      );
      const orderedEnchant = {};
      Object.entries(enchants).forEach(([key, value]) => {
        if (key === enchantKey) {
          orderedEnchant[key] = rearrangedObject;
        } else {
          orderedEnchant[key] = value;
        }
      });
      setNewData(orderedEnchant);
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
        if (objKey === 'name') {
          return (
            <div className="font-bold" key={key}>
              {objValue}
            </div>
          );
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
