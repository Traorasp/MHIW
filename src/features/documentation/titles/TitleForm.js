/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateTitleMutation } from './titleApiSlice';
import {
  addDoc, selectCurrentTitles, selectCurrentSkills, selectCurrentEffects,
} from '../documentationSlice';

function TitleForm(prop) {
  const { hide } = prop;
  const skillList = useSelector(selectCurrentSkills);
  const effectsList = useSelector(selectCurrentEffects);
  const titles = useSelector(selectCurrentTitles);

  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [level, setLevel] = useState(1);
  const [effects, setEffects] = useState([]);
  const [skills, setSkill] = useState([]);
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);

  const [createTitle] = useCreateTitleMutation();

  const changeName = (e) => setName(e.target.value);
  const changeLevel = (e) => setLevel(e.target.value);
  const changeSkill = (e) => {
    if (skills.length > 0 && skills.find((skill) => e.target.value === skill.id)) {
      return;
    }
    const { text } = e.target.options[e.target.selectedIndex];
    const skillName = text.split(' :')[0].trim();
    setSkill([...skills, { id: e.target.value, skillName }]);
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
      const newSkills = skills.map((skill) => skill.id);
      const newEffects = effects.map((effect) => effect.id);
      const { title } = await createTitle({
        name,
        level,
        skills: newSkills,
        effects: newEffects,
        description,
      }).unwrap();

      setName('');
      setLevel(1);
      setSkill([]);
      setEffects([]);
      setDescription('');
      setErrors([]);

      const prevTitles = titles.titles ? titles.titles : titles.data;
      dispatch(addDoc({ key: 'titles', data: [...prevTitles, title] }));
      hide();
    } catch (err) {
      setErrors(err.data.errors.errors);
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
          <label htmlFor="level">
            Level:
            <input type="number" id="level" onChange={changeLevel} value={level} required />
          </label>
        </div>
        <div>
          <label htmlFor="skill">
            Skill:
            <select id="skill" name="skill" onClick={changeSkill}>
              {skillList[Object.keys(skillList)[0]].map((skill) => (
                <option key={skill._id} value={skill._id}>
                  {skill.name}
                  {' '}
                  :
                  {' '}
                  {skill.type}
                </option>
              ))}
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

export default TitleForm;
