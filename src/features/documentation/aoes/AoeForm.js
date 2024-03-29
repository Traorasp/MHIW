/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateAOEMutation } from './aoeApiSlice';
import { addDoc, selectCurrentAoes } from '../documentationSlice';

function AoeForm(prop) {
  const { hide } = prop;
  const aoes = useSelector(selectCurrentAoes);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [fixed, setFixed] = useState(false);
  const [range, setRange] = useState(1);
  const [targets, setTargets] = useState('');
  const [createAOE] = useCreateAOEMutation();

  const changeName = (e) => setName(e.target.value);
  const changeFixed = () => setFixed(!fixed);
  const changeRange = (e) => setRange(e.target.value);
  const changeTargets = (e) => setTargets(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { aoe } = await createAOE({
        name, fixed, range, targets,
      }).unwrap();
      setName('');
      setFixed(false);
      setRange(1);
      setTargets('');
      setErrors([]);
      const prevAoes = aoes.aoes ? aoes.aoes : aoes.data;
      dispatch(addDoc({ key: 'aoes', data: [...prevAoes, aoe] }));
      hide();
    } catch (err) {
      setErrors(err.data.errors.errors);
    }
  };

  useEffect(() => {

  }, [window.scrollY]);

  return (
    <div className={` bg-black/60 h-full w-full ${window.scrollY > 20 ? 'fixed top-0' : 'absolute'}`}>
      <form onSubmit={handleSubmit} className="bg-white text-xl p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[200%]">
        <button className="px-2" type="button" onClick={hide}>X</button>
        <div>
          <label htmlFor="name">
            Name:
            <input type="text" id="name" onChange={changeName} value={name} required />
          </label>
        </div>
        <div>
          <label htmlFor="fixed">
            Fixed:
            <input type="checkbox" id="fixed" value={fixed} onChange={changeFixed} />
          </label>
        </div>
        <div>
          <label htmlFor="range">
            Range:
            <input type="number" id="range" min="1" value={range} onChange={changeRange} required />
          </label>
        </div>
        <div>
          <label htmlFor="targets">
            Targets:
            <input type="text" id="targets" value={targets} onChange={changeTargets} />
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

export default AoeForm;
