/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AbilitiesSearchBar from './AbilitiesSearchBar';
import ListDisplay from '../inventory/ListDisplay';
import { selectCurrentSkills } from '../../../documentation/documentationSlice';
import { useUpdateCharacterMutation } from '../../characterApeSlice';
import DetailsBtn from '../inventory/DetailsBtn';

function Skillsview(prop) {
  const { character, update } = prop;

  const categories = ['Name', 'Type', 'Priority', 'Cooldown', 'Duration', 'Stat', 'Roll', 'Range', 'Aoes', 'Effects', 'Description'];
  const data = useSelector(selectCurrentSkills).skills.filter((skill) => skill.type !== 'Charisma' && skill.type !== 'Will' && skill.type !== 'Intimidation' && skill.type !== 'Racial');
  const skills = character.skills ? character.skills : [];
  const [skillsShown, setSkillsShown] = useState(skills);
  const [showForm, setShowForm] = useState(false);
  const [updateCharacter, { isLoading }] = useUpdateCharacterMutation();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setSkillsShown(skills);
  }, [skills]);

  const handleShowForm = () => setShowForm(!showForm);
  const updateSkills = async (newSkills) => {
    try {
      if (isLoading) return;
      const newChar = {};
      Object.entries(character).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          newChar[key] = [...value];
        } else {
          newChar[key] = value;
        }
      });
      newChar.skills = newSkills;
      await updateCharacter(newChar);
      setShowForm(false);
      update();
    } catch (err) {
      console.log(err);
    }
  };

  const addAbility = (e) => {
    const id = e.target.value;
    if (skills.find((skill) => skill._id === id)) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 4000);
      return;
    }
    updateSkills([...skills, id]);
  };

  const removeSkill = (e) => {
    const index = e.target.value;
    const skillList = [...skills];
    skillList.splice(index, 1);
    updateSkills(skillList);
  };

  const displaySkills = () => skillsShown.map((skill, index) => (
    <div className="border-2 border-black" key={skill._id}>
      {`${skill.name} ${skill.type} `}
      <button type="button" value={index} onClick={removeSkill}>Remove</button>
      <DetailsBtn
        id={skill._id}
        data={skill}
        listOf="skills"
      />
    </div>
  ));

  return skills ? (
    <main>
      <AbilitiesSearchBar
        abilities={skills}
        categories={categories}
        setSelectedAbilities={setSkillsShown}
      />
      <button type="button" onClick={handleShowForm}>+</button>
      {showForm ? <ListDisplay categories={categories} listOf="skills" addItem={addAbility} hide={handleShowForm} data={data} /> : ''}
      {displaySkills()}
      {showError ? (
        <div className="absolute left-2 bottom-16 bg-red-600 text-white">
          Character already has this skill
        </div>
      ) : ''}
    </main>
  ) : '';
}

export default Skillsview;
