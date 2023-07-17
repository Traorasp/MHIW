/* eslint-disable react/no-unknown-property */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
function TalentTree(props) {
  const {
    talentTree, talents, mainTalent, showTalent,
    updateTalents, treeIndex, showErrorText,
  } = props;

  const talentsID = talents.map((talentObj) => talentObj._id);

  const returnTalentsDetail = (e) => {
    const layerInd = e.target.value;
    const talentName = e.target.dataset.talent;
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

  const haveTalent = (talent) => talentsID.includes(talent._id);

  const findChildren = (parentID, layerBelow) => {
    if (layerBelow >= talentTree.length) {
      return [];
    }
    const layer = talentTree[layerBelow];
    const children = layer.filter((talent) => {
      if (talent.parent.includes(parentID)) {
        return true;
      }
      return false;
    });
    return children.map((talent) => talent._id);
  };

  const changeTalents = (e) => {
    const layerInd = e.target.value;
    const talentName = e.target.innerText;
    const talentDetails = talentTree[layerInd].find((talent) => talent.name === talentName);
    if (haveTalent(talentDetails)) {
      let haveChildren = false;
      const childrens = findChildren(talentDetails._id, Number(layerInd) + 1);
      childrens.every((children) => {
        if (talentsID.includes(children)) {
          haveChildren = true;
          return false;
        }
        return true;
      });

      if (!haveChildren) {
        const ind = talentsID.indexOf(talentDetails._id);
        talents.splice(ind, 1);
        updateTalents(talents, treeIndex);
      } else {
        showErrorText('Remove talents that require it first');
      }
      return;
    }
    let haveParents = true;
    talentDetails.parent.every((parent) => {
      if (talentsID.includes(parent)) {
        return true;
      }
      haveParents = false;
      return false;
    });
    if (haveParents) {
      const newTalents = talents.concat(talentDetails);
      updateTalents(newTalents, treeIndex);
    } else {
      showErrorText('Fail to meet talent requirements');
    }
  };

  const layer = (TalentList, layerInd) => (
    TalentList.map((talent) => (
      <div key={talent.name} className={`border-2 border-solid ${haveTalent(talent) ? 'border-blue-600 bg-blue-300' : 'border-blue-400 bg-blue-100'}`}>
        <button
          type="button"
          value={layerInd}
          onClick={changeTalents}
          className="text-sm"
        >
          {talent.name}
        </button>
        <button
          onClick={returnTalentsDetail}
          type="button"
          data-talent={talent.name}
          value={layerInd}
          className="text-sm px-2"
        >
          +
        </button>
      </div>
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
