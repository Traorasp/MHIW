/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateEnchantmentMutation } from './enchantmentApiSlice';
import {
  addDoc, selectCurrentEnchantments, selectCurrentSkills, selectCurrentSpells, selectCurrentTalents,
} from '../documentationSlice';

function EnchantmentForm(prop) {
  const { hide } = prop;
  const skillList = useSelector(selectCurrentSkills);
  const spellsList = useSelector(selectCurrentSpells);
  const antiTalentsList = useSelector(selectCurrentTalents);
  const enchantments = useSelector(selectCurrentEnchantments);

  const dispatch = useDispatch();
  const [skill, setSkill] = useState('');
  const [spell, setSpell] = useState('');
  const [antiTalent, setAntiTalent] = useState('');
  const [amount, setAmount] = useState(1);

  const [createEnchantment] = useCreateEnchantmentMutation();

  const changeAmount = (e) => setAmount(e.target.value);

  const changeSkill = (e) => {
    setSpell('');
    setAntiTalent('');
    setSkill(e.target.value);
    document.getElementById('spell').value = '';
    document.getElementById('antiTalent').value = '';
  };

  const changeSpell = (e) => {
    setSkill('');
    setAntiTalent('');
    setSpell(e.target.value);
    document.getElementById('skill').value = '';
    document.getElementById('antiTalent').value = '';
  };

  const changeAntiTalents = (e) => {
    setSpell('');
    setSkill('');
    setAntiTalent(e.target.value);
    document.getElementById('spell').value = '';
    document.getElementById('skill').value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { enchantment } = await createEnchantment({
        skill,
        spell,
        antiTalent,
        amount,
      }).unwrap();

      setSkill('');
      setSpell('');
      setAntiTalent('');
      setAmount(0);

      const prevEnchantments = enchantments.enchantments
        ? enchantments.enchantments : enchantments.data;

      dispatch(addDoc({ key: 'enchantments', data: [...prevEnchantments, enchantment] }));
      hide();
    } catch (err) {
      console.log(err);
    }
  };

  const getCost = (type) => {
    switch (type) {
      case 'Passive':
      case 'Conditional':
      case 'Active':
      case 'Utility':
      case 'Team':
        return ' : 2';
      case 'Transformation':
      case 'Stage':
        return ' : 8';
      default:
        return '';
    }
  };

  return (
    <div className="fixed bg-black/60 h-full w-full">
      <form onSubmit={handleSubmit} className="bg-white text-xl p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%]">
        <button className="px-2" type="button" onClick={hide}>X</button>
        <div>
          <label htmlFor="skill">
            Skill:
            <select id="skill" name="skill" onClick={changeSkill}>
              <option value="">None</option>
              {skillList[Object.keys(skillList)[0]].map((skillOpt) => {
                if (skillOpt.type === 'Unique' || skillOpt.type === 'Stance' || skillOpt.type === 'Racial') {
                  return '';
                }

                return (
                  <option key={skillOpt._id} value={skillOpt._id}>
                    {skillOpt.name}
                    {' '}
                    :
                    {' '}
                    {skillOpt.type}
                    {getCost(skillOpt.type)}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="spell">
            Spells:
            <select id="spell" name="spell" onClick={changeSpell}>
              <option value="">None</option>
              {spellsList[Object.keys(spellsList)[0]].map((spellOpt) => (
                <option key={spellOpt._id} value={spellOpt._id}>
                  {spellOpt.name}
                  {' '}
                  :
                  {' '}
                  {spellOpt.type}

                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="antiTalent">
            AntiTalents:
            <select id="antiTalent" name="antiTalent" onClick={changeAntiTalents}>
              <option value="">None</option>
              {antiTalentsList[Object.keys(antiTalentsList)[0]].map((antiTalentOpt) => (
                <option key={antiTalentOpt._id} value={antiTalentOpt._id}>
                  {antiTalentOpt.parent}
                  {' '}
                  :
                  {' '}
                  {antiTalentOpt.name}
                  {' '}
                  : 4
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="amount">
            Enchantment Slots:
            <input type="number" onChange={changeAmount} value={amount} name="amount" id="amount" />
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default EnchantmentForm;
