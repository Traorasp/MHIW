/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ImageForm from '../../../../component/imageForm';
import {
  selectCurrentTitles, selectCurrentMagics,
  selectCurrentRaces, selectCurrentClasses,
} from '../../../documentation/documentationSlice';
import { useUpdateCharacterMutation } from '../../characterApeSlice';

function InformationView(prop) {
  const {
    character, url, iconChange, update,
  } = prop;

  const [updateCharacter, { isLoading }] = useUpdateCharacterMutation();

  let titleList = useSelector(selectCurrentTitles);
  titleList = titleList.data ? titleList.data : titleList.titles;
  let magicsList = useSelector(selectCurrentMagics);
  magicsList = magicsList.data ? magicsList.data : magicsList.magics;
  let classesList = useSelector(selectCurrentClasses);
  classesList = classesList.data ? classesList.data : classesList.classes;
  let racesList = useSelector(selectCurrentRaces);
  racesList = racesList.data ? racesList.data : racesList.races;

  const [edit, setEdit] = useState(false);

  const getTitles = () => character.titles
    .map((title) => ({ id: title._id, name: title.name }));
  const getMagics = () => character.magics
    .map((magic) => ({ id: magic._id, name: magic.name }));
  const getClasses = () => character.class
    .map((classInfo) => ({ id: classInfo._id, name: classInfo.name }));

  const [firstName, setFirstName] = useState(character.firstName);
  const [lastName, setLastName] = useState(character.lastName);
  const [titles, setTitles] = useState(getTitles());
  const [level, setLevel] = useState(character.level);
  const [classes, setClasses] = useState(getClasses());
  const [magics, setMagics] = useState(getMagics());
  const [talents, setTalents] = useState(character.talentTypes);
  const [race, setRace] = useState(character.race ? character.race : '');
  const [nationality, setNationality] = useState(character.nationality ? character.nationality : '');
  const [gender, setGender] = useState(character.gender);
  const [age, setAge] = useState(character.age);
  const [description, setDescription] = useState(character.description);
  const [background, setBackground] = useState(character.background);

  useEffect(() => {
    setFirstName(character.firstName);
    setLastName(character.lastName);
    setTitles(getTitles());
    setLevel(character.level);
    setClasses(getClasses());
    setMagics(getMagics());
    setTalents(character.talentTypes);
    setRace(character.race ? character.race : '');
    setNationality(character.nationality ? character.nationality : '');
    setGender(character.gender);
    setAge(character.age);
    setDescription(character.description);
    setBackground(character.background);
  }, [character]);

  const clickedEditButton = async () => {
    if (edit) {
      try {
        if (isLoading) return;
        const newChar = {};
        Object.entries(character).forEach(([key, value]) => {
          newChar[key] = value;
        });

        const newClasses = classes.map((classInfo) => classInfo.id);
        const newTitles = titles.map((title) => title.id);
        const newMagics = magics.map((magic) => magic.id);

        newChar.firstName = firstName;
        newChar.lastName = lastName;
        newChar.titles = newTitles;
        newChar.level = level;
        newChar.class = newClasses;
        newChar.magics = newMagics;
        newChar.talentTypes = talents;
        newChar.race = race._id;
        newChar.nationality = nationality;
        newChar.gender = gender;
        newChar.age = age;
        newChar.description = description;
        newChar.background = background;

        await updateCharacter(newChar);
        setEdit(!edit);
        await update();
      } catch (err) {
        console.log(err);
      }
    } else {
      setEdit(!edit);
    }
  };

  const changeFirstName = (e) => setFirstName(e.target.value);
  const changeLastName = (e) => setLastName(e.target.value);
  const changeLevel = (e) => setLevel(e.target.value);
  const changeNationality = (e) => setNationality(e.target.value);
  const changeGender = (e) => setGender(e.target.value);
  const changeAge = (e) => setAge(e.target.value);
  const changeDescription = (e) => setDescription(e.target.value);
  const changeBackground = (e) => setBackground(e.target.value);

  const changeTitles = (e) => {
    if (titles.length > 0 && titles.find((title) => e.target.value === title.id)) {
      return;
    }
    if (e.target.value === '') return;
    const { text } = e.target.options[e.target.selectedIndex];
    const name = text.split(' :')[0].trim();
    setTitles([...titles, { id: e.target.value, name }]);
  };

  const changeMagics = (e) => {
    if (magics.length > 0 && magics.find((magic) => e.target.value === magic.id)) {
      return;
    }
    if (e.target.value === '' || magics.length === 3) return;
    const { text } = e.target.options[e.target.selectedIndex];
    const name = text.split(' :')[0].trim();
    setMagics([...magics, { id: e.target.value, name }]);
  };

  const changeTalents = (e) => {
    if (talents.length > 0 && talents.find((talent) => e.target.value === talent.id)) {
      return;
    }
    if (e.target.value === '' || talents.length === 2) return;

    setTalents([...talents, e.target.value]);
  };

  const changeClasses = (e) => {
    if (classes.length > 0 && classes.find((classInfo) => e.target.value === classInfo.id)) {
      return;
    }
    if (e.target.value === '') return;
    const { text } = e.target.options[e.target.selectedIndex];
    const name = text.split(' :')[0].trim();
    setClasses([...classes, { id: e.target.value, name }]);
  };

  const changeRace = (e) => setRace({
    _id: e.target.value,
    name: e.target.options[e.target.selectedIndex].text,
  });

  const removeTitle = (e) => {
    const newTitles = titles.map((info) => info);
    newTitles.splice(e.target.value, 1);
    setTitles(newTitles);
  };

  const removeMagic = (e) => {
    const newMagic = magics.map((info) => info);
    newMagic.splice(e.target.value, 1);
    setMagics(newMagic);
  };

  const removeTalent = (e) => {
    const newTalents = talents.map((info) => info);
    newTalents.splice(e.target.value, 1);
    setTalents(newTalents);
  };

  const removeClass = (e) => {
    const newClass = classes.map((info) => info);
    newClass.splice(e.target.value, 1);
    setClasses(newClass);
  };

  useEffect(() => {

  }, [titles]);

  return (
    <div className="grid grid-rows-[8] grid-cols-2">
      <div className="row-span-2">
        {edit ? <ImageForm hideForm="None" setImageId={iconChange} prevImageId={character.charIcon} /> : ''}
        { url
          ? (
            <img
              className="object-scale-down h-36 w-36"
              src={url}
              alt={`${firstName} icon`}
            />
          ) : ''}
      </div>
      <div>
        Fullname:
        {' '}
        {edit ? (
          <div>
            <input type="text" value={firstName} id="firstName" name="firstName" onChange={changeFirstName} />
            <input type="text" value={lastName} id="lastName" name="lastName" onChange={changeLastName} />
          </div>
        ) : `${firstName} ${lastName}`}
      </div>
      <div>
        Titles:
        {' '}
        {edit && titles ? (
          <div>
            <select onChange={changeTitles}>
              <option value="">None</option>
              {titleList.map(
                (title) => <option key={title._id} value={title._id}>{title.name}</option>,
              )}
            </select>
            {titles.length < 1 ? '' : titles.map((title, i) => (
              <div key={title.id}>
                {' '}
                {title.name}
                {' '}
                <button value={i} type="button" onClick={removeTitle}>X</button>
              </div>
            )) }
          </div>
        ) : titles.map((info, i) => (i === 0 ? info.name : `, ${info.name}`))}
      </div>
      <div>
        Level:
        {' '}
        {edit ? <input min="1" max="15" value={level} name="level" onChange={changeLevel} id="level" /> : level}
      </div>
      <div>
        Class:
        {' '}
        {edit ? (
          <div>
            <select onChange={changeClasses}>
              <option value="">None</option>
              {classesList.map(
                (classInfo) => (
                  <option
                    key={classInfo._id}
                    value={classInfo._id}
                  >
                    {classInfo.name}
                  </option>
                ),
              )}
            </select>
            {classes.length < 1 ? '' : classes.map((classInfo, i) => (
              <div key={classInfo.id}>
                {' '}
                {classInfo.name}
                {' '}
                <button value={i} type="button" onClick={removeClass}>X</button>
              </div>
            )) }
          </div>
        ) : classes.map((info, i) => (i === 0 ? info.name : `, ${info.name}`))}
      </div>
      <div>
        Magics:
        {' '}
        {edit ? (
          <div>
            <select onChange={changeMagics}>
              <option value="">None</option>
              {magicsList.map(
                (magic) => <option key={magic._id} value={magic._id}>{magic.name}</option>,
              )}
            </select>
            {magics.length < 1 ? '' : magics.map((magic, i) => (
              <div key={magic.id}>
                {' '}
                {magic.name}
                {' '}
                <button value={i} type="button" onClick={removeMagic}>X</button>
              </div>
            )) }
          </div>
        ) : magics.map((info, i) => (i === 0 ? info.name : `, ${info.name}`))}
      </div>
      <div>
        Talents:
        {' '}
        {edit ? (
          <div>
            <select onChange={changeTalents}>
              <option value="">None</option>
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
            {talents.length < 1 ? '' : talents.map((talent, i) => (
              <div key={talent}>
                {' '}
                {talent}
                {' '}
                <button value={i} type="button" onClick={removeTalent}>X</button>
              </div>
            )) }
          </div>
        ) : talents.map((info, i) => (i === 0 ? info : `, ${info}`))}
      </div>
      <div>
        Race:
        {' '}
        {edit ? (
          <select id="race" onChange={changeRace} value={race._id}>
            <option value="">None</option>
            {racesList.map((raceInfo) => (
              <option key={raceInfo._id} value={raceInfo._id}>
                {raceInfo.name}
              </option>
            ))}
          </select>
        ) : race.name}
      </div>
      <div>
        Nationality:
        {' '}
        {edit ? <input type="text" onChange={changeNationality} name="nationality" id="nationality" value={nationality} /> : nationality}
      </div>
      <div>
        Gender:
        {' '}
        {edit ? <input type="text" onChange={changeGender} name="gender" id="gender" value={gender} /> : gender}
      </div>
      <div>
        Age:
        {' '}
        {edit ? <input type="text" onChange={changeAge} name="age" id="age" value={age} /> : age}
      </div>
      <div className="row-start-[7] col-span-2">
        Description:
        {' '}
        {edit ? <textarea onChange={changeDescription} value={description} /> : description}
      </div>
      <div className="row-start-[8] col-span-2">
        Background:
        {' '}
        {edit ? <textarea onChange={changeBackground} value={background} /> : background}
      </div>
      <button className="absolute bottom-10 right-12 hover:bg-yellow-300 hover:border-2 hover:border-black" type="button" onClick={clickedEditButton}>
        {edit ? 'Save' : 'Edit'}
      </button>
    </div>
  );
}

export default InformationView;
