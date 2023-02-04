/* eslint-disable no-underscore-dangle */
import { useSelector } from 'react-redux';
import { selectCurrentAoes } from '../documentationSlice';
import AoeInfo from './AoeInfo';

function AoeListPanel() {
  const { aoes } = useSelector(selectCurrentAoes);
  return (
    <div>
      {aoes.map((aoe) => <AoeInfo aoe={aoe} key={aoe._id} />)}
    </div>
  );
}

export default AoeListPanel;
