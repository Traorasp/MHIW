/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateSkillMutation } from './skillApiSlice';
import {
  addDoc, selectCurrentSkills, selectCurrentAoes, selectCurrentEffects,
} from '../documentationSlice';

function SkillForm(prop) {
  const { hide } = prop;
  const aoeList = useSelector(selectCurrentAoes);
  const effectsList = useSelector(selectCurrentEffects);
  const skills = useSelector(selectCurrentSkills);

  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [type, setType] = useState('Unique');
  const [priority, setPriority] = useState('Passive');
  const [cooldown, setCooldown] = useState(0);
  const [duration, setDuration] = useState(0);
  const [stat, setStat] = useState('');
  const [roll, setRoll] = useState(0);
  const [range, setRange] = useState(0);
  const [aoes, setAoe] = useState([]);
  const [effects, setEffects] = useState([]);
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);

  const [createSkill] = useCreateSkillMutation();

  const changeName = (e) => setName(e.target.value);
  const changeType = (e) => setType(e.target.value);
  const changePriority = (e) => setPriority(e.target.value);
  const changeCooldown = (e) => setCooldown(e.target.value);
  const changeDuration = (e) => setDuration(e.target.value);
  const changeStat = (e) => setStat(e.target.value);
  const changeRoll = (e) => setRoll(e.target.value);
  const changeRange = (e) => setRange(e.target.value);
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
    try {
      const newAoes = aoes.map((aoe) => aoe.id);
      const newEffects = effects.map((effect) => effect.id);
      const { skill } = await createSkill({
        name,
        type,
        priority,
        cooldown,
        duration,
        stat,
        roll,
        range,
        aoes: newAoes,
        effects: newEffects,
        description,
      }).unwrap();

      setName('');
      setType('');
      setPriority('');
      setCooldown(0);
      setDuration(0);
      setStat('');
      setRoll(0);
      setRange(0);
      setAoe([]);
      setEffects([]);
      setDescription('');
      setErrors([]);
      const prevSkills = skills.skills ? skills.skills : skills.data;
      dispatch(addDoc({ key: 'skills', data: [...prevSkills, skill] }));
      hide();
    } catch (err) {
      setErrors(err.data.errors.errors);
    }
  };

  const removeAoe = (e) => {
    setAoe(aoes.length === 1 ? [] : aoes.splice(e.target.key, 1));
  };

  const removeEffect = (e) => {
    setEffects(effects.length === 1 ? [] : effects.splice(e.target.key, 1));
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
              <option value="Unique">Unique</option>
              <option value="Passive">Passive</option>
              <option value="Active">Active</option>
              <option value="Stage">Stage</option>
              <option value="Stance">Stance</option>
              <option value="Transformation">Transformation</option>
              <option value="Team">Team</option>
              <option value="Conditional">Conditional</option>
              <option value="Utility">Utility</option>
              <option value="Bonus">Bonus</option>
              <option value="Racial">Racial</option>
              <option value="Will">Will</option>
              <option value="Charisma">Charisma</option>
              <option value="Intimidation">Intimidation</option>
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="priority">
            Priority:
            <select id="type" name="type" onChange={changePriority} required>
              <option value="Passive">Passive</option>
              <option value="Action">Action</option>
              <option value="Bonus Action">Bonus Action</option>
              <option value="Reaction">Reaction</option>
              <option value="Multi">Multi</option>
              <option value="First">First</option>
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="cooldown">
            Cooldown:
            <input type="number" min="0" id="cooldown" value={cooldown} onChange={changeCooldown} />
          </label>
        </div>
        <div>
          <label htmlFor="duration">
            Duration:
            <input type="number" min="0" id="duration" value={duration} onChange={changeDuration} required />
          </label>
        </div>
        <div>
          <label htmlFor="stat">
            Stat:
            <input type="text" id="stat" value={stat} onChange={changeStat} />
          </label>
        </div>
        <div>
          <label htmlFor="roll">
            Roll:
            <input type="number" min="0" id="roll" value={roll} onChange={changeRoll} />
          </label>
        </div>
        <div>
          <label htmlFor="range">
            Range:
            <input type="number" min="0" id="range" value={range} onChange={changeRange} />
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
                  {effect.effect}
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

export default SkillForm;
