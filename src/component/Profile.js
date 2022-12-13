import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetImageMutation } from '../features/image/imageApiSlice';
import { selectCurrentUser, setProfile } from '../features/auth/authSlice';
import profileSVG from '../images/profile.svg';
import ImageForm from './imageForm';
import { useUpdateProfileMutation } from '../features/user/userApiSlice';

function Profile() {
  const [profile, { isLoading }] = useGetImageMutation();
  const [image, setImage] = useState(profileSVG);
  const [profileForm, setProfileForm] = useState(false);
  const { username, _id, profilePic } = useSelector(selectCurrentUser);
  const [imageId, setImageId] = useState(profilePic);
  const dispatch = useDispatch();
  const [updateProfile] = useUpdateProfileMutation();

  const getProfile = async () => {
    if (!profilePic) {
      return;
    }
    try {
      const src = await profile(imageId).unwrap();
      console.log(src);
      setImage(src);
    } catch (err) {
      console.log(err);
      setImage(profileSVG);
    }
  };

  const showProfileForm = () => {
    setProfileForm(!profileForm);
  };

  const handleProfile = async () => {
    try {
      console.log(_id);
      console.log(imageId);
      await updateProfile({ _id, imageId });
      dispatch(setProfile(imageId));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(
    () => {
      getProfile();
      if (profilePic !== imageId) {
        handleProfile();
      }
    },
    [imageId],
  );

  const content = isLoading ? <h1>Loading...</h1> : (
    <section>
      <header>
        Hello
        {' '}
        {username}
      </header>
      <main>
        {profileForm ? <ImageForm hideForm={showProfileForm} setImageId={setImageId} />
          : null}
        <div>
          <img className="object-scale-down h-36 w-36" src={image} alt="User profile" />
          <button onClick={showProfileForm} type="button">Change Profile</button>
        </div>
        <div>
          <h2>Username:</h2>
          <p>
            {username}
          </p>
        </div>
      </main>
    </section>
  );

  return content;
}

export default Profile;
