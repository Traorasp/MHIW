/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { useCreateAOEMutation } from './aoeApiSlice';

function AoeForm(prop) {
  const { hide } = prop;

  const [name, setName] = useState('');
  const [fixed, setFixed] = useState(false);
  const [range, setRange] = useState(1);
  const [createAOE] = useCreateAOEMutation();

  const changeName = (e) => setName(e.target.value);
  const changeFixed = (e) => setFixed(e.target.value);
  const changeRange = (e) => setRange(e.target.value);

  const handleSubmit = async () => {
    try {
      createAOE({ name, fixed, range });
      setName('');
      setFixed(false);
      setRange(1);
      hide();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed bg-black/60 h-full w-full">
      <form className="bg-white text-xl p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[200%]">
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
        <button onClick={handleSubmit} type="button">Create</button>
      </form>
    </div>
  );
}

export default AoeForm;
