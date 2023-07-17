/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentTalents } from '../../../documentation/documentationSlice';
import { useUpdateCharacterMutation } from '../../characterApeSlice';
import TalentTree from './TalentTree';

/* eslint-disable react/prop-types */
function TalentsView(props) {
  const { character, update } = props;
  let talentList = useSelector(selectCurrentTalents);
  talentList = talentList.talent ? talentList.talent : talentList.data;

  const { talentTypes } = character;

  const filterTalents = (index) => {
    const mainTalent = talentTypes[index];
    return character.talents.filter((talent) => mainTalent === talent.talent);
  };

  const [talentShown, setTalentShown] = useState(null);
  const [parentShown, setParentShown] = useState([]);
  const [talentsOwned, setTalentsOwned] = useState(character.talentTypes.map(
    (type, i) => filterTalents(i),
  ));
  const [showError, setShowError] = useState(false);
  const [updateCharacter, { isLoading }] = useUpdateCharacterMutation();

  const showErrorText = (err) => {
    setShowError(err);
    setTimeout(() => {
      setShowError(false);
    }, 5000);
  };

  useEffect(() => {
    setTalentsOwned(character.talentTypes.map(
      (type, i) => filterTalents(i),
    ));
  }, [character.talents]);

  // eslint-disable-next-line no-unused-vars
  const updateCharacterTalents = async (ownedTalents) => {
    try {
      if (isLoading) return;
      const newChar = {};
      Object.entries(character).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          newChar[key] = [...value];
        } else {
          newChar[key] = value;
        }
      });
      const newTalents = [];
      ownedTalents.forEach((talentTypeList) => {
        newTalents.push(...talentTypeList);
      });
      newChar.talents = newTalents;
      await updateCharacter(newChar);
      update();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
  }, [talentsOwned]);

  const changeTalentsOwned = (talents, ind) => {
    const newTalents = talentsOwned.map((talentTree, i) => {
      if (i === ind) {
        return talents;
      }
      return talentTree;
    });

    const totalPoints = newTalents.map(
      (talentTypeList) => talentTypeList.length,
    ).reduce((a, b) => a + b, 0);
    if (totalPoints <= character.level) {
      setTalentsOwned(newTalents);
      updateCharacterTalents(newTalents);
      return;
    }
    showErrorText('Not enought talent points');
  };

  const showTalent = (talent, parentNames) => {
    setTalentShown(talent);
    setParentShown(parentNames);
  };

  const formatTree = (talentTree) => {
    let tree = talentTree;
    const layeredTree = [];
    layeredTree.push([tree.shift()]);

    for (let i = 0; i < layeredTree.length; i += 1) {
      const newTree = [];
      const layer = tree.filter((talent) => {
        let addTalent = false;

        layeredTree[i].every((currParent) => {
          if (talent.parent.includes(currParent._id)) {
            addTalent = true;
            return false;
          }
          if (!newTree.includes(talent)) {
            newTree.push(talent);
          }
          return true;
        });
        return addTalent;
      });
      tree = newTree;
      if (layer.length === 0) {
        break;
      }
      layeredTree.push(layer);
    }
    return layeredTree;
  };

  const getTalentTrees = () => {
    const trees = [];
    if (talentTypes.length === 0) {
      return [];
    }
    talentTypes.forEach((mainTalent) => {
      const list = talentList.filter((talent) => talent.talent === mainTalent);
      trees.push(list);
    });
    return trees.map((tree) => formatTree(tree));
  };

  const talentTrees = getTalentTrees();

  const changeTalents = () => {
    update();
  };

  const clearDetails = () => {
    setTalentShown(null);
    setParentShown([]);
  };

  const detailsBox = () => (
    <div className="fixed bg-black/60 h-full w-full top-[4rem] left-0">
      <div className="bg-white text-xl p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%]">
        <button type="button" onClick={clearDetails}>X</button>
        <h1 className="text-2xl font-bold">{talentShown.name}</h1>
        {parentShown.length < 1 ? '' : (
          <h2>
            <div className="font-bold">Parents:</div>
            {' '}
            {parentShown.join(', ')}
          </h2>
        )}
        <h2>
          <div className="font-bold">Priority:</div>
          {' '}
          {talentShown.priority}
        </h2>
        {talentShown.cooldown === 0 ? '' : (
          <h2>
            <div className="font-bold">Cooldown:</div>
            {' '}
            {talentShown.cooldown}
          </h2>
        )}
        {talentShown.measurements.length < 1 ? '' : (
          <h2>
            <div className="font-bold">Measurements:</div>
            {' '}
            {talentShown.measurements.join(', ')}
          </h2>
        )}
        {talentShown.castTime === 0 ? '' : (
          <h2>
            <div className="font-bold">Cast Time:</div>
            {' '}
            {talentShown.castTime}
          </h2>
        )}
        {talentShown.charges === 0 ? '' : (
          <h2>
            <div className="font-bold">Charges:</div>
            {' '}
            {talentShown.charges}
          </h2>
        )}
        {talentShown.duration === 0 ? '' : (
          <h2>
            <div className="font-bold">Duration:</div>
            {' '}
            {talentShown.duration}
          </h2>
        )}
        <h2>
          <div className="font-bold">Description:</div>
          {' '}
          {talentShown.description}
        </h2>

      </div>
    </div>
  );

  return (
    <div>
      {talentShown != null ? detailsBox() : ''}
      {talentTrees.map((tree, i) => (
        <TalentTree
          changeTalents={changeTalents}
          key={talentTypes[i]}
          mainTalent={talentTypes[i]}
          talentTree={tree}
          talents={talentsOwned[i]}
          showTalent={showTalent}
          updateTalents={changeTalentsOwned}
          treeIndex={i}
          showErrorText={showErrorText}
        />
      ))}
      {showError ? (
        <div className="absolute left-2 bottom-16 bg-red-600 text-white">
          {showError}
        </div>
      ) : ''}
    </div>
  );
}

export default TalentsView;
