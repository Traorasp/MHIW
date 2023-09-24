/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetUsersListMutation, usePostFriendsRequestMutation } from '../auth/authApiSlice';
import profileSVG from '../../images/profile.svg';
import { useGetImage } from '../image/getImage';
import {
  selectCurrentId, selectCurrentToken, selectCurrentUsername,
} from '../auth/authSlice';

/* eslint-disable react/prop-types */
function FriendForm(props) {
  const { ignoreList, update, hide } = props;

  const token = useSelector(selectCurrentToken);
  const id = useSelector(selectCurrentId);
  const username = useSelector(selectCurrentUsername);

  const [sendFriendRequest] = usePostFriendsRequestMutation();

  const [usersList, setUsersList] = useState([]);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [getUsersList] = useGetUsersListMutation();
  const changeSearch = (e) => setSearch(e.target.value);
  const changeUsersList = (list) => setUsersList(list);

  const getProfileImages = async (list) => {
    const imageList = list.map(async (user) => {
      if (user.profilePic) {
        const data = await useGetImage(user.profilePic, token).then((res) => res.data);
        return URL.createObjectURL(data);
      }
      return '';
    });
    return Promise.all(imageList);
  };

  const updateUsersList = async () => {
    try {
      const users = await getUsersList().unwrap();
      const filteredList = users.filter((user) => !ignoreList.includes(user._id));
      changeUsersList(filteredList);
    } catch (err) {
      console.log(err);
    }
  };

  const searchResults = async () => {
    const expression = new RegExp(`${search.toLowerCase()}`);
    if (search === '') {
      return [[], []];
    }
    const filteredList = usersList.filter(
      (user) => (user.username.toLowerCase().search(expression) !== -1
      && user.username !== username),
    );
    const images = await getProfileImages(filteredList);
    return [filteredList, images];
  };

  useEffect(() => {
    updateUsersList();
  }, []);

  const sendRequest = (e) => {
    const friendId = e.target.value;
    sendFriendRequest([friendId, id]);
    update();
    hide(true);
  };

  const searchUsers = async () => {
    const matchedUsers = await searchResults();
    setResults(matchedUsers);
  };

  const userProfiles = () => {
    if (results.length < 1) return '';
    return results[0].map((user, i) => (
      <div key={user._id} className="flex justify-between">
        <div>
          <img
            width="50"
            alt="User Profile"
            src={user.profilePic ? results[1][i] : profileSVG}
          />
          {user.username}
        </div>
        <button type="button" onClick={sendRequest} value={user._id}>+</button>
      </div>
    ));
  };

  return (
    <div className="fixed bg-black/60 h-full w-full top-[4rem] left-0">
      <div className="bg-white text-xl p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%]">
        <button type="button" onClick={hide}>X</button>
        <h1 className="font-bold text-2xl">Send Friend Request</h1>
        <label htmlFor="searchBar">
          <input id="searchBar" type="text" onChange={changeSearch} />
        </label>
        <button type="button" onClick={searchUsers}>{'>'}</button>
        <div>
          {userProfiles()}
        </div>
      </div>
    </div>
  );
}

export default FriendForm;
