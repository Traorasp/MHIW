/* eslint-disable no-underscore-dangle */
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  selectCurrentAoes, selectCurrentEffects, selectCurrentEnchantments,
  selectCurrentItems, selectCurrentMagics, selectCurrentMaterials,
  selectCurrentRaces, selectCurrentSkills, selectCurrentSpells,
  selectCurrentTalents, selectCurrentTitles, selectCurrentClasses,
} from './documentationSlice';
import DocInfoCard from './DocInfoCard';
import { useDeleteAOEMutation, useUpdateAOEMutation } from './aoes/aoeApiSlice';
import { useDeleteEffectMutation, useUpdateEffectMutation } from './effects/effectApiSlice';
import { useDeleteEnchantmentMutation } from './enchantments/enchantmentApiSlice';
import { useDeleteItemMutation, useUpdateItemMutation } from './items/itemApiSlice';
import { useDeleteMagicMutation, useUpdateMagicMutation } from './magics/magicApiSlice';
import { useDeleteMaterialMutation, useUpdateMaterialMutation } from './materials/materialApiSlice';
import { useDeleteRaceMutation, useUpdateRaceMutation } from './races/raceApiSlice';
import { useDeleteSkillMutation, useUpdateSkillMutation } from './skills/skillApiSlice';
import { useDeleteSpellMutation, useUpdateSpellMutation } from './spells/spellApiSlice';
import { useDeleteTalentMutation, useUpdateTalentMutation } from './talents/talentApiSlice';
import { useDeleteTitleMutation, useUpdateTitleMutation } from './titles/titleApiSlice';
import { useDeleteClassesMutation, useUpdateClassesMutation } from './classes/classesApieSlice';

