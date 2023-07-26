/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { useGetTitleMutation } from './titles/titleApiSlice';
import { useGetTalentMutation } from './talents/talentApiSlice';
import { useGetSpellMutation } from './spells/spellApiSlice';
import { useGetSkillMutation } from './skills/skillApiSlice';
import { useGetRaceMutation } from './races/raceApiSlice';
import { useGetMaterialMutation } from './materials/materialApiSlice';
import { useGetItemMutation } from './items/itemApiSlice';
import { useGetEnchantmentMutation } from './enchantments/enchantmentApiSlice';
import { useGetEffectMutation } from './effects/effectApiSlice';
import { useGetMagicMutation } from './magics/magicApiSlice';
import { useGetAOEMutation } from './aoes/aoeApiSlice';
import { useGetClassesMutation } from './classes/classesApieSlice';

/* eslint-disable react/prop-types */
function DetailedCard(prop) {
  const { id, listOf, count } = prop;

  const [data, setData] = useState('');
  const [getTitleDetails] = useGetTitleMutation();
  const [getTalentDetails] = useGetTalentMutation();
  const [getSpellDetails] = useGetSpellMutation();
  const [getSkillDetails] = useGetSkillMutation();
  const [getRaceDetails] = useGetRaceMutation();
  const [getMaterialDetails] = useGetMaterialMutation();
  const [getItemDetails] = useGetItemMutation();
  const [getEnchantmentDetails] = useGetEnchantmentMutation();
  const [getEffectDetails] = useGetEffectMutation();
  const [getMagicDetails] = useGetMagicMutation();
  const [getAoeDetails] = useGetAOEMutation();
  const [getClassDetails] = useGetClassesMutation();

  const reorder = (model) => {
    let desiredOrder = [];
    const key = Object.keys(model)[0];
    switch (key) {
      case 'aoes':
        desiredOrder = ['name', 'fixed', 'range'];
        break;
      case 'classes':
        desiredOrder = ['name', 'requirements', 'type', 'effects', 'skills', 'description'];
        break;
      case 'effect':
        desiredOrder = ['name', 'show', 'damageType', 'damage', 'training', 'stat', 'property', 'effect', 'duration'];
        break;
      case 'enchantment':
        desiredOrder = ['amount', 'skill', 'spell', 'antiTalent'];
        break;
      case 'magic':
        desiredOrder = ['name', 'description'];
        break;
      case 'race':
        desiredOrder = ['name', 'parent', 'training', 'weakness', 'limit', 'baseStats', 'mainSkills', 'subSkills', 'description'];
        break;
      case 'skill':
        desiredOrder = ['name', 'type', 'priority', 'cooldown', 'duration', 'stat', 'roll', 'range', 'aoes', 'effects', 'description'];
        break;
      case 'spell':
        desiredOrder = ['name', 'type', 'magics', 'requirements', 'damageType', 'damageRatio', 'durabilityRatio', 'knockbackRatio', 'cost', 'range', 'aoes', 'effects', 'description', 'charge', 'followUp'];
        break;
      case 'talent':
        desiredOrder = ['name', 'talent', 'parent', 'priority', 'measurements', 'castTime', 'duration', 'cooldown', 'charges', 'description'];
        break;
      case 'title':
        desiredOrder = ['name', 'level', 'description', 'effects', 'skills'];
        break;
      case 'item':
        desiredOrder = ['name', 'rarity', 'image', 'level', 'material', 'subStats', 'cost', 'type', 'baseStats', 'enchantments', 'description', 'background'];
        break;
      case 'material':
        desiredOrder = ['name', 'description', 'image', 'effects'];
        break;
      default:
        console.log(key);
        return model;
    }
    const reorderedObject = Object.fromEntries(
      Object.entries(model[key])
        .sort(([keyA], [keyB]) => desiredOrder.indexOf(keyA) - desiredOrder.indexOf(keyB)),
    );
    const newModel = {};
    newModel[key] = reorderedObject;
    return newModel;
  };

  const selectRequest = (requestId, dataType) => {
    switch (dataType) {
      case 'aoes':
        return getAoeDetails(requestId).unwrap();
      case 'effects':
      case 'substats':
        return getEffectDetails(requestId).unwrap();
      case 'enchantments':
        return getEnchantmentDetails(requestId).unwrap();
      case 'items':
        return getItemDetails(requestId).unwrap();
      case 'magics':
        return getMagicDetails(requestId).unwrap();
      case 'materials':
      case 'material':
        return getMaterialDetails(requestId).unwrap();
      case 'races':
        return getRaceDetails(requestId).unwrap();
      case 'spells':
      case 'spell':
      case 'followup':
        return getSpellDetails(requestId).unwrap();
      case 'skills':
      case 'skill':
      case 'traits':
      case 'mainskills':
      case 'subskills':
        return getSkillDetails(requestId).unwrap();
      case 'talents':
        return getTalentDetails(requestId).unwrap();
      case 'titles':
        return getTitleDetails(requestId).unwrap();
      case 'classes':
      case 'class':
        return getClassDetails(requestId).unwrap();
      default:
        console.log(dataType);
        return '';
    }
  };

  const getDetailedData = async (requestId, dataType) => {
    try {
      setData(reorder(await selectRequest(requestId, dataType.toLowerCase())));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDetailedData(id, listOf);
  }, []);

  const referenceTypes = ['magics', 'followUp', 'effects', 'aoes', 'spells', 'skills', 'mainSkills', 'subSkills', 'enchantments', 'material', 'subStats', 'skill', 'spell'];
  const detailsBar = () => Object.entries(data[Object.keys(data)[0]]).map(([key, value]) => {
    if (value === '' || key === 'image' || value === null || value === undefined || value === 0 || key.substring(0, 1) === '_' || (Array.isArray(value) && (value.length === 0 || value[0] === ''))) {
      return '';
    }
    if (key === 'followUp' && count > 0) {
      return '';
    }
    if (key === 'baseStats') {
      if (count === 0) return '';
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
    if (!referenceTypes.find((type) => type === key)) {
      if (count === 0) return '';
      if (typeof value === 'object') {
        return value.map((item) => (
          <div key={item}>
            { `${key.substring(0, 1).toUpperCase() + key.substring(1)} : `}
            {value}
          </div>
        ));
      }
      return (
        <div key={key}>
          { key !== 'name' ? `${key.substring(0, 1).toUpperCase() + key.substring(1)} : ` : ''}
          {typeof value === 'boolean' ? value ? 'True' : 'False' : value}
        </div>
      );
    }
    if (key.substring(key.length - 1) === 's') {
      return value.map((item) => <DetailedCard count={count + 1} key={item._id} id={item._id} listOf={key} />);
    }
    if ((key === 'spell' || key === 'skill') && listOf === 'enchantments') {
      return <DetailedCard key={key} count={count + 1} id={value._id} listOf={key} />;
    }
    return <DetailedCard key={key} count={count + 1} id={value} listOf={key} />;
  });

  const checkChildren = () => {
    if (document.getElementById(`${id}-${count}`) === null) return false;
    return document.getElementById(`${id}-${count}`).hasChildNodes();
  };

  const getTitleContent = () => {
    if (count === 0) return '';

    if (listOf.substring(listOf.length - 1) === 's') {
      return listOf.substring(0, 1).toUpperCase() + listOf.substring(1, listOf.length - 1);
    }
    return listOf.substring(0, 1).toUpperCase() + listOf.substring(1);
  };
  return (
    <div id={`${id}-${count}`} className={count === 0 ? '' : 'border-2 border-black pl-2'}>
      <h3 className="font-bold">{getTitleContent()}</h3>
      {data !== '' ? detailsBar() : ''}
      {count === 0 && !checkChildren() ? 'No details' : ''}
    </div>
  );
}

export default DetailedCard;
