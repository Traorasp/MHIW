/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
function DocInfoCard(prop) {
  const { data, docDelete, id } = prop;

  const deleteCard = async () => {
    try {
      docDelete(id);
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
