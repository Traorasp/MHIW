/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';

function MagicUpdateForm(prop) {
  const {
    hide, magic, newDoc, update, errors,
  } = prop;

  const [name, setName] = useState(magic.name);
  const [description, setDescription] = useState(magic.description);

  const changeName = (e) => setName(e.target.value);

  const changeDescription = (e) => setDescription(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    newDoc.id = magic._id;
    newDoc.name = name;
    newDoc.description = description;

    update();
  };

  return (
    <div className="fixed bg-black/60 h-full w-full top-[4rem] left-0">
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
            <textarea value={description} onChange={changeDescription} name="description" id="description" required />
          </label>
        </div>
        {errors !== undefined && errors.length > 0 ? errors.map((err) => (
          <div className="red bg-red-500 text-white text-bold" key={err.msg}>
            *
            {err.msg}
          </div>
        )) : ''}
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default MagicUpdateForm;
