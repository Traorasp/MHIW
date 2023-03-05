/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateRaceMutation } from './raceApiSlice';
import {
  addDoc, selectCurrentRaces, selectCurrentSkills, selectCurrentEffects,
} from '../documentationSlice';

function RaceForm(prop) {
  const { hide } = prop;
  const skillList = useSelector(selectCurrentSkills);
  const effectsList = useSelector(selectCurrentEffects);
  const races = useSelector(selectCurrentRaces);

  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [parent, setParent] = useState('Human');
  const [training, setTraining] = useState('');
  const [weakness, setWeakness] = useState('');
  const [limit, setLimit] = useState(100);
  const [health, setHealth] = useState(0);
  const [defense, setDefense] = useState(0);
  const [strength, setStrength] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [mana, setMana] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [evasion, setEvasion] = useState(0);
  const [charisma, setCharisma] = useState(0);
  const [will, setWill] = useState(0);
  const [intimidation, setIntimidation] = useState(0);
  const [hiding, setHiding] = useState(0);
  const [tracking, setTracking] = useState(0);
  const [mainSkills, setMainSkills] = useState([]);
  const [subSkills, setSubSkills] = useState([]);
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);

  const [createRace] = useCreateRaceMutation();

  const changeName = (e) => setName(e.target.value);
  const changeParent = (e) => setParent(e.target.value);
  const changeTraining = (e) => setTraining(e.target.value);
  const changeWeakness = (e) => setWeakness(e.target.value);
  const changeLimit = (e) => setLimit(e.target.value);
  const changeHealth = (e) => setHealth(e.target.value);
  const changeDefense = (e) => setDefense(e.target.value);
  const changeStrength = (e) => setStrength(e.target.value);
  const changeSpeed = (e) => setSpeed(e.target.value);
  const changeMana = (e) => setMana(e.target.value);
  const changeAccuracy = (e) => setAccuracy(e.target.value);
  const changeEvasion = (e) => setEvasion(e.target.value);
  const changeCharisma = (e) => setCharisma(e.target.value);
  const changeWill = (e) => setWill(e.target.value);
  const changeIntimidaion = (e) => setIntimidation(e.target.value);
  const changeHiding = (e) => setHiding(e.target.value);
  const changeTracking = (e) => setTracking(e.target.value);
  const changeMainSkills = (e) => {
    if (mainSkills.length === 3) {
      return;
    }
    if (mainSkills.length > 0 && mainSkills.find((skill) => e.target.value === skill.id)) {
      return;
    }
    const { text } = e.target.options[e.target.selectedIndex];
    const skillName = text.split(' :')[0].trim();
    setMainSkills([...mainSkills, { id: e.target.value, skillName }]);
  };
  const changeSubSkills = (e) => {
    if (subSkills.length === 5) {
      return;
    }
    if (subSkills.length > 0 && subSkills.find((skill) => e.target.value === skill.id)) {
      return;
    }
    const { text } = e.target.options[e.target.selectedIndex];
    const skillName = text.split(' :')[0].trim();
    setSubSkills([...subSkills, { id: e.target.value, skillName }]);
  };
  const changeDescription = (e) => setDescription(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newMainSkills = mainSkills.map((skill) => skill.id);
      const newSubSkills = subSkills.map((skill) => skill.id);
      const weaknessList = weakness.split(', ');

      const { race } = await createRace({
        name,
        parent,
        training,
        weakness: weaknessList,
        limit,
        baseStats: {
          health,
          defense,
          strength,
          speed,
          mana,
          accuracy,
          evasion,
          charisma,
          will,
          intimidation,
          hiding,
          tracking,
        },
        mainSkills: newMainSkills,
        subSkills: newSubSkills,
        description,
      }).unwrap();

      setName('');
      setParent('Human');
      setTraining('');
      setWeakness('');
      setLimit(100);
      setHealth(0);
      setDefense(0);
      setStrength(0);
      setSpeed(0);
      setMana(0);
      setAccuracy(0);
      setEvasion(0);
      setCharisma(0);
      setWill(0);
      setIntimidation(0);
      setHiding(0);
      setTracking(0);
      setMainSkills([]);
      setSubSkills([]);
      setDescription('');
      setErrors([]);

      const prevRaces = races.races ? races.races : races.data;
      dispatch(addDoc({ key: 'races', data: [...prevRaces, race] }));
      hide();
    } catch (err) {
      setErrors(err.data.errors.errors);
    }
  };

  const removeMainSkill = (e) => {
    const newMainSkills = mainSkills.map((info) => info);
    newMainSkills.splice(e.target.value, 1);
    setMainSkills(newMainSkills);
  };

  const removeSubSkill = (e) => {
    const newSubSkills = subSkills.map((info) => info);
    newSubSkills.splice(e.target.value, 1);
    setSubSkills(newSubSkills);
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
          <label htmlFor="parent">
            Parent:
            <input type="text" id="parent" onChange={changeParent} value={parent} required />
          </label>
        </div>
        <div>
          <label htmlFor="weakness">
            Weakness:
            <input type="text" id="weakness" onChange={changeWeakness} value={weakness} />
          </label>
        </div>
        <div>
          <label htmlFor="limit">
            Limit:
            <input type="number" min={0} id="limit" onChange={changeLimit} value={limit} required />
          </label>
        </div>
        <div>
          <label htmlFor="health">
            Health:
            <input type="number" min={0} max={limit * 100} id="health" onChange={changeHealth} value={health} required />
          </label>
        </div>
        <div>
          <label htmlFor="defense">
            Defense:
            <input type="number" min={0} max={limit * 10} id="defense" onChange={changeDefense} value={defense} required />
          </label>
        </div>
        <div>
          <label htmlFor="strength">
            Strength:
            <input type="number" min={0} max={limit} id="strength" onChange={changeStrength} value={strength} required />
          </label>
        </div>
        <div>
          <label htmlFor="speed">
            Speed:
            <input type="number" min={0} max={limit} id="speed" onChange={changeSpeed} value={speed} required />
          </label>
        </div>
        <div>
          <label htmlFor="mana">
            Mana:
            <input type="number" min={0} max={limit * 10} id="mana" onChange={changeMana} value={mana} required />
          </label>
        </div>
        <div>
          <label htmlFor="accuracy">
            Accuracy:
            <input type="number" min={0} max={100} id="accuracy" onChange={changeAccuracy} value={accuracy} required />
          </label>
        </div>
        <div>
          <label htmlFor="evasion">
            Evasion:
            <input type="number" min={0} max={100} id="evasion" onChange={changeEvasion} value={evasion} required />
          </label>
        </div>
        <div>
          <label htmlFor="charisma">
            Charisma:
            <input type="number" min={0} max={limit} id="charisma" onChange={changeCharisma} value={charisma} required />
          </label>
        </div>
        <div>
          <label htmlFor="will">
            Will:
            <input type="number" min={0} max={limit} id="will" onChange={changeWill} value={will} required />
          </label>
        </div>
        <div>
          <label htmlFor="intimidation">
            Tntimidation:
            <input type="number" min={0} max={limit} id="intimidation" onChange={changeIntimidaion} value={intimidation} required />
          </label>
        </div>
        <div>
          <label htmlFor="hiding">
            Hiding:
            <input type="number" min={0} max={100} id="hiding" onChange={changeHiding} value={hiding} required />
          </label>
        </div>
        <div>
          <label htmlFor="tracking">
            Tracking:
            <input type="number" min={0} max={100} id="tracking" onChange={changeTracking} value={tracking} required />
          </label>
        </div>
        <div>
          <label htmlFor="training">
            Training:
            <select id="training" name="training" onClick={changeTraining}>
              <option value="">None</option>
              {effectsList[Object.keys(effectsList)[0]].map((effect) => {
                if (effect.training.length < 1) return '';
                return (
                  <option key={effect._id} value={effect._id}>
                    {effect.name}
                    {' '}
                    :
                    {' '}
                    {effect.training}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="mainSkill">
            Main Skill:
            <select id="mainSkill" name="mainSkill" onClick={changeMainSkills}>
              {skillList[Object.keys(skillList)[0]].map((skill) => {
                if (skill.type !== 'Racial') return '';
                return (
                  <option key={skill._id} value={skill._id}>
                    {skill.name}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
        {mainSkills.length < 1 ? '' : mainSkills.map((skill, i) => (
          <div key={skill.id}>
            {' '}
            {skill.skillName}
            {' '}
            <button value={i} type="button" onClick={removeMainSkill}>X</button>
          </div>
        )) }
        <div>
          <label htmlFor="subSkill">
            Sub Skill:
            <select id="subSkill" name="subSkill" onClick={changeSubSkills}>
              {skillList[Object.keys(skillList)[0]].map((skill) => {
                if (skill.type !== 'Racial') return '';
                return (
                  <option key={skill._id} value={skill._id}>
                    {skill.name}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
        {subSkills.length < 1 ? '' : subSkills.map((skill, i) => (
          <div key={skill.id}>
            {' '}
            {skill.skillName}
            {' '}
            <button value={i} type="button" onClick={removeSubSkill}>X</button>
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

export default RaceForm;