function DocListPanel(prop) {
  const aoes = useSelector(selectCurrentAoes);
  const effects = useSelector(selectCurrentEffects);
  const enchants = useSelector(selectCurrentEnchantments);
  const items = useSelector(selectCurrentItems);
  const magics = useSelector(selectCurrentMagics);
  const materials = useSelector(selectCurrentMaterials);
  const races = useSelector(selectCurrentRaces);
  const skills = useSelector(selectCurrentSkills);
  const spells = useSelector(selectCurrentSpells);
  const talents = useSelector(selectCurrentTalents);
  const titles = useSelector(selectCurrentTitles);
  const classes = useSelector(selectCurrentClasses);

  const [deleteAOE] = useDeleteAOEMutation();
  const [deleteEffect] = useDeleteEffectMutation();
  const [deleteEnchantment] = useDeleteEnchantmentMutation();
  const [deleteItem] = useDeleteItemMutation();
  const [deleteMagic] = useDeleteMagicMutation();
  const [deleteMaterial] = useDeleteMaterialMutation();
  const [deleteRace] = useDeleteRaceMutation();
  const [deleteSkill] = useDeleteSkillMutation();
  const [deleteSpell] = useDeleteSpellMutation();
  const [deleteTalent] = useDeleteTalentMutation();
  const [deleteTitle] = useDeleteTitleMutation();
  const [deleteClass] = useDeleteClassesMutation();

  const [updateAOE] = useUpdateAOEMutation();
  const [updateEffect] = useUpdateEffectMutation();
  const [updateItem] = useUpdateItemMutation();
  const [updateMagic] = useUpdateMagicMutation();
  const [updateMaterial] = useUpdateMaterialMutation();
  const [updateRace] = useUpdateRaceMutation();
  const [updateSkill] = useUpdateSkillMutation();
  const [updateSpell] = useUpdateSpellMutation();
  const [updateTalent] = useUpdateTalentMutation();
  const [updateTitle] = useUpdateTitleMutation();
  const [updateClass] = useUpdateClassesMutation();

  const { listOf } = prop;
  const [list, setList] = useState(aoes);
  const [newList, setNewList] = useState(null);
  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('');

  const selectDelete = (id) => {
    switch (listOf) {
      case 'AOEs':
        deleteAOE(id);
        break;
      case 'Effects':
        deleteEffect(id);
        break;
      case 'Enchantments':
        deleteEnchantment(id);
        break;
      case 'Items':
        deleteItem(id);
        break;
      case 'Magics':
        deleteMagic(id);
        break;
      case 'Materials':
        deleteMaterial(id);
        break;
      case 'Races':
        deleteRace(id);
        break;
      case 'Skills':
        deleteSkill(id);
        break;
      case 'Spells':
        deleteSpell(id);
        break;
      case 'Talents':
        deleteTalent(id);
        break;
      case 'Titles':
        deleteTitle(id);
        break;
      case 'Classes':
        deleteClass(id);
        break;
      default:
    }
  };

  const selectUpdater = async (newDoc) => {
    switch (listOf) {
      case 'AOEs':
        return updateAOE(newDoc);
      case 'Effects':
        return updateEffect(newDoc);
      case 'Enchantments':
        return '';
      case 'Items':
        return updateItem(newDoc);
      case 'Magics':
        return updateMagic(newDoc);
      case 'Materials':
        return updateMaterial(newDoc);
      case 'Races':
        return updateRace(newDoc);
      case 'Skills':
        return updateSkill(newDoc);
      case 'Spells':
        return updateSpell(newDoc);
      case 'Talents':
        return updateTalent(newDoc);
      case 'Titles':
        return updateTitle(newDoc);
      case 'Classes':
        return updateClass(newDoc);
      default:
    }
    return '';
  };

  const selectList = () => {
    switch (listOf) {
      case 'AOEs':
        setList(aoes);
        break;
      case 'Effects':
        setList(effects);
        break;
      case 'Enchantments':
        setList(enchants);
        break;
      case 'Items':
        setList(items);
        break;
      case 'Magics':
        setList(magics);
        break;
      case 'Materials':
        setList(materials);
        break;
      case 'Races':
        setList(races);
        break;
      case 'Skills':
        setList(skills);
        break;
      case 'Spells':
        setList(spells);
        break;
      case 'Talents':
        setList(talents);
        break;
      case 'Titles':
        setList(titles);
        break;
      case 'Classes':
        setList(classes);
        break;
      default:
    }
  };

  useEffect(() => {
    selectList();
    setNewList(null);
  }, [listOf, aoes, effects, enchants, items,
    magics, materials, races, skills, spells,
    talents, titles, classes]);

  const selectData = (data) => {
    if (data.material) {
      return data.material._id;
    }
    if (data.item) {
      return data.item._id;
    }
    return data._id;
  };

  const listPanel = (currList) => {
    if (!currList) {
      return '';
    }
    if (currList.length === 0) {
      return <div>No search results</div>;
    }
    if (Array.isArray(currList)) {
      if (listOf !== 'Items' && listOf !== 'Materials') {
        return currList.map((data) => (
          <DocInfoCard
            data={data}
            listOf={listOf}
            list={list}
            docUpdate={selectUpdater}
            docDelete={selectDelete}
            key={selectData(data)}
            id={selectData(data)}
            url={data.url}
          />
        ));
      }
      return currList.map((data) => (
        <DocInfoCard
          data={data.material ? data.material : data.item}
          listOf={listOf}
          list={list}
          docUpdate={selectUpdater}
          docDelete={selectDelete}
          key={selectData(data)}
          id={selectData(data)}
          url={data.url}
        />
      ));
    }
    return Object.values(currList)[0].map((data) => (
      <DocInfoCard
        data={data}
        listOf={listOf}
        list={list}
        docUpdate={selectUpdater}
        docDelete={selectDelete}
        key={selectData(data)}
        id={selectData(data)}
        url={data.url}
      />
    ));
  };

  const changeSearch = (e) => {
    setSearch(e.target.value);
    if (!list) {
      return;
    }
    if (e.target.value === '') {
      setNewList(null);
      return;
    }
    let allItems;
    let filteredList;
    const expression = new RegExp(`${e.target.value.toLowerCase()}`);

    if (Array.isArray(list) && listOf !== 'Races') {
      if (listOf === 'Materials') {
        filteredList = list.filter((item) => (`${item.material[searchType]}`.toLowerCase().search(expression) !== -1));
      } else {
        filteredList = list.filter((item) => (`${item.item[searchType]}`.toLowerCase().search(expression) !== -1));
      }
    } else {
      allItems = list[Object.keys(list)[0]];
      filteredList = allItems.filter((item) => (`${item[searchType]}`.toLowerCase().search(expression) !== -1));
    }
    setNewList(filteredList);
  };

  const changeSearchType = (e) => setSearchType(e.target.value);

  const ignoredKeys = ['_id', '__v', 'baseStats', 'effects', 'aoe', 'spells', 'skills', 'mainSkills', 'subSkills', 'enchantments', 'material', 'subStat'];

  const [searchOptionList, setSearchOptionList] = useState([]);

  const getSearchOptions = () => {
    if (!list) {
      return;
    }
    let searchTerms;
    if (Array.isArray(list) && listOf !== 'Races') {
      if (listOf === 'Materials' && list[0].material) {
        searchTerms = Object.keys(list[0].material);
      } else if (listOf === 'Items' && list[0].item) {
        searchTerms = Object.keys(list[0].item);
      }
      return;
    }
    searchTerms = Object.keys(Object.values(list)[0][0]);

    searchTerms = searchTerms.filter((key) => !ignoredKeys.find((ignore) => ignore === key));
    setSearchOptionList(searchTerms);
    setSearchType(searchTerms[0]);
    setSearch('');
  };

  useEffect(() => {
    getSearchOptions();
  }, [list]);

  return (
    <div>
      <label htmlFor="searchBar">
        Search
        <input id="searchBar" type="text" name="search" onChange={changeSearch} value={search} />
        <select id="searchType" onChange={changeSearchType} value={searchType}>
          {
            searchOptionList.map((option) => (
              <option key={option} value={option}>
                {`${option.substring(0, 1).toUpperCase() + option.substring(1)}`}
              </option>
            ))
          }
        </select>
      </label>
      {listPanel(newList || list)}
    </div>
  );
}

export default DocListPanel;
