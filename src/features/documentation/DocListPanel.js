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
  let docDelete = deleteAOE;
  let docUpdate = updateAOE;

  const selectList = () => {
    switch (listOf) {
      case 'AOEs':
        setList(aoes);
        docDelete = deleteAOE;
        docUpdate = updateAOE;
        break;
      case 'Effects':
        setList(effects);
        docDelete = deleteEffect;
        docUpdate = updateEffect;
        break;
      case 'Enchants':
        setList(enchants);
        docDelete = deleteEnchantment;
        docUpdate = 0;
        break;
      case 'Items':
        setList(items);
        docDelete = deleteItem;
        docUpdate = updateItem;
        break;
      case 'Magics':
        setList(magics);
        docDelete = deleteMagic;
        docUpdate = updateMagic;
        break;
      case 'Materials':
        setList(materials);
        docDelete = deleteMaterial;
        docUpdate = updateMaterial;
        break;
      case 'Races':
        setList(races);
        docDelete = deleteRace;
        docUpdate = updateRace;
        break;
      case 'Skills':
        setList(skills);
        docDelete = deleteSkill;
        docUpdate = updateSkill;
        break;
      case 'Spells':
        setList(spells);
        docDelete = deleteSpell;
        docUpdate = updateSpell;
        break;
      case 'Talents':
        setList(talents);
        docDelete = deleteTalent;
        docUpdate = updateTalent;
        break;
      case 'Titles':
        setList(titles);
        docDelete = deleteTitle;
        docUpdate = updateTitle;
        break;
      default:
    }
  };

  useEffect(() => {
    selectList();
  }, [listOf, aoes, effects, enchants, items,
    magics, materials, races, skills, spells,
    talents, titles]);

  return (
    <div>
      {!list ? '' : Object.values(list)[0].map((data) => <DocInfoCard data={data} listOf={listOf} list={list} docUpdate={docUpdate} docDelete={docDelete} key={data._id} id={data._id} />)}
    </div>
  );
}

export default DocListPanel;
