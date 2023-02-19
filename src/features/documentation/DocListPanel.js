/* eslint-disable no-underscore-dangle */
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  selectCurrentAoes, selectCurrentEffects, selectCurrentEnchantments,
  selectCurrentItems, selectCurrentMagics, selectCurrentMaterials,
  selectCurrentRaces, selectCurrentSkills, selectCurrentSpells,
  selectCurrentTalents, selectCurrentTitles,
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

  const { listOf } = prop;
  const [list, setList] = useState(aoes);

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
      default:
    }
  };

  const selectUpdater = (newDoc) => {
    switch (listOf) {
      case 'AOEs':
        updateAOE(newDoc);
        break;
      case 'Effects':
        updateEffect(newDoc);
        break;
      case 'Enchantments':
        return;
      case 'Items':
        updateItem(newDoc);
        break;
      case 'Magics':
        updateMagic(newDoc);
        break;
      case 'Materials':
        updateMaterial(newDoc);
        break;
      case 'Races':
        updateRace(newDoc);
        break;
      case 'Skills':
        updateSkill(newDoc);
        break;
      case 'Spells':
        updateSpell(newDoc);
        break;
      case 'Talents':
        updateTalent(newDoc);
        break;
      case 'Titles':
        updateTitle(newDoc);
        break;
      default:
    }
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
      default:
    }
  };

  useEffect(() => {
    selectList();
  }, [listOf, aoes, effects, enchants, items,
    magics, materials, races, skills, spells,
    talents, titles]);

  const listPanel = () => {
    if (!list) {
      return '';
    }
    if (Array.isArray(list)) {
      return list.map((data) => (
        <DocInfoCard
          data={data.material}
          listOf={listOf}
          list={list}
          docUpdate={selectUpdater}
          docDelete={selectDelete}
          key={data.material._id}
          id={data.material._id}
          url={data.url}
        />
      ));
    }

    return Object.values(list)[0].map((data) => (
      <DocInfoCard
        data={data}
        listOf={listOf}
        list={list}
        docUpdate={selectUpdater}
        docDelete={selectDelete}
        key={data.material ? data.material._id : data._id}
        id={data.material ? data.material._id : data._id}
        url={data.url}
      />
    ));
  };

  return (
    <div>
      {listPanel()}
    </div>
  );
}

export default DocListPanel;
