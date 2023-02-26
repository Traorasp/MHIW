/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectCurrentSpells, selectCurrentAoes, selectCurrentEffects,
} from '../documentationSlice';

function SpellUpdateForm(prop) {
  const {
    hide, spell, update, newDoc, errors,
  } = prop;
  const aoeList = useSelector(selectCurrentAoes);
  const effectsList = useSelector(selectCurrentEffects);
  const spells = useSelector(selectCurrentSpells);

  const getEffects = () => {
    const list = effectsList[Object.keys(effectsList)[0]]
      .filter((effect) => (!!spell.effects.find((id) => id === effect._id)));
    return list.map((effect) => ({ id: effect._id, effectName: effect.name }));
  };

  const getAoes = () => {
    const list = aoeList[Object.keys(aoeList)[0]]
      .filter((aoe) => (!!spell.aoes.find((id) => id === aoe._id)));
    return list.map((aoe) => ({ id: aoe._id, aoeName: aoe.name }));
  };

  const [name, setName] = useState(spell.name);
  const [type, setType] = useState(spell.type);
  const [requirements, setRequirements] = useState(spell.requirements);
  const [damageType, setDamageType] = useState(spell.damageType.join(', '));
  const [damageRatio, setDamageRatio] = useState(spell.damageRatio);
  const [durabilityRatio, setDurabilityRatio] = useState(spell.durabilityRatio);
  const [knockbackRatio, setKnockbackRatio] = useState(spell.knockbackRatio);
  const [cost, setCost] = useState(spell.cost);
  const [range, setRange] = useState(spell.range);
  const [aoes, setAoe] = useState([...getAoes(spell.aoes)]);
  const [effects, setEffects] = useState([...getEffects(spell.effects)]);
  const [description, setDescription] = useState(spell.description);
  const [charge, setCharge] = useState(spell.charge);
  const [followUp, setFollowUp] = useState(spell.followUp);

  const changeName = (e) => setName(e.target.value);
  const changeType = (e) => setType(e.target.value);
  const changeRequirements = (e) => setRequirements(e.target.value);
  const changeDamageType = (e) => setDamageType(e.target.value);
  const changeDamageRatio = (e) => setDamageRatio(e.target.value);
  const changeDurabilityRatio = (e) => setDurabilityRatio(e.target.value);
  const changeKnockbackRatio = (e) => setKnockbackRatio(e.target.value);
  const changeCost = (e) => setCost(e.target.value);
  const changeRange = (e) => setRange(e.target.value);
  const changeCharge = (e) => setCharge(e.target.value);
  const changeFollowUp = (e) => setFollowUp(e.target.value);
  const changeAoes = (e) => {
    if (aoes.length > 0 && aoes.find((aoe) => e.target.value === aoe.id)) {
      return;
    }
    const { text } = e.target.options[e.target.selectedIndex];
    const aoeName = text.split(' :')[0].trim();
    setAoe([...aoes, { id: e.target.value, aoeName }]);
  };
  const changeEffects = (e) => {
    if (effects.length > 0 && effects.find((effect) => e.target.value === effect.id)) {
      return;
    }
    const { text } = e.target.options[e.target.selectedIndex];
    const effectName = text.split(' :')[0].trim();
    setEffects([...effects, { id: e.target.value, effectName }]);
  };

  const changeDescription = (e) => setDescription(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAoes = aoes.map((aoe) => aoe.id);
    const newEffects = effects.map((effect) => effect.id);
    const damageTypeList = damageType.split(', ');

    newDoc.id = spell._id;
    newDoc.name = name;
    newDoc.type = type;
    newDoc.requirements = requirements;
    newDoc.damageType = damageTypeList;
    newDoc.damageRatio = damageRatio;
    newDoc.durabilityRatio = durabilityRatio;
    newDoc.knockbackRatio = knockbackRatio;
    newDoc.cost = cost;
    newDoc.range = range;
    newDoc.aoes = newAoes;
    newDoc.effects = newEffects;
    newDoc.description = description;
    newDoc.charge = charge;
    newDoc.followUp = followUp;

    update();
  };

  const removeAoe = (e) => {
    setAoe(aoes.length === 1 ? [] : aoes.splice(e.target.key, 1));
  };

  const removeEffect = (e) => {
    setEffects(effects.length === 1 ? [] : effects.splice(e.target.key, 1));
  };

  return (
    <div className="fixed bg-black/60 h-full w-full top-[4rem] left-0">
      <form onSubmit={handleSubmit} className="bg-white text-xl p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%]">
        <button className="px-2" type="button" onClick={hide}>X</button>
        <div>
          <label htmlFor="name">
            Name:
            <input type="text" id="name" onChange={changeName} value={name} required />
          </label>
        </div>
        <div>
          <label htmlFor="type">
            Type:
            <select id="type" name="type" onChange={changeType} required>
              <option value="Offensive">Offensive</option>
              <option value="Defensive">Defensive</option>
              <option value="Enhancement">Enhancement</option>
              <option value="Conjuring">Conjuring</option>
              <option value="Illusion">Illusion</option>
              <option value="Passive">Passive</option>
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="requirements">
            Requirements:
            <input type="text" id="requirements" value={requirements} onChange={changeRequirements} />
          </label>
          <div>
            <label htmlFor="damageType">
              Damage Type:
              <input type="text" id="damageType" value={damageType} onChange={changeDamageType} required />
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="damageRatio">
            Damage:
            <input type="number" min="0" id="damageRatio" value={damageRatio} onChange={changeDamageRatio} step=".1" />
          </label>
        </div>
        <div>
          <label htmlFor="durabilityRatio">
            Durability:
            <input type="number" min="0" id="durabilityRatio" value={durabilityRatio} onChange={changeDurabilityRatio} step=".1" />
          </label>
        </div>
        <div>
          <label htmlFor="knockbackRatio">
            Knockback:
            <input type="number" min="0" id="knockbackRatio" value={knockbackRatio} onChange={changeKnockbackRatio} step=".01" />
          </label>
        </div>
        <div>
          <label htmlFor="cost">
            Cost:
            <input type="number" min="0" id="roll" value={cost} onChange={changeCost} required />
          </label>
        </div>
        <div>
          <label htmlFor="range">
            Range:
            <input type="number" min="0" id="range" value={range} onChange={changeRange} required />
          </label>
        </div>
        <div>
          <label htmlFor="charge">
            Charge:
            <input type="text" onChange={changeCharge} value={charge} name="charge" id="charge" />
          </label>
        </div>
        <div>
          <label htmlFor="followUp">
            Follow Up:
            <select id="followUp" name="followUp" onChange={changeFollowUp}>
              <option value="">None</option>
              {spells[Object.keys(spells)[0]].map((spellCell) => (
                <option key={spellCell._id} value={spellCell._id}>
                  {spellCell.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="aoes">
            Aoes:
            <select id="aoes" name="aoes" onClick={changeAoes}>
              {aoeList[Object.keys(aoeList)[0]].map((aoe) => (
                <option key={aoe._id} value={aoe._id}>
                  {aoe.name}
                  {' '}
                  :
                  {' '}
                  {aoe.fixed ? 'T' : 'F'}
                  {' '}
                  :
                  {' '}
                  {aoe.range}
                </option>
              ))}
            </select>
          </label>
        </div>
        {aoes.length < 1 ? '' : aoes.map((aoe, i) => (
          <div key={aoe.id}>
            {' '}
            {aoe.aoeName}
            {' '}
            <button key={i} type="button" onClick={removeAoe}>X</button>
          </div>
        )) }
        <div>
          <label htmlFor="effects">
            Effects:
            <select id="effects" name="effects" onClick={changeEffects}>
              {effectsList[Object.keys(effectsList)[0]].map((effect) => (
                <option key={effect._id} value={effect._id}>
                  {effect.name}
                  {' '}
                  :
                  {' '}
                  {effect.damage}
                  {' '}
                  :
                  {' '}
                  {effect.duration}
                </option>
              ))}
            </select>
          </label>
        </div>
        {effects.length < 1 ? '' : effects.map((effect, i) => (
          <div key={effect.id}>
            {' '}
            {effect.effectName}
            {' '}
            <button key={i} type="button" onClick={removeEffect}>X</button>
          </div>
        )) }
        <div>
          <label htmlFor="description">
            Description:
            <textarea onChange={changeDescription} name="description" id="description" value={description} required />
          </label>
        </div>
        {errors !== undefined && errors.length > 0 ? errors.map((err) => (
          <div className="red bg-red-500 text-white text-bold" key={err.msg}>
            *
            {err.msg}
          </div>
        )) : ''}
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default SpellUpdateForm;
