/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateCharacterMutation } from '../characterApeSlice';
import { setCharacterList } from '../charactersSlice';
import { selectCurrentUser } from '../../auth/authSlice';

function CharacterForm(prop) {
  const { hide, list, update } = prop;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [level, setLevel] = useState(1);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [errors, setErrors] = useState([]);
  const user = useSelector(selectCurrentUser);

  const [createCharacter] = useCreateCharacterMutation();
  const dispatch = useDispatch();

  const changeFirstName = (e) => setFirstName(e.target.value);
  const changeLastName = (e) => setLastName(e.target.value);
  const changeLevel = (e) => setLevel(e.target.value);
  const changeAge = (e) => setAge(e.target.value);
  const changeGender = (e) => setGender(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const char = await createCharacter({
        owner: user._id,
        firstName,
        lastName,
        level,
        age,
        gender,
      }).unwrap();

      setFirstName('');
      setLastName('');
      setLevel(1);
      setAge();
      setGender();
      setErrors([]);
      dispatch(setCharacterList({ characters: [...list, { char, url: '' }] }));
      update();
      hide();
    } catch (err) {
      console.log(err);
      setErrors(err.data.errors);
    }
  };

  return (
    <div className="fixed bg-black/60 h-full w-full top-[4rem] left-0">
      <form onSubmit={handleSubmit} className="bg-white text-xl p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[100%]">
        <button className="px-2" type="button" onClick={hide}>X</button>
        <div>
          <label htmlFor="firstName">
            First Name:
            <input type="text" id="firstName" onChange={changeFirstName} value={firstName} required />
          </label>
        </div>
        <div>
          <label htmlFor="lastName">
            Last Name:
            <input type="text" id="lastName" onChange={changeLastName} value={lastName} required />
          </label>
        </div>
        <div>
          <label htmlFor="level">
            Level:
            <input type="number" min="1" max="15" id="level" value={level} onChange={changeLevel} required />
          </label>
        </div>
        <div>
          <label htmlFor="age">
            Age:
            <input type="number" id="age" min="0" value={age} onChange={changeAge} />
          </label>
        </div>
        <div>
          <label htmlFor="gender">
            Gender:
            <input type="text" id="gender" value={gender} onChange={changeGender} />
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

export default CharacterForm;
