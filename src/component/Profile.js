import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  selectCurrentUser, setProfile, selectCurrentToken, setProfileURL, logout,
} from '../features/auth/authSlice';
import profileSVG from '../images/profile.svg';
import ImageForm from './imageForm';
import { useUpdateProfileMutation } from '../features/user/userApiSlice';
import { useGetImage } from '../features/image/getImage';

function Profile() {
  const {
    username, _id, profilePic, profileURL,
  } = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);

  const [profileForm, setProfileForm] = useState(false);
  const [imageId, setImageId] = useState(profilePic);
  const [isLoading, setLoading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [updateProfile] = useUpdateProfileMutation();

  const getProfile = () => {
    if (!profilePic) {
      return;
    }
    useGetImage(profilePic, token)
      .then((res) => {
        const href = URL.createObjectURL(res.data);
        dispatch(setProfileURL(href));
      }).catch(() => {
        dispatch(setProfileURL(profileSVG));
      }).finally(() => {
        setLoading(false);
      });
  };

  const showProfileForm = () => {
    setProfileForm(!profileForm);
  };

  const handleProfile = async () => {
    try {
      const data = { _id, imageId };
      await updateProfile(data);
      dispatch(setProfile(imageId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    try {
      dispatch(logout());
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(
    () => {
      handleProfile();
      getProfile();
    },
    [imageId],
  );

  const content = isLoading ? <p>Loading...</p> : (
    <section>
      <header>
        Hello
        {' '}
        {username}
      </header>
      <main>
        {profileForm
          ? (
            <ImageForm
              hideForm={showProfileForm}
              setImageId={setImageId}
              prevImageId={profilePic}
            />
          )
          : null}
        <div>
          <img className="object-scale-down h-36 w-36" src={profileURL} alt="User profile" />
          <button
            className="bg-sky-700 text-white px-2 py-.5 border-2 border-black hover:bg-sky-500 hover:font-semibold"
            onClick={showProfileForm}
            type="button"
          >
            {' '}
            Change Profile

          </button>
        </div>
        <div>
          <h2>Username:</h2>
          <p>
            {username}
          </p>
        </div>
        <button
          className="bg-red-700 text-white px-2 py-.5 border-2 border-black hover:bg-red-500 hover:font-semibold"
          type="button"
          onClick={handleLogout}
        >
          Log Out

        </button>
      </main>
    </section>
  );

  return content;
}

export default Profile;
