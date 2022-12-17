import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { selectCurrentUser, selectCurrentToken, setProfileURL } from '../features/auth/authSlice';
import { useGetImage } from '../features/image/getImage';
import profileSVG from '../images/profile.svg';

function NavBar() {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.profilePic != null) {
      useGetImage(user.profilePic, token).then((res) => {
        const href = URL.createObjectURL(res.data);
        dispatch(setProfileURL(href));
      }).catch(() => {
        dispatch(setProfileURL(profileSVG));
      });
    }
  }, [user?.profilePic]);

  const content = (
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
              <img className="object-scale-down h-8- w-8" src={user.profileURL} alt="User Profile" />
              <p>{user?.username}</p>
            </Link>
          </div>
        )}
    </nav>
  );

  return content;
}

export default NavBar;
