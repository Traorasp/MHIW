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

  const { listOf } = prop;
  const [list, setList] = useState(aoes);

  const selectList = () => {
    switch (listOf) {
      case 'AOE':
        setList(aoes);
        break;
      case 'Effects':
        setList(effects);
        break;
      case 'Enchants':
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
    console.log();
  }, [listOf]);

  return (
    <div>
      {!list ? '' : Object.values(list)[0].map((data) => <DocInfoCard data={data} key={data._id} />)}
    </div>
  );
}

export default DocListPanel;
