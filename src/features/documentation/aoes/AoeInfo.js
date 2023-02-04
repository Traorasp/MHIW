/* eslint-disable react/prop-types */
function AoeInfo(prop) {
  const { aoe } = prop;
  const { name, fixed, range } = aoe;

  return (
    <div className="border-2 border-black pl-2">
      <div>{name}</div>
      <div>
        Fixed:
        {' '}
        {fixed}
      </div>
      <div>
        Range:
        {' '}
        {range}
      </div>
    </div>
  );
}
export default AoeInfo;
