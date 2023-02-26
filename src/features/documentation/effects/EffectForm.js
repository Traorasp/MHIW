/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateEffectMutation } from './effectApiSlice';
import { addDoc, selectCurrentEffects } from '../documentationSlice';

function EffectForm(prop) {
  const { hide } = prop;
  const effects = useSelector(selectCurrentEffects);

  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [show, setShow] = useState(false);
  const [damageType, setDamageType] = useState('');
  const [damage, setDamage] = useState(0);
  const [training, setTraining] = useState('');
  const [stat, setStat] = useState('');
  const [property, setProperty] = useState('');
  const [effect, setEffect] = useState('');
  const [duration, setDuration] = useState(1);
  const [errors, setErrors] = useState([]);
  const [createEffect] = useCreateEffectMutation();

  const changeName = (e) => setName(e.target.value);
  const changeShow = () => setShow(!show);
  const changeDamageType = (e) => setDamageType(e.target.value);
  const changeDamage = (e) => setDamage(e.target.value);
  const changeTraining = (e) => setTraining(e.target.value);
  const changestat = (e) => setStat(e.target.value);
  const changeProperty = (e) => setProperty(e.target.value);
  const changeEffect = (e) => setEffect(e.target.value);
  const changeDuration = (e) => setDuration(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { effect: newEffect } = await createEffect({
        name, show, damageType, damage, training, stat, property, effect, duration,
      }).unwrap();

      setName('');
      setShow(false);
      setDamageType('');
      setDamage(0);
      setTraining('');
      setStat('');
      setProperty('');
      setEffect('');
      setDuration(1);
      setErrors([]);
      const prevEffects = effects.effects ? effects.effects : effects.data;
      dispatch(addDoc({ key: 'effects', data: [...prevEffects, newEffect] }));
      hide();
    } catch (err) {
      setErrors(err.data.errors.errors);
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
          <label htmlFor="show">
            Show:
            <input type="checkbox" id="show" value={show} onChange={changeShow} />
          </label>
        </div>
        <div>
          <label htmlFor="damageType">
            Damage Type:
            <input type="text" id="damageType" value={damageType} onChange={changeDamageType} />
          </label>
        </div>
        <div>
          <label htmlFor="damage">
            Damage:
            <input type="number" min="0" id="damage" value={damage} onChange={changeDamage} />
          </label>
        </div>
        <div>
          <label htmlFor="training">
            Training:
            <input type="text" id="training" value={training} onChange={changeTraining} />
          </label>
        </div>
        <div>
          <label htmlFor="stat">
            Stat:
            <input type="text" id="stat" value={stat} onChange={changestat} />
          </label>
        </div>
        <div>
          <label htmlFor="property">
            Property:
            <input type="text" id="property" value={property} onChange={changeProperty} />
          </label>
        </div>
        <div>
          <label htmlFor="effect">
            Effect:
            <input type="text" id="effect" value={effect} onChange={changeEffect} required />
          </label>
        </div>
        <div>
          <label htmlFor="duration">
            Duration:
            <input type="number" min={1} id="duration" value={duration} onChange={changeDuration} required />
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

export default EffectForm;
