/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';

function EffectUpdateForm(prop) {
  const {
    hide, oldEffect, update, newDoc,
  } = prop;

  const [name, setName] = useState(oldEffect.name);
  const [show, setShow] = useState(oldEffect.show);
  const [damageType, setDamageType] = useState(oldEffect.damageType);
  const [damage, setDamage] = useState(oldEffect.damage);
  const [training, setTraining] = useState(oldEffect.training);
  const [stat, setStat] = useState(oldEffect.stat);
  const [property, setProperty] = useState(oldEffect.property);
  const [effect, setEffect] = useState(oldEffect.effect);
  const [duration, setDuration] = useState(oldEffect.duration);

  const changeName = (e) => setName(e.target.value);
  const changeShow = () => setShow(!show);
  const changeDamageType = (e) => setDamageType(e.target.value);
  const changeDamage = (e) => setDamage(e.target.value);
  const changeTraining = (e) => setTraining(e.target.value);
  const changestat = (e) => setStat(e.target.value);
  const changeProperty = (e) => setProperty(e.target.value);
  const changeEffect = (e) => setEffect(e.target.value);
  const changeDuration = (e) => setDuration(e.target.value);

  const handleUpdate = async (e) => {
    e.preventDefault();

    newDoc.id = oldEffect._id;
    newDoc.name = name;
    newDoc.show = show;
    newDoc.damageType = damageType;
    newDoc.damage = damage;
    newDoc.training = training;
    newDoc.stat = stat;
    newDoc.property = property;
    newDoc.effect = effect;
    newDoc.duration = duration;
    update();
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
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default EffectUpdateForm;
