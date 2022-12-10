import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useProfileMutation } from '../features/user/userSlice';
import { selectCurrentUser } from '../features/auth/authSlice';

function Profile() {
  const [profile, { isLoading }] = useProfileMutation();
  const [image, setImage] = useState(null);

  const user = useSelector(selectCurrentUser);

  useEffect(async () => {
    try {
      console.log(user);
      const data = await profile(user);
      setImage(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const content = isLoading ? <h1>Loading...</h1> : (
    <section>
      <header>
        Hello
        {' '}
        { console.log(user)}
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

  return content;
}

export default Profile;
