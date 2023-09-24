/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import downArrowSVG from '../../images/downArrow.svg';
import upArrowSVG from '../../images/upArrow.svg';
import profileSVG from '../../images/profile.svg';
import { usePostAcceptFriendsRequestMutation, useDeleteReceivedFriendsRequestMutation, useDeleteFriendMutation } from '../auth/authApiSlice';

function FriendsList(props) {
  const {
    update, id, title, list, images,
  } = props;

  const [hide, setHide] = useState(false);
  const [useAcceptRequest] = usePostAcceptFriendsRequestMutation();
  const [useDeclineRequest] = useDeleteReceivedFriendsRequestMutation();
  const [useUnfriend] = useDeleteFriendMutation();

  const displayList = () => setHide(!hide);

  const rejectRequest = async (e) => {
    try {
      await useDeclineRequest([id, e.target.value]);
      update();
    } catch (err) {
      console.log(err);
    }
  };

  const acceptRequest = async (e) => {
    try {
      await useAcceptRequest([id, e.target.value]);
      update();
    } catch (err) {
      console.log(err);
    }
  };

  const unfriend = async (e) => {
    try {
      await useUnfriend([id, e.target.value]);
      update();
    } catch (err) {
      console.log(err);
    }
  };

  const cancelRequest = async (e) => {
    try {
      await useDeclineRequest([e.target.value, id]);
      update();
    } catch (err) {
      console.log(err);
    }
  };
  const selectRejectFunction = () => {
    switch (title) {
      case 'Pending':
        return rejectRequest;
      case 'Friends':
        return unfriend;
      case 'Sent':
        return cancelRequest;
      default:
        console.log(title);
        return '';
    }
  };

  return (
    <div>
      <div className="font-bold text-2xl">
        {title}
        <button type="button" onClick={displayList}>
          <img
            src={hide ? upArrowSVG : downArrowSVG}
            alt="Up arrow"
            width="15"
          />
        </button>
      </div>
      {hide ? '' : list.map((user, i) => (
        <div key={user._id} className="flex justify-between">
          <img
            width="50"
            alt="User Profile"
            src={user.profilePic ? images[i] : profileSVG}
          />
          <div>
            {user.username}

            <div>
              {title === 'Pending'
                ? (
                  <button value={user._id} className="bg-green-400" type="button" onClick={acceptRequest}>+</button>
                )
                : ''}
              <button value={user._id} className="bg-red-400" type="button" onClick={selectRejectFunction()}>x</button>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}

export default FriendsList;
