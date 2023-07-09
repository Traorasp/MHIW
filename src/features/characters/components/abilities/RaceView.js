import { useEffect, useState } from 'react';
import { useGetSkillMutation } from '../../../documentation/skills/skillApiSlice';
import RaceSkillCard from './RaceSkillCard';
import { useUpdateCharacterMutation } from '../../characterApeSlice';

/* eslint-disable no-underscore-dangle */
function RaceView(prop) {
  // eslint-disable-next-line no-unused-vars
  const { character, update } = prop;
  const [getSkillInfo] = useGetSkillMutation();

  const [mainSkills, setMainSkills] = useState([]);
  const [subSkills, setSubSkills] = useState([]);
  const [updateCharacter] = useUpdateCharacterMutation();

  const setRaceSkills = async () => {
    const { race } = character;
    const main = race.mainSkills.map((skill) => getSkillInfo(skill).unwrap());
    const sub = race.subSkills.map((skill) => getSkillInfo(skill).unwrap());
    Promise.all(main).then((result) => {
      const skills = result.map((skill) => skill.skill);
      setMainSkills(skills);
    });
    Promise.all(sub).then((result) => {
      const skills = result.map((skill) => skill.skill);
      setSubSkills(skills);
    });
  };

  useEffect(() => {
    setRaceSkills();
  }, [character.race]);

  useEffect(() => {

  }, [mainSkills, subSkills]);

  const changeLevel = async (index, change) => {
    let total = 0;
    character.raceSkills.forEach((level) => {
      total += level;
    });
    if (change > 0 && total === character.level) {
      return;
    }
    const newSkillLevel = [...character.raceSkills];
    newSkillLevel[index] += change;
    const newChar = {};
    Object.entries(character).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        newChar[key] = [...value];
      } else {
        newChar[key] = value;
      }
    });
    newChar.raceSkills = newSkillLevel;
    await updateCharacter(newChar);
    update();
  };

  return (
    <main>
      <h1>Race</h1>
      {mainSkills.map((skill, i) => (
        <RaceSkillCard
          skill={skill}
          level={character.raceSkills[i]}
          main
          changeLevel={changeLevel}
          index={i}
          key={skill._id}
        />
      ))}
      {subSkills.map((skill, i) => (
        <RaceSkillCard
          skill={skill}
          level={character.raceSkills[i + 3]}
          main={false}
          changeLevel={changeLevel}
          index={i + 3}
          key={skill._id}
        />
      ))}
    </main>
  );
}

export default RaceView;
