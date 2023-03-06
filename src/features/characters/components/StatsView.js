/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import ImageForm from '../../../component/imageForm';
import { useUpdateCharacterMutation } from '../characterApeSlice';

function StatsView(prop) {
  const { character, url, imageChange } = prop;
  const [updateCharacter, { isLoading }] = useUpdateCharacterMutation();
  const stats = {};
  Object.entries(character.baseStats).map(([key, value]) => {
    stats[key] = value;
    return value;
  });

  const getStatLimimt = () => {
    let limit = 100;
    const { level } = character;
    limit *= 2 ** (level > 4 ? level - 4 : 0);
    if (level > 3) {
      limit *= 2.5;
    }
    return limit;
  };

  const getBaseStats = () => {
    let base = 0;
    const { level } = character;
    if (level > 1) base += 10;
    if (level > 2) base += 10;
    if (level > 3) base += 10;
    if (level > 4) base += 25;
    if (level > 5) base += 50;
    if (level > 6) base += 100;
    if (level > 7) base += 200;
    if (level > 8) base += 400;
    if (level > 9) base += 800;
    if (level > 10) base += 1600;
    if (level > 11) base += 3200;
    if (level > 12) base += 6400;
    if (level > 13) base += 12800;
    if (level > 14) base += 25600;
    return base;
  };

  const limit = getStatLimimt();
  const baseStat = getBaseStats();

  const [maxHealth, setMaxHealth] = useState(stats.maxHealth > baseStat * 100
    ? stats.maxHealth : baseStat * 100);
  const [currHealth, setHealth] = useState(stats.currHealth);
  const [maxDefense, setMaxDefense] = useState(stats.maxDefense > baseStat * 10
    ? stats.maxDefense : baseStat * 10);
  const [defense, setDefense] = useState(stats.defense);
  const [strength, setStrength] = useState(stats.strength > baseStat
    ? stats.strength : baseStat);
  const [speed, setSpeed] = useState(stats.speed > baseStat
    ? stats.speed : baseStat);
  const [maxMana, setMaxMana] = useState(stats.maxMana > baseStat * 100
    ? stats.maxMana : baseStat * 10);
  const [mana, setMana] = useState(stats.mana);
  const [accuracy, setAccuracy] = useState(stats.accuracy);
  const [evasion, setEvasion] = useState(stats.evasion);
  const [charisma, setCharisma] = useState(stats.charisma > baseStat
    ? stats.charisma : baseStat);
  const [will, setWill] = useState(stats.will > baseStat
    ? stats.will : baseStat);
  const [intimidation, setIntimidation] = useState(stats.intimidation > baseStat
    ? stats.intimidation : baseStat);
  const [hiding, sethiding] = useState(stats.hiding);
  const [tracking, setTracking] = useState(stats.tracking);

  const handleStatChange = (e) => {
    const type = e.target.id;
    const newValue = e.target.value;
    switch (type) {
      case 'maxHealth':
        setMaxHealth(newValue > 100 * baseStat ? newValue : 100 * baseStat);
        break;
      case 'currHealth':
        setHealth(newValue);
        break;
      case 'maxDefense':
        setMaxDefense(newValue > 10 * baseStat ? newValue : 10 * baseStat);
        break;
      case 'defense':
        setDefense(newValue);
        break;
      case 'strength':
        setStrength(newValue > baseStat ? newValue : baseStat);
        break;
      case 'speed':
        setSpeed(newValue > baseStat ? newValue : baseStat);
        break;
      case 'maxMana':
        setMaxMana(newValue > 10 * baseStat ? newValue : 10 * baseStat);
        break;
      case 'mana':
        setMana(newValue);
        break;
      case 'accuracy':
        setAccuracy(newValue > baseStat ? newValue : baseStat);
        break;
      case 'evasion':
        setEvasion(newValue > baseStat ? newValue : baseStat);
        break;
      case 'charisma':
        setCharisma(newValue > baseStat ? newValue : baseStat);
        break;
      case 'will':
        setWill(newValue > baseStat ? newValue : baseStat);
        break;
      case 'intimidation':
        setIntimidation(newValue > baseStat ? newValue : baseStat);
        break;
      case 'hiding':
        sethiding(newValue > baseStat ? newValue : baseStat);
        break;
      case 'tracking':
        setTracking(newValue > baseStat ? newValue : baseStat);
        break;
      default:
        console.log(type);
    }
  };

  const updateBaseStats = () => {
    stats.currHealth = currHealth;
    stats.maxHealth = maxHealth;
    stats.defense = defense;
    stats.maxDefense = maxDefense;
    stats.strength = strength;
    stats.speed = speed;
    stats.mana = mana;
    stats.maxMana = maxMana;
    stats.will = will;
    stats.accuracy = accuracy;
    stats.evasion = evasion;
    stats.charisma = charisma;
    stats.intimidation = intimidation;
    stats.hiding = hiding;
    stats.tracking = tracking;

    Object.entries(stats).forEach(([key, value]) => {
      if (key === 'currHealth' || key === 'mana' || key === 'defense' || key === 'evasion'
      || key === 'accuracy' || key === 'tracking' || key === 'hiding') {
        return;
      }
      if (key === 'maxHealth' && value < baseStat * 100) {
        stats[key] = baseStat * 100;
      } else if ((key === 'maxMana' || key === 'maxDefense') && value < baseStat * 10) {
        stats[key] = baseStat * 10;
      } else if (value < baseStat) {
        stats[key] = baseStat;
      }
    });
  };

  updateBaseStats();

  const [edit, setEdit] = useState(false);

  const clickedEditButton = async (e) => {
    e.preventDefault();
    if (edit) {
      try {
        if (isLoading) return;
        const newChar = {};
        Object.entries(character).forEach(([key, value]) => {
          newChar[key] = value;
        });

        newChar.baseStats = stats;

        await updateCharacter(newChar);
        setEdit(!edit);
      } catch (err) {
        console.log(err);
      }
    } else {
      setEdit(!edit);
    }
  };

  const statList = () => (
    <form onSubmit={clickedEditButton} className="grid grid-cols-2 grid-rows-6">
      <div>
        Health:
        {' '}
        {edit ? (
          <div>
            <input id="currHealth" type="number" min={0} max={maxHealth} onChange={handleStatChange} value={currHealth} />
            /
            <input id="maxHealth" type="number" min={baseStat} max={limit * 100} onChange={handleStatChange} value={maxHealth > baseStat * 100 ? maxHealth : baseStat * 100} />
          </div>
        )
          : `${currHealth} / ${maxHealth}`}
      </div>
      <div>
        Defense:
        {' '}
        {edit ? (
          <div>
            <input id="defense" type="number" min={0} max={maxDefense} onChange={handleStatChange} value={defense} />
            /
            <input id="maxDefense" type="number" min={baseStat} max={limit * 10} onChange={handleStatChange} value={maxDefense > baseStat * 10 ? maxDefense : baseStat * 10} />
          </div>
        )
          : `${defense} / ${maxDefense}`}
      </div>
      <div>
        Speed:
        {' '}
        {edit
          ? <input id="speed" type="number" min={baseStat} max={limit} onChange={handleStatChange} value={speed > baseStat ? speed : baseStat} />
          : speed}
      </div>
      <div>
        Strength:
        {' '}
        {edit
          ? <input id="strength" type="number" min={baseStat} max={limit} onChange={handleStatChange} value={strength > baseStat ? strength : baseStat} />
          : strength}
      </div>
      <div>
        Mana:
        {' '}
        {edit ? (
          <div>
            <input id="mana" type="number" min={0} max={maxMana} onChange={handleStatChange} value={mana} />
            /
            <input id="maxMana" type="number" min={baseStat} max={limit * 10} onChange={handleStatChange} value={maxMana > baseStat ? maxMana : baseStat * 10} />
          </div>
        )
          : `${mana} / ${maxMana}`}
      </div>
      <div>
        Will:
        {' '}
        {edit
          ? <input id="will" type="number" min={baseStat} max={limit} onChange={handleStatChange} value={will > baseStat ? will : baseStat} />
          : will}
      </div>
      <div>
        Charisma:
        {' '}
        {edit
          ? <input id="charisma" type="number" min={baseStat} max={limit} onChange={handleStatChange} value={charisma > baseStat ? charisma : baseStat} />
          : charisma}
      </div>
      <div>
        Intimidation:
        {' '}
        {edit
          ? <input id="intimidation" type="number" min={baseStat} max={limit} onChange={handleStatChange} value={intimidation > baseStat ? intimidation : baseStat} />
          : intimidation}
      </div>
      <div>
        Accuracy:
        {' '}
        {accuracy}
      </div>
      <div>
        Evasion:
        {' '}
        {evasion}
      </div>
      <div>
        Tracking:
        {' '}
        {tracking}
      </div>
      <div>
        Hiding:
        {' '}
        {hiding}
      </div>
      <button className="absolute bottom-10 right-12 hover:bg-yellow-300 hover:border-2 hover:border-black" type="submit">
        {edit ? 'Save' : 'Edit'}
      </button>
    </form>
  );

  const statusList = () => (
    <div>
      <div>
        Extra:
      </div>
      <div>
        Status:
        {character.status.map((effect) => `${effect}.name`)}
      </div>
    </div>
  );

  return (
    <main className="grid grid-rows-2 grid-cols-5">
      <div id="stats" className="col-span-3 border-2 border-black">
        {statList()}
      </div>
      <div id="status" className="col-span-3 border-2 border-black">
        {statusList()}
      </div>
      <div className="row-start-1 row-span-2 col-start-4 col-span-2">
        {edit ? <ImageForm hideForm="None" setImageId={imageChange} prevImageId={character.charImage} /> : ''}
        {url ? <img className="object-cover" src={url} alt={character.firstName} /> : ''}
      </div>
    </main>
  );
}

export default StatsView;
