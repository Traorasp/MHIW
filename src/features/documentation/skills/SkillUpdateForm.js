/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectCurrentAoes, selectCurrentEffects,
} from '../documentationSlice';

function SkillUpdateForm(prop) {
  const {
    hide, skill, update, newDoc, errors,
  } = prop;
  const aoeList = useSelector(selectCurrentAoes);
  const effectsList = useSelector(selectCurrentEffects);

  const getEffects = () => {
    const list = effectsList[Object.keys(effectsList)[0]]
      .filter((effect) => (!!skill.effects.find((id) => id === effect._id)));
    return list.map((effect) => ({ id: effect._id, effectName: effect.name }));
  };

  const getAoes = () => {
    const list = aoeList[Object.keys(aoeList)[0]]
      .filter((aoe) => (!!skill.aoes.find((id) => id === aoe._id)));
    return list.map((aoe) => ({ id: aoe._id, aoeName: aoe.name }));
  };

  const [name, setName] = useState(skill.name);
  const [type, setType] = useState(skill.type);
  const [priority, setPriority] = useState(skill.priority);
  const [cooldown, setCooldown] = useState(skill.cooldown);
  const [duration, setDuration] = useState(skill.duration);
  const [stat, setStat] = useState(skill.stat);
  const [roll, setRoll] = useState(skill.roll);
  const [range, setRange] = useState(skill.range);
  const [aoes, setAoe] = useState([...getAoes(skill.aoes)]);
  const [effects, setEffects] = useState([...getEffects(skill.effects)]);
  const [description, setDescription] = useState(skill.description);

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    const newEffects = effects.map((effect) => effect.id);
    const newAoes = aoes.map((aoe) => aoe.id);

    newDoc.id = skill._id;
    newDoc.name = name;
    newDoc.type = type;
    newDoc.priority = priority;
    newDoc.cooldown = cooldown;
    newDoc.duration = duration;
    newDoc.stat = stat;
    newDoc.roll = roll;
    newDoc.range = range;
    newDoc.aoe = newAoes;
    newDoc.effects = newEffects;
    newDoc.description = description;

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
      <form onSubmit={handleUpdate} className="bg-white text-xl p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%]">
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
            <textarea onChange={changeDescription} value={description} name="description" id="description" required />
          </label>
        </div>
        {errors !== undefined && errors.length > 0 ? errors.map((err) => (
          <div className="red bg-red-500 text-white text-bold" key={err.msg}>
            *
            {err.msg}
          </div>
        )) : ''}
        <button type="submit">update</button>
      </form>
    </div>
  );
}

export default SkillUpdateForm;
