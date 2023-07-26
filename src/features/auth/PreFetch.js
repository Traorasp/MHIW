/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetEffectListMutation } from '../documentation/effects/effectApiSlice';
import { useGetAOEListMutation } from '../documentation/aoes/aoeApiSlice';
import { useGetEnchantmentListMutation } from '../documentation/enchantments/enchantmentApiSlice';
import { useGetItemListMutation } from '../documentation/items/itemApiSlice';
import { useGetMagicListMutation } from '../documentation/magics/magicApiSlice';
import { useGetMaterialListMutation } from '../documentation/materials/materialApiSlice';
import { useGetRaceListMutation } from '../documentation/races/raceApiSlice';
import { useGetSkillListMutation } from '../documentation/skills/skillApiSlice';
import { useGetSpellListMutation } from '../documentation/spells/spellApiSlice';
import { useGetTalentListMutation } from '../documentation/talents/talentApiSlice';
import { useGetTitleListMutation } from '../documentation/titles/titleApiSlice';
import { useGetCharacterListMutation } from '../characters/characterApeSlice';
import { useGetClassesListMutation } from '../documentation/classes/classesApieSlice';
import { setDoc } from '../documentation/documentationSlice';
import { setCharacterList } from '../characters/charactersSlice';
import { useGetImage } from '../image/getImage';
import { selectCurrentToken, selectCurrentUser } from './authSlice';

function PreFetch() {
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [getAOEs] = useGetAOEListMutation();
  const [getEffects] = useGetEffectListMutation();
  const [getEnchantments] = useGetEnchantmentListMutation();
  const [getItems] = useGetItemListMutation();
  const [getMagics] = useGetMagicListMutation();
  const [getMaterials] = useGetMaterialListMutation();
  const [getRaces] = useGetRaceListMutation();
  const [getSkills] = useGetSkillListMutation();
  const [getSpells] = useGetSpellListMutation();
  const [getTalents] = useGetTalentListMutation();
  const [getTitles] = useGetTitleListMutation();
  const [getCharacters] = useGetCharacterListMutation();
  const [getClasses] = useGetClassesListMutation();

  const getImageUrl = async (id) => {
    if (id === null || id === undefined) return '';
    return useGetImage(id, token)
      .then((res) => URL.createObjectURL(res.data));
  };

  const getMaterialsList = async () => {
    let list = await getMaterials().unwrap();
    let images = [];
    images = list.materials.map((material) => getImageUrl(material.image));
    images = await Promise.all(images);
    list = list.materials.map((material, i) => ({ material, url: images[i] }));
    return list;
  };

  const getItemsList = async () => {
    let list = await getItems().unwrap();
    let images = [];

    images = list.items.map((item) => getImageUrl(item.image));
    images = await Promise.all(images);
    list = list.items.map((item, i) => ({ item, url: images[i] }));
    return list;
  };

  const reorderDocumentation = (doc) => {
    const newDoc = doc.map((model) => {
      let desiredOrder = [];
      let reorderedModels = [];
      let newModel = {};
      let key = Object.keys(model)[0];
      switch (key) {
        case 'aoes':
          desiredOrder = ['name', 'fixed', 'range'];
          break;
        case 'classes':
          desiredOrder = ['name', 'requirements', 'type', 'effects', 'skills', 'description'];
          break;
        case 'effects':
          desiredOrder = ['name', 'show', 'damageType', 'damage', 'training', 'stat', 'property', 'effect', 'duration'];
          break;
        case 'enchantments':
          desiredOrder = ['amount', 'skill', 'spell', 'antiTalent'];
          break;
        case 'magics':
          desiredOrder = ['name', 'description'];
          break;
        case 'races':
          desiredOrder = ['name', 'parent', 'training', 'weakness', 'limit', 'baseStats', 'mainSkills', 'subSkills', 'description'];
          break;
        case 'skills':
          desiredOrder = ['name', 'type', 'priority', 'cooldown', 'duration', 'stat', 'roll', 'range', 'aoes', 'effects', 'description'];
          break;
        case 'spells':
          desiredOrder = ['name', 'type', 'magics', 'requirements', 'damageType', 'damageRatio', 'durabilityRatio', 'knockbackRatio', 'cost', 'range', 'aoes', 'effects', 'description', 'charge', 'followUp'];
          break;
        case 'talent':
          desiredOrder = ['name', 'talent', 'parent', 'priority', 'measurements', 'castTime', 'duration', 'cooldown', 'charges', 'description'];
          break;
        case 'titles':
          desiredOrder = ['name', 'level', 'description', 'effects', 'skills'];
          break;
        default:
          [key] = Object.keys(model[0]);
          switch (key) {
            case 'item':
              desiredOrder = ['name', 'rarity', 'image', 'level', 'material', 'subStats', 'cost', 'type', 'baseStats', 'enchantments', 'description', 'background'];
              break;
            case 'material':
              desiredOrder = ['name', 'description', 'image', 'effects'];
              break;
            default:
              return model;
          }
          return model.map((modelObject) => {
            newModel = {};
            const reorderedObject = Object.fromEntries(
              Object.entries(modelObject[key])
                .sort(([keyA], [keyB]) => desiredOrder.indexOf(keyA) - desiredOrder.indexOf(keyB)),
            );
            newModel[key] = reorderedObject;
            newModel.url = modelObject.url;
            return newModel;
          });
      }
      reorderedModels = model[key].map((modelObject) => Object.fromEntries(
        Object.entries(modelObject)
          .sort(([keyA], [keyB]) => desiredOrder.indexOf(keyA) - desiredOrder.indexOf(keyB)),
      ));
      newModel[key] = reorderedModels;
      return newModel;
    });
    return newDoc;
  };

  const getDocumentation = async () => {
    let doc = await Promise.all([
      getAOEs().unwrap(),
      getEffects().unwrap(),
      getEnchantments().unwrap(),
      getItemsList(),
      getMagics().unwrap(),
      getMaterialsList(),
      getRaces().unwrap(),
      getSkills().unwrap(),
      getSpells().unwrap(),
      getTalents().unwrap(),
      getTitles().unwrap(),
      getClasses().unwrap(),
    ]);
    doc = reorderDocumentation(doc);
    dispatch(setDoc(doc));
  };

  const getAllCharacters = async () => {
    let charList = await getCharacters(user._id).unwrap();
    if (charList.length === 0) {
      dispatch(setCharacterList({ characters: [] }));
      return;
    }
    let images = charList.map((char) => getImageUrl(char.charIcon));
    images = await Promise.all(images);
    charList = charList.map((char, i) => ({ char, icon: images[i] }));
    dispatch(setCharacterList({ characters: charList }));
  };

  useEffect(() => {
    const list = async () => {
      getDocumentation();
      getAllCharacters();
    };

    list();
  }, []);

  return <Outlet />;
}

export default PreFetch;
