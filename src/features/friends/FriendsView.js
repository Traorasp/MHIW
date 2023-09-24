/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetFriendsListMutation, useGetPendingListMutation, useGetRequestListMutation } from '../auth/authApiSlice';
import { selectCurrentId, selectCurrentToken } from '../auth/authSlice';
import FriendsList from './FriendsList';
import FriendBtn from './FriendBtn';
import { useGetImage } from '../image/getImage';

function FriendsView() {
  const [getFriendsList] = useGetFriendsListMutation();
  const [getPendingList] = useGetPendingListMutation();
  const [getRequestList] = useGetRequestListMutation();
  const id = useSelector(selectCurrentId);
  const token = useSelector(selectCurrentToken);

  const [data, setData] = useState([]);
  const [imageData, setImageData] = useState([]);

  const updateData = (newData) => setData(newData);
  const updateImageData = (newData) => setImageData(newData);

  const getProfileImages = async (list) => {
    const imageList = list.map(async (user) => {
      if (user.profilePic) {
        const images = await useGetImage(user.profilePic, token).then((res) => res.data);
        return URL.createObjectURL(images);
      }
      return '';
    });
    return Promise.all(imageList);
  };

  const getFriendsData = async () => {
    const lists = await Promise.all([
      getRequestList(id).unwrap(),
      getPendingList(id).unwrap(),
      getFriendsList(id).unwrap(),
    ]);

    const images = await Promise.all([
      getProfileImages(lists[0]),
      getProfileImages(lists[1]),
      getProfileImages(lists[2]),
    ]);
    updateImageData(images);
    updateData(lists);
  };

  useEffect(() => {
    if (data.length < 3) {
      getFriendsData();
    }
  }, []);

  const flattenData = () => data.flat().map((user) => user._id);

  return data.length < 2 ? <div>isLoading</div> : (
    <div>
      <FriendBtn data={flattenData()} update={getFriendsData} />
      <FriendsList update={getFriendsData} id={id} title="Sent" list={data[0]} images={imageData[0]} />
      <FriendsList update={getFriendsData} id={id} title="Pending" list={data[1]} images={imageData[1]} />
      <FriendsList update={getFriendsData} id={id} title="Friends" list={data[2]} images={imageData[2]} />
    </div>
  );
}

export default FriendsView;
