/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addDoc } from './documentationSlice';
import AoeUpdateForm from './aoes/AoeUpdateForm';
import EffectUpdateForm from './effects/EffectUpdateForm';

/* eslint-disable react/prop-types */
function DocInfoCard(prop) {
  const {
    data, docUpdate, docDelete, id, list, listOf,
  } = prop;
  const [showForm, displayForm] = useState(false);
  const dispatch = useDispatch();
  const newDoc = {};

  const updateForm = () => {
    displayForm(!showForm);
  };

  const update = async () => {
    try {
      docUpdate(newDoc);
      const prevList = [...list[Object.keys(list)[0]]];
      const index = prevList.findIndex((doc) => doc._id === id);
      newDoc._id = newDoc.id;
      delete newDoc.id;
      prevList[index] = newDoc;
      dispatch(addDoc({ key: listOf.toLowerCase(), data: [...prevList] }));
      updateForm();
    } catch (err) {
      console.log(err);
    }
  };

  const selectForm = () => {
    switch (listOf) {
      case 'AOEs':
        return <AoeUpdateForm aoe={data} newDoc={newDoc} update={update} hide={updateForm} />;
      case 'Effects':
        return <EffectUpdateForm oldEffect={data} newDoc={newDoc} update={update} hide={updateForm} />;
      case 'Enchants':
        return <AoeUpdateForm />;
      case 'Items':
        return <AoeUpdateForm />;
      case 'Magics':
        return <AoeUpdateForm />;
      case 'Races':
        return <AoeUpdateForm />;
      case 'Spells':
        return <AoeUpdateForm />;
      case 'Skills':
        return <AoeUpdateForm />;
      case 'Talents':
        return <AoeUpdateForm />;
      case 'Titles':
        return <AoeUpdateForm />;
      default:
        return '';
    }
  };

  const deleteCard = async () => {
    try {
      docDelete(id);
      const prevList = [...list[Object.keys(list)[0]]];
      const index = prevList.findIndex((doc) => doc._id === id);
      prevList.splice(index, 1);
      dispatch(addDoc({ key: listOf.toLowerCase(), data: [...prevList] }));
    } catch (err) {
      console.log(err);
    }
  };

  const info = Object.entries(data).map(([key, value]) => ((key.substring(0, 1) === '_' || value === '' || value === 0) ? ''
    : (
      <div key={key}>
        { key !== 'name' ? `${key.substring(0, 1).toUpperCase() + key.substring(1)} : ` : ''}
        {typeof value === 'boolean' ? value ? 'True' : 'False' : value}
      </div>
    )));

  return (
    <div className="border-2 border-black pl-2">
      {info}
      <button className="hover:bg-red-600 hover:border-black hover:border-2" onClick={deleteCard} type="button">Delete</button>
      <button className="hover:bg-yellow-400 hover:border-black hover:border-2" onClick={updateForm} type="button">Edit</button>
      {showForm ? selectForm() : ''}
    </div>
  );
}
export default DocInfoCard;
