import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useProfileMutation } from '../features/image/imageApiSlice';
import { selectCurrentUser } from '../features/auth/authSlice';
import profileSVG from '../images/profile.svg';

function Profile() {
  const [profile, { isLoading }] = useProfileMutation();
  const [image, setImage] = useState(profileSVG);

  const { username, profilePic } = useSelector(selectCurrentUser);

  const getProfile = async () => {
    if (!profilePic) {
      return;
    }
    try {
      const data = await profile(profilePic).unwrap();
      setImage(data);
    } catch (err) {
      setImage(profileSVG);
    }
  };

  useEffect(
    () => {
      getProfile();
    },
    [],
  );

  const content = isLoading ? <h1>Loading...</h1> : (
    <section>
      <header>
        Hello
        {' '}
        {username}
      </header>
      <div>
        <img className="object-scale-down h-36 w-36" src={image} alt="User profile" />
        <h2>Username:</h2>
        <p className="">
          {username}
        </p>
      </div>
    </section>
  );

  return content;
}

export default Profile;
