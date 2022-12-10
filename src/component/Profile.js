import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useProfileMutation } from '../features/user/userSlice';
import { selectCurrentUser } from '../features/auth/authSlice';

function Profile() {
  const [profile, { isLoading }] = useProfileMutation();
  const [image, setImage] = useEffect(null);

  const user = useSelector(selectCurrentUser);

  useEffect(async () => {
    try {
      console.log(user);
      const data = await profile(user);
      setImage(data);
    } catch (err) {
      if (!err?.status) {
        setErrMsg('No server response');
      } else if (err.status === 404) {
        setErrMsg('Image does not exist');
      } else {
        setErrMsg('Error getting image');
      }
    }
  }, []);

  return (
    <section>
      <header>
        Hello
        {' '}
        {user.username}
      </header>
      <div>
        <img src={image} alt="User profile" />
        <h2>Username:</h2>
        <p>
          {user.username}
        </p>
      </div>
    </section>
  );
}

export default Profile;
