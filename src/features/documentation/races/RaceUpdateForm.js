/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentSkills, selectCurrentEffects } from '../documentationSlice';

function RaceUpdateForm(prop) {
  const {
    hide, race, newDoc, update, errors,
  } = prop;
  const skillList = useSelector(selectCurrentSkills);
  const effectsList = useSelector(selectCurrentEffects);

  const getSkills = (racesSkill) => {
    const list = skillList[Object.keys(skillList)[0]]
      .filter((skill) => (!!racesSkill.find((id) => id === skill._id)));
    return list.map((skill) => ({ id: skill._id, skillName: skill.name }));
  };

  const [name, setName] = useState(race.name);
  const [parent, setParent] = useState(race.parent);
  const [training, setTraining] = useState(race.training ? race.training : '');
  const [weakness, setWeakness] = useState(race.weakness.join(', '));
  const [limit, setLimit] = useState(race.limit);
  const [health, setHealth] = useState(race.baseStats.health);
  const [defense, setDefense] = useState(race.baseStats.defense);
  const [strength, setStrength] = useState(race.baseStats.strength);
  const [speed, setSpeed] = useState(race.baseStats.speed);
  const [mana, setMana] = useState(race.baseStats.mana);
  const [accuracy, setAccuracy] = useState(race.baseStats.accuracy);
  const [evasion, setEvasion] = useState(race.baseStats.evasion);
  const [charisma, setCharisma] = useState(race.baseStats.charisma);
  const [will, setWill] = useState(race.baseStats.will);
  const [intimidation, setIntimidation] = useState(race.baseStats.intimidation);
  const [hiding, setHiding] = useState(race.baseStats.hiding);
  const [tracking, setTracking] = useState(race.baseStats.tracking);
  const [mainSkills, setMainSkills] = useState([...getSkills(race.mainSkills)]);
  const [subSkills, setSubSkills] = useState([...getSkills(race.subSkills)]);
  const [description, setDescription] = useState(race.description);

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
    if (mainSkills.length === 3 || e.target.value.length < 1) {
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
    if (subSkills.length === 5 || e.target.value.length < 1) {
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

    const newMainSkills = mainSkills.map((skill) => skill.id);
    const newSubSkills = subSkills.map((skill) => skill.id);
    const weaknessList = weakness.split(', ');

    newDoc.id = race._id;
    newDoc.name = name;
    newDoc.parent = parent;
    newDoc.training = training.length > 0 ? training : null;
    newDoc.weakness = weaknessList;
    newDoc.limit = limit;
    newDoc.baseStats = {};
    newDoc.baseStats.health = health;
    newDoc.baseStats.defense = defense;
    newDoc.baseStats.strength = strength;
    newDoc.baseStats.speed = speed;
    newDoc.baseStats.mana = mana;
    newDoc.baseStats.accuracy = accuracy;
    newDoc.baseStats.evasion = evasion;
    newDoc.baseStats.charisma = charisma;
    newDoc.baseStats.will = will;
    newDoc.baseStats.intimidation = intimidation;
    newDoc.baseStats.hiding = hiding;
    newDoc.baseStats.tracking = tracking;
    newDoc.mainSkills = newMainSkills;
    newDoc.subSkills = newSubSkills;
    newDoc.description = description;

    update();
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
    <div className="fixed bg-black/60 h-full w-full top-[4rem] left-0">
      <form onSubmit={handleSubmit} className="bg-white text-xl p-4 absolute top-1/2 left-1/3 transform -translate-x-1/4 -translate-y-[60%]">
        <button className="px-2" type="button" onClick={hide}>X</button>
        <section className="flex">
          <div>
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
              <label htmlFor="tracking">
                Tracking:
                <input type="number" min={0} max={100} id="tracking" onChange={changeTracking} value={tracking} required />
              </label>
            </div>
            <div>
              <label htmlFor="training">
                Training:
                <select id="training" name="training" onChange={changeTraining} value={training}>
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
                  <option value="">None</option>
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
                  <option value="">None</option>
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
                <textarea value={description} onChange={changeDescription} name="description" id="description" required />
              </label>
            </div>
          </div>
          <div>
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
          </div>
        </section>
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

export default RaceUpdateForm;
