import { useState } from 'react';

/* eslint-disable react/prop-types */
function RaceSkillCard(props) {
  const {
    skill, level, main, changeLevel, index,
  } = props;

  const [details, setDetails] = useState(false);

  const updateLevel = (e) => {
    const change = +e.target.value;
    const cap = main ? 5 : 3;
    if ((change > 0 && level === cap) || (change < 0 && level === 0)) {
      return;
    }
    changeLevel(index, change);
  };

  const showDetails = () => setDetails(!details);

  return (
    <main className="bg-slate-400 border-black border-2">
      <h1>{skill.name}</h1>
      <h1>{`${level}/${main ? 5 : 3}`}</h1>
      <button type="button" value={-1} onClick={updateLevel}>-</button>
      <button type="button" value={1} onClick={updateLevel}>+</button>
      <button type="button" onClick={showDetails}>More...</button>
      {details ? (
        <h1>
          Description:
          {skill.description}
        </h1>
      )
        : ''}
    </main>
  );
}

export default RaceSkillCard;
