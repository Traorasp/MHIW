/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateSpellMutation } from './spellApiSlice';
import {
  addDoc, selectCurrentSpells, selectCurrentAoes, selectCurrentEffects, selectCurrentMagics,
} from '../documentationSlice';

function SpellForm(prop) {
  const { hide } = prop;
  const aoeList = useSelector(selectCurrentAoes);
  const effectsList = useSelector(selectCurrentEffects);
  const spells = useSelector(selectCurrentSpells);
  const magicList = useSelector(selectCurrentMagics);

  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [type, setType] = useState('Offensive');
  const [requirements, setRequirements] = useState('');
  const [damageType, setDamageType] = useState('Force');
  const [damageRatio, setDamageRatio] = useState(0);
  const [durabilityRatio, setDurabilityRatio] = useState(0);
  const [knockbackRatio, setKnockbackRatio] = useState(0);
  const [cost, setCost] = useState(1);
  const [range, setRange] = useState(0);
  const [magics, setMagics] = useState([]);
  const [aoes, setAoe] = useState([]);
  const [effects, setEffects] = useState([]);
  const [description, setDescription] = useState('');
  const [charge, setCharge] = useState(0);
  const [followUp, setFollowUp] = useState('');
  const [errors, setErrors] = useState([]);

  const [createSpell] = useCreateSpellMutation();

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
  const changeMagics = (e) => {
    if (magics.length > 0 && magics.find((magic) => e.target.value === magic.id)) {
      return;
    }
    const { text } = e.target.options[e.target.selectedIndex];
    const magicName = text.split(' :')[0].trim();
    setMagics([...magics, { id: e.target.value, magicName }]);
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
    try {
      const newAoes = aoes.map((aoe) => aoe.id);
      const newEffects = effects.map((effect) => effect.id);
      const newMagics = magics.map((magic) => magic.id);
      const damageTypeList = damageType.split(', ');

      const { spell } = await createSpell({
        name,
        magics: newMagics,
        type,
        requirements,
        damageType: damageTypeList,
        damageRatio,
        durabilityRatio,
        knockbackRatio,
        cost,
        range,
        aoes: newAoes,
        effects: newEffects,
        description,
        charge,
        followUp,
      }).unwrap();

      setName('');
      setMagics([]);
      setType('Offensive');
      setRequirements('');
      setDamageType('Force');
      setDamageRatio(0);
      setDurabilityRatio(0);
      setKnockbackRatio(0);
      setCost(1);
      setRange(0);
      setAoe([]);
      setEffects([]);
      setDescription('');
      setCharge(0);
      setFollowUp('');
      setErrors([]);
      const prevSpells = spells.spells ? spells.spells : spells.data;
      dispatch(addDoc({ key: 'spells', data: [...prevSpells, spell] }));
      hide();
    } catch (err) {
      setErrors(err.data.errors.errors);
    }
  };

  const removeEffect = (e) => {
    const newEffects = effects.map((info) => info);
    newEffects.splice(e.target.value, 1);
    setEffects(newEffects);
  };

  const removeAoe = (e) => {
    const newAoes = aoes.map((info) => info);
    newAoes.splice(e.target.value, 1);
    setAoe(newAoes);
  };

  const removeMagic = (e) => {
    const newMagics = magics.map((info) => info);
    newMagics.splice(e.target.value, 1);
    setMagics(newMagics);
  };

  return (
    <div className="fixed bg-black/60 h-full w-full">
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
              {spells[Object.keys(spells)[0]].map((spell) => (
                <option key={spell._id} value={spell._id}>
                  {spell.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="magics">
            Magics:
            <select id="magics" name="magics" onClick={changeMagics}>
              {magicList[Object.keys(magicList)[0]].map((magic) => (
                <option key={magic._id} value={magic._id}>
                  {magic.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        {magics.length < 1 ? '' : magics.map((magic, i) => (
          <div key={magic.id}>
            {' '}
            {magic.magicName}
            {' '}
            <button value={i} type="button" onClick={removeMagic}>X</button>
          </div>
        )) }
        <div />
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
            <button value={i} type="button" onClick={removeAoe}>X</button>
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
            <button value={i} type="button" onClick={removeEffect}>X</button>
          </div>
        )) }
        <div>
          <label htmlFor="description">
            Description:
            <textarea onChange={changeDescription} name="description" id="description" required />
          </label>
        </div>
        {errors !== undefined && errors.length > 0 ? errors.map((err) => (
          <div className="red bg-red-500 text-white text-bold" key={err.msg}>
            *
            {err.msg}
          </div>
        )) : ''}
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default SpellForm;
