/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateMagicMutation } from './magicApiSlice';
import {
  addDoc, selectCurrentMagics,
} from '../documentationSlice';

function MagicForm(prop) {
  const { hide } = prop;
  const magics = useSelector(selectCurrentMagics);

  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);

  const [createMagic] = useCreateMagicMutation();

  const changeName = (e) => setName(e.target.value);
  const changeDescription = (e) => setDescription(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { magic } = await createMagic({
        name,
        description,
      }).unwrap();

      setName('');
      setDescription('');
      setErrors([]);

      const prevMagics = magics.magics ? magics.magics : magics.data;
      dispatch(addDoc({ key: 'magics', data: [...prevMagics, magic] }));
      hide();
    } catch (err) {
      console.log(err);
      setErrors(err.data.errors);
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
          <label htmlFor="description">
            Description:
            <textarea onChange={changeDescription} name="description" id="description" required />
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

export default MagicForm;
