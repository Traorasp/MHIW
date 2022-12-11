import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice';

function Home() {
  const user = useSelector(selectCurrentUser);

  return (
    <section>
      <header className="text-center font-bold text-4xl"> Welcome to MHIW! </header>
      <main className="text-center">
        <h2 className="text-xl font-semibold">Online TTRPG</h2>
        <p>An online TTRPG app that allows you to connect with other players and join a capaign.</p>
        <h2 className="text-xl font-semibold">Detailed Customizability</h2>
        <p>Evrything is cuztomizable from race and looks to yours skills and magics</p>
        {user ? null : (
          <div className="flex justify-center space-x-12">
            <Link className="hover:bg-gray-200" to="/login">Sign in</Link>
            <Link className="hover:bg-gray-200" to="/register">Register</Link>
          </div>
        )}
      </main>
    </section>
  );
}

export default Home;
