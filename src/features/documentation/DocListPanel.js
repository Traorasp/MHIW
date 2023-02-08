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

import { useDeleteAOEMutation } from './aoes/aoeApiSlice';
import { useDeleteEffectMutation } from './effects/effectApiSlice';
import { useDeleteEnchantmentMutation } from './enchntments/enchantmentApiSlice';
import { useDeleteItemMutation } from './items/itemApiSlice';
import { useDeleteMagicMutation } from './magics/magicApiSlice';
import { useDeleteMaterialMutation } from './materials/materialApiSlice';
import { useDeleteRaceMutation } from './races/raceApiSlice';
import { useDeleteSkillMutation } from './skills/skillApiSlice';
import { useDeleteSpellMutation } from './spells/spellApiSlice';
import { useDeleteTalentMutation } from './talents/talentApiSlice';
import { useDeleteTitleMutation } from './titles/titleApiSlice';

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

  const { listOf } = prop;
  const [list, setList] = useState(aoes);
  let docDelete = deleteAOE;

  const selectList = () => {
    switch (listOf) {
      case 'AOEs':
        setList(aoes);
        docDelete = deleteAOE;
        break;
      case 'Effects':
        setList(effects);
        docDelete = deleteEffect;
        break;
      case 'Enchants':
        setList(enchants);
        docDelete = deleteEnchantment;
        break;
      case 'Items':
        setList(items);
        docDelete = deleteItem;
        break;
      case 'Magics':
        setList(magics);
        docDelete = deleteMagic;
        break;
      case 'Materials':
        setList(materials);
        docDelete = deleteMaterial;
        break;
      case 'Races':
        setList(races);
        docDelete = deleteRace;
        break;
      case 'Skills':
        setList(skills);
        docDelete = deleteSkill;
        break;
      case 'Spells':
        setList(spells);
        docDelete = deleteSpell;
        break;
      case 'Talents':
        setList(talents);
        docDelete = deleteTalent;
        break;
      case 'Titles':
        setList(titles);
        docDelete = deleteTitle;
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
      {!list ? '' : Object.values(list)[0].map((data) => <DocInfoCard data={data} listOf={listOf} list={list} docDelete={docDelete} key={data._id} id={data._id} />)}
    </div>
  );
}

export default DocListPanel;
