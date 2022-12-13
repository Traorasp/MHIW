import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectCurrentUser } from '../features/auth/authSlice';
import profileSVG from '../images/profile.svg';
import { useGetImageMutation } from '../features/image/imageApiSlice';

function NavBar() {
  const user = useSelector(selectCurrentUser);
  const [profile, { isLoading }] = useGetImageMutation();
  const [image, setImage] = useState(profileSVG);

  useEffect(
    () => {
      if (user?.profilePic) {
        // eslint-disable-next-line no-unused-expressions
        async () => {
          try {
            const data = await profile(user.profilePic).unwrap();
            setImage(data);
          } catch (err) {
            setImage(profileSVG);
          }
        };
      }
    },
    [],
  );

  const content = isLoading ? <p>Loading...</p>
    : (
      <nav className="grid grid-cols-7 grid-flow-row items-center">
        <Link className="text-center" to="/">Home</Link>
        {user?.admin === undefined ? <Link to="/login">Login</Link>
          : (
            <div className="col-span-6 flex flex-row justify-between items-center">
              <Link to="/">Documentation</Link>
              <Link to="/">Characters</Link>
              <Link to="/">Friends</Link>
              <Link to="/">Game</Link>
              {user?.admin ? (<Link to="/">Database</Link>) : null}
              <Link className="flex flex-col justify-center items-center" to="/profile">
                <img className="object-scale-down h-8- w-8" src={image} alt="User Profile" />
                <p>{user?.username}</p>
              </Link>
            </div>
          )}
      </nav>
    );

  return content;
}

export default NavBar;
