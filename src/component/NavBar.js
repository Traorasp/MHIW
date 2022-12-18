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
    <nav className="grid grid-cols-6 grid-flow-row items-center bg-indigo-800">
      {user?.admin === undefined
        ? (
          <div className="col-span-6 flex flex-row text-white">
            <Link className="text-center" to="/">Home </Link>
            <Link className="" to="/login">Login </Link>
          </div>
        )
        : (
          <div className="col-span-6 flex flex-row items-stretch">
            <Link className="navbar-menu" to="/documentation"> Documentation </Link>
            <Link className="navbar-menu" to="/characters">Characters</Link>
            <Link className="navbar-menu" to="/friends">Friends</Link>
            <Link className="navbar-menu" to="/game"> Game</Link>
            {user?.admin ? (
              <Link className="navbar-menu" to="/database">
                Database
              </Link>
            ) : null}
            <Link className="basis-1/12" to="/profile">
              <img className="h-16 ml-auto mr-auto" src={user.profileURL} alt="User Profile" />
            </Link>
          </div>
        )}
    </nav>
  );

  return content;
}

export default NavBar;
