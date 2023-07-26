/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentTalents } from '../documentationSlice';

function TalentUpdateForm(prop) {
  const {
    hide, talent, newDoc, update, errors,
  } = prop;
  const talents = useSelector(selectCurrentTalents);

  const getParents = () => {
    if (!talent.parent) {
      return [];
    }
    const list = talents[Object.keys(talents)[0]]
      .filter((currParent) => (!!talent.parent.find((id) => id === currParent._id)));
    return list.map((currParent) => ({ id: currParent._id, parentName: currParent.name }));
  };
  const [name, setName] = useState(talent.name);
  const [parent, setParent] = useState(getParents);
  const [mainTalent, setTalent] = useState(talent.talent);
  const [priority, setPriority] = useState(talent.priority);
  const [measurements, setMeasurements] = useState(talent.measurements.join(', '));
  const [castTime, setCastTime] = useState(talent.castTime);
  const [duration, setDuration] = useState(talent.duration);
  const [cooldown, setCooldown] = useState(talent.cooldown);
  const [charges, setCharges] = useState(talent.charges);
  const [description, setDescription] = useState(talent.description);

  const changeName = (e) => setName(e.target.value);
  const changeTalent = (e) => setTalent(e.target.value);
  const changePriority = (e) => setPriority(e.target.value);
  const changeCastTime = (e) => setCastTime(e.target.value);
  const changeDuration = (e) => setDuration(e.target.value);
  const changeCooldown = (e) => setCooldown(e.target.value);
  const changeCharges = (e) => setCharges(e.target.value);
  const changeDescription = (e) => setDescription(e.target.value);
  const changeMeasurements = (e) => setMeasurements(e.target.value);

  const changeParent = (e) => {
    if (!e.target.value.localeCompare('0')) {
      return;
    }
    if (parent.length > 0 && parent.find((parentTalent) => e.target.value === parentTalent.id)) {
      return;
    }
    const { text } = e.target.options[e.target.selectedIndex];
    const parentName = text.split(' :')[0].trim();
    setParent([...parent, { id: e.target.value, parentName }]);
  };

  const removeParent = (e) => {
    const newParents = parent.map((info) => info);
    newParents.splice(e.target.value, 1);
    setParent(newParents);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let parentsList = parent.map((data) => data.id);
    parentsList = Array.isArray(parentsList) ? parentsList : [parentsList];
    const measurementsList = measurements.length < 1 ? [] : measurements.split(', ');
    newDoc.id = talent._id;
    newDoc.name = name;
    newDoc.talent = mainTalent;
    newDoc.parent = parentsList;
    newDoc.priority = priority;
    newDoc.castTime = castTime;
    newDoc.duration = duration;
    newDoc.cooldown = cooldown;
    newDoc.charges = charges;
    newDoc.description = description;
    newDoc.measurements = measurementsList;

    update();
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
          <label htmlFor="mainTalent">
            Talent:
            <select id="mainTalent" name="mainTalent" onChange={changeTalent} value={mainTalent} required>
              <option value="Space">Space</option>
              <option value="Eagle Eye">Eagle Eye</option>
              <option value="Energy">Energy</option>
              <option value="Time">Time</option>
              <option value="Stage">Stage</option>
              <option value="Truth">Truth</option>
              <option value="Counter">Counter</option>
              <option value="Fusion">Fusion</option>
              <option value="Curse">Curse</option>
              <option value="Bond">Bond</option>
              <option value="Mind">Mind</option>
              <option value="Luck">Luck</option>
              <option value="Puppet">Puppet</option>
              <option value="Multiply">Multiply</option>
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="parents">
            Parents:
            <select id="parent" name="parent" onChange={changeParent}>
              <option value={0}>None</option>
              {talents[Object.keys(talents)[0]].map((parentType) => (
                <option key={parentType._id} value={parentType._id}>
                  {parentType.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        {parent.length < 1 ? '' : parent.map((pTalent, i) => (
          <div key={pTalent.id}>
            {' '}
            {pTalent.parentName}
            {' '}
            <button value={i} type="button" onClick={removeParent}>X</button>
          </div>
        )) }
        <div>
          <label htmlFor="priority">
            Priority:
            <select id="priority" name="priority" onChange={changePriority} value={priority} required>
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
          <label htmlFor="measurements">
            Measurements:
            <input type="text" id="measurements" value={measurements} onChange={changeMeasurements} />
          </label>
        </div>
        <div>
          <label htmlFor="castTime">
            Cast Time:
            <input type="number" min={0} id="castTime" value={castTime} onChange={changeCastTime} />
          </label>
        </div>
        <div>
          <label htmlFor="duration">
            Duration:
            <input type="number" min={0} id="duration" value={duration} onChange={changeDuration} required />
          </label>
        </div>
        <div>
          <label htmlFor="cooldown">
            Cooldown:
            <input type="number" min={0} id="cooldown" value={cooldown} onChange={changeCooldown} />
          </label>
        </div>
        <div>
          <label htmlFor="charges">
            Charges:
            <input type="number" min={0} id="charges" value={charges} onChange={changeCharges} />
          </label>
        </div>
        <div>
          <label htmlFor="description">
            Description:
            <textarea value={description} onChange={changeDescription} name="description" id="description" required />
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

export default TalentUpdateForm;
