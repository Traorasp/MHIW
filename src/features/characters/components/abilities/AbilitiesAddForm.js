/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectCurrentClasses, selectCurrentMagics,
  selectCurrentSkills, selectCurrentTitles,
} from '../../../documentation/documentationSlice';
import AbilitiesSearchBar from './AbilitiesSearchBar';

function AbilitiesAddForm(prop) {
  const {
    type, addAbility, categories, hide,
  } = prop;

  const selectAbilities = () => {
    switch (type) {
      case 'skill':
      case 'trait':
        return useSelector(selectCurrentSkills).skills;
      case 'class':
        return useSelector(selectCurrentClasses);
      case 'title':
        return useSelector(selectCurrentTitles);
      case 'magic':
        return useSelector(selectCurrentMagics);
      default:
        return [];
    }
  };

  const abilities = selectAbilities();
  const [showAbilities, setShownAbilities] = useState([]);
  const ignoredKeys = ['magics', 'effects', 'aoes', 'spells', 'skills', 'mainSkills', 'subSkills', 'enchantments', 'material', 'subStats'];

  const handleShownAbilities = (newAbilities) => { setShownAbilities(newAbilities); };

  const displayAbilities = () => showAbilities.map((ability) => (
    <div key={ability._id}>
      {Object.entries(ability).map(([key, value]) => {
        if (value === '' || value === null || value === undefined || value === 0 || key.substring(0, 1) === '_' || ignoredKeys.find((ignore) => ignore === key) || (Array.isArray(value) && (value.length === 0 || value[0] === ''))) {
          return '';
        }
        if (Array.isArray(value)) {
          console.log(key);
          return '';
        }
        return (
          <div key={key}>
            {`${key.substring(0, 1).toUpperCase() + key.substring(1)} : `}
            {value}
          </div>
        );
      })}
      <button value={ability._id} type="button" onClick={addAbility}>+</button>
    </div>
  ));

  return (
    <div className="fixed bg-black/60 h-full w-full top-[4rem] left-0">
      <div className="bg-white text-xl p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%]">
        <button type="button" onClick={hide}>X</button>
        <AbilitiesSearchBar
          abilities={abilities}
          categories={categories}
          setSelectedAbilities={handleShownAbilities}
        />
        {displayAbilities()}
      </div>
    </div>
  );
}

export default AbilitiesAddForm;
