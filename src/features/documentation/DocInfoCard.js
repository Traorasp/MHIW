/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
import { useDispatch } from 'react-redux';
import { addDoc } from './documentationSlice';

/* eslint-disable react/prop-types */
function DocInfoCard(prop) {
  const {
    data, docDelete, id, list, listOf,
  } = prop;

  const dispatch = useDispatch();

  const deleteCard = async () => {
    try {
      docDelete(id);
      const prevList = [...list[Object.keys(list)[0]]];
      const index = prevList.findIndex((doc) => doc._id === id);
      prevList.splice(index, 1);
      console.log(prevList);
      dispatch(addDoc({ key: listOf.toLowerCase(), data: [...prevList] }));
    } catch (err) {
      console.log(err);
    }
  };

  const info = Object.entries(data).map(([key, value]) => ((key.substring(0, 1) === '_' || value === '') ? ''
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
    </div>
  );
}
export default DocInfoCard;
