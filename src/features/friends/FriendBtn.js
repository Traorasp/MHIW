/* eslint-disable react/prop-types */
import { useState } from 'react';
import FriendForm from './FriendForm';
import addFriendSVG from '../../images/AddFriend.svg';

function FriendBtn(props) {
  const { data, update } = props;
  const [friendForm, setFriendForm] = useState(false);

  const displayForm = () => setFriendForm(!friendForm);

  return (
    <div>
      <button type="button" onClick={displayForm}>
        <img width={50} src={addFriendSVG} alt="Friend with plus sign" />
      </button>
      {friendForm ? <FriendForm ignoreList={data} update={update} hide={displayForm} /> : ''}
    </div>
  );
}

export default FriendBtn;
