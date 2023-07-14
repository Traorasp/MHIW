/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
function TalentTree(props) {
  const {
    talentTree, talents, mainTalent, showTalent,
  } = props;

  const returnTalentsDetail = (e) => {
    const layerInd = e.target.value;
    const talentName = e.target.innerText;
    const talentDetails = talentTree[layerInd].find((talent) => talent.name === talentName);
    let parentNames = [];
    if (layerInd > 0) {
      const parents = talentDetails.parent;
      parentNames = parents.map(
        (parent) => talentTree[layerInd - 1].find((talent) => talent._id === parent).name,
      );
    }

    showTalent(talentDetails, parentNames);
  };

  const layer = (TalentList, layerInd) => (
    TalentList.map((talent) => (
      <button onClick={returnTalentsDetail} type="button" key={talent.name} value={layerInd} className="text-sm border-2 border-solid border-blue-400 bg-blue-100">
        {talent.name}
      </button>
    ))

  );

  return (
    <div>
      <h1 className="text-lg font-bold">{mainTalent}</h1>
      <h1>{talentTree.length > 0 ? talentTree[0].talent : ''}</h1>
      <h1>{talents.length > 0 ? talents[0].talent : ''}</h1>
      {talentTree.map((talentLayer, layerInd) => (
        <div className="flex justify-evenly bg-blue-100 border-solid border-2 border-black " key={`Layer-${talentLayer[0].name}`}>
          {layer(talentLayer, layerInd)}
        </div>
      ))}
    </div>
  );
}

export default TalentTree;
