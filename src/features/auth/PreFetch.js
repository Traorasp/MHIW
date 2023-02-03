/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetEffectListMutation } from '../documentation/effects/effectApiSlice';
import { useGetAOEListMutation } from '../documentation/aoes/aoeApiSlice';
import { useGetEnchantmentListMutation } from '../documentation/enchntments/enchantmentApiSlice';
import { useGetItemListMutation } from '../documentation/items/itemApiSlice';
import { useGetMagicListMutation } from '../documentation/magics/magicApiSlice';
import { useGetMaterialListMutation } from '../documentation/materials/materialApiSlice';
import { useGetRaceListMutation } from '../documentation/races/raceApiSlice';
import { useGetSkillListMutation } from '../documentation/skills/skillApiSlice';
import { useGetSpellListMutation } from '../documentation/spells/spellApiSlice';
import { useGetTalentListMutation } from '../documentation/talents/talentApiSlice';
import { useGetTitleListMutation } from '../documentation/titles/titleApiSlice';
import { setDoc } from '../documentation/documentationSlice';

function PreFetch() {
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

  const getDocumentation = async () => {
    const doc = await Promise.all([
      getAOEs().unwrap(),
      getEffects().unwrap(),
      getEnchantments().unwrap(),
      getItems().unwrap(),
      getMagics().unwrap(),
      getMaterials().unwrap(),
      getRaces().unwrap(),
      getSkills().unwrap(),
      getSpells().unwrap(),
      getTalents().unwrap(),
      getTitles().unwrap(),
    ]);
    dispatch(setDoc(doc));
    console.log(doc);
  };

  useEffect(() => {
    const list = async () => {
      getDocumentation();
    };

    list();
  }, []);

  return <Outlet />;
}

export default PreFetch;
