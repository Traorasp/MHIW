/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';

function AoeUpdateForm(prop) {
  const {
    hide, update, aoe, newDoc,
  } = prop;
  const [name, setName] = useState(aoe.name);
  const [fixed, setFixed] = useState(aoe.fixed);
  const [range, setRange] = useState(aoe.range);

  const changeName = (e) => setName(e.target.value);
  const changeFixed = () => setFixed(!fixed);
  const changeRange = (e) => setRange(e.target.value);

  const handleUpdate = (e) => {
    e.preventDefault();
    newDoc.id = aoe._id;
    newDoc.name = name;
    newDoc.fixed = fixed;
    newDoc.range = range;
    update();
  };

  return (
    <div className="fixed bg-black/60 h-full w-full top-[4rem] left-0">
      <form onSubmit={handleUpdate} className="bg-white text-xl p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[100%]">
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
            <input type="checkbox" id="fixed" defaultChecked={fixed} value={fixed} onChange={changeFixed} />
          </label>
        </div>
        <div>
          <label htmlFor="range">
            Range:
            <input type="number" id="range" min="1" value={range} onChange={changeRange} required />
          </label>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default AoeUpdateForm;
