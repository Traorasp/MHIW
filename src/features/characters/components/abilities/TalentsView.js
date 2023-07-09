/* eslint-disable react/prop-types */
function TalentsView(props) {
  const { character, update } = props;

  console.log(character.talents);
  console.log(character.talentTypes);

  const changeTalents = () => {
    update();
  };

  return (
    <div>
      <button type="button" onClick={changeTalents}>+</button>
    </div>
  );
}

export default TalentsView;
