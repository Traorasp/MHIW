/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateClassesMutation } from './classesApieSlice';
import {
  addDoc, selectCurrentClasses, selectCurrentSkills, selectCurrentEffects,
} from '../documentationSlice';

function ClassesForm(prop) {
  const { hide } = prop;
  const skillList = useSelector(selectCurrentSkills);
  const effectsList = useSelector(selectCurrentEffects);
  const classesList = useSelector(selectCurrentClasses);

  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [requirements, setRequirements] = useState('');
  const [effects, setEffects] = useState([]);
  const [skills, setSkill] = useState([]);
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Warrior');
  const [errors, setErrors] = useState([]);

  const [createClasses] = useCreateClassesMutation();

  const changeName = (e) => setName(e.target.value);
  const changeRequirements = (e) => setRequirements(e.target.value);
  const changeType = (e) => setType(e.target.value);
  const changeSkill = (e) => {
    if (skills.length > 0 && skills.find((skill) => e.target.value === skill.id)) {
      return;
    }
    if (e.target.value.length < 1) return;
    const { text } = e.target.options[e.target.selectedIndex];
    const skillName = text.split(' :')[0].trim();
    setSkill([...skills, { id: e.target.value, skillName }]);
  };
  const changeEffects = (e) => {
    if (effects.length > 0 && effects.find((effect) => e.target.value === effect.id)) {
      return;
    }
    if (e.target.value.length < 1) return;
    const { text } = e.target.options[e.target.selectedIndex];
    const effectName = text.split(' :')[0].trim();
    setEffects([...effects, { id: e.target.value, effectName }]);
  };

  const changeDescription = (e) => setDescription(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newSkills = skills.map((skill) => skill.id);
      const newEffects = effects.map((effect) => effect.id);
      const { classes } = await createClasses({
        name,
        requirements,
        skills: newSkills,
        effects: newEffects,
        type,
        description,
      }).unwrap();

      setName('');
      setRequirements(1);
      setSkill([]);
      setEffects([]);
      setDescription('');
      setErrors([]);
      const prevClassess = classesList.classes ? classesList.classes : classesList.data;
      dispatch(addDoc({ key: 'classes', data: [...prevClassess, classes] }));
      hide();
    } catch (err) {
      console.log(err);
      setErrors(err.data.errors);
    }
  };

  const removeSkill = (e) => {
    const newSkills = skills.map((info) => info);
    newSkills.splice(e.target.value, 1);
    setSkill(newSkills);
  };

  const removeEffect = (e) => {
    const newEffects = effects.map((info) => info);
    newEffects.splice(e.target.value, 1);
    setEffects(newEffects);
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
            <select id="type" name="type" onClick={changeType}>
              <option value="Warrior">Warrior</option>
              <option value="Wizard">Wizard</option>
              <option value="Tank">Tank</option>
              <option value="Rogue">Rogue</option>
            </select>
          </label>
        </div>

        <div>
          <label htmlFor="skill">
            Skill:
            <select id="skill" name="skill" onClick={changeSkill}>
              <option value="">None</option>
              {skillList[Object.keys(skillList)[0]].map((skill) => {
                if (skill.type === 'Unique' || skill.type === 'Racial') {
                  return '';
                }
                return (
                  <option key={skill._id} value={skill._id}>
                    {skill.name}
                    {' '}
                    :
                    {' '}
                    {skill.type}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
        {skills.length < 1 ? '' : skills.map((skill, i) => (
          <div key={skill.id}>
            {' '}
            {skill.skillName}
            {' '}
            <button value={i} type="button" onClick={removeSkill}>X</button>
          </div>
        )) }
        <div>
          <label htmlFor="effects">
            Effects:
            <select id="effects" name="effects" onClick={changeEffects}>
              <option value="">None</option>
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
          <label htmlFor="requirements">
            Requirements:
            <input type="text" id="requirements" onChange={changeRequirements} value={requirements} required />
          </label>
        </div>
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

export default ClassesForm;
