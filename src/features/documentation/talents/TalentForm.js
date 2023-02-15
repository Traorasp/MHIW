/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateTalentMutation } from './talentApiSlice';
import { addDoc, selectCurrentTalents } from '../documentationSlice';

function TalentForm(prop) {
  const { hide } = prop;
  const talents = useSelector(selectCurrentTalents);

  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [parent, setParent] = useState('Space');
  const [priority, setPriority] = useState('Action');
  const [measurements, setMeasurements] = useState('');
  const [castTime, setCastTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [cooldown, setCooldown] = useState(0);
  const [charges, setCharges] = useState(0);
  const [description, setDescription] = useState('');

  const [createTalent] = useCreateTalentMutation();

  const changeName = (e) => setName(e.target.value);
  const changeParent = (e) => setParent(e.target.value);
  const changePriority = (e) => setPriority(e.target.value);
  const changeCastTime = (e) => setCastTime(e.target.value);
  const changeDuration = (e) => setDuration(e.target.value);
  const changeCooldown = (e) => setCooldown(e.target.value);
  const changeCharges = (e) => setCharges(e.target.value);
  const changeDescription = (e) => setDescription(e.target.value);
  const changeMeasurements = (e) => setMeasurements(e.target.value);

  const handleSubmit = async (e) => {
    const measurementsList = measurements.split(', ');
    e.preventDefault();
    try {
      const { talent: newTalent } = await createTalent({
        name,
        parent,
        priority,
        measurements: measurementsList,
        castTime,
        duration,
        cooldown,
        charges,
        description,
      }).unwrap();

      setName('');
      setParent('Space');
      setPriority('Action');
      setMeasurements('');
      setCastTime(0);
      setDuration(0);
      setCooldown(0);
      setCharges(0);
      setDescription('');

      const prevTalents = talents.talents ? talents.talents : talents.data;
      dispatch(addDoc({ key: 'talents', data: [...prevTalents, newTalent] }));
      hide();
    } catch (err) {
      console.log(err);
    }
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
            <select id="parent" name="parent" onChange={changeParent} required>
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
          <label htmlFor="priority">
            Priority:
            <select id="priority" name="priority" onChange={changePriority} required>
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
            <textarea onChange={changeDescription} name="description" id="description" required />
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default TalentForm;
