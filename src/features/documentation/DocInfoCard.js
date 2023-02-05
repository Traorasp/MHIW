/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
function DocInfoCard(prop) {
  const { data } = prop;

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
    </div>
  );
}
export default DocInfoCard;
