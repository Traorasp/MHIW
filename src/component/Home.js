import { Link } from 'react-router-dom';

function Home() {
  return (
    <section>
      <header> Welcome to MHIW! </header>
      <main>
        <h2>Online TTRPG</h2>
        <p>An online TTRPG app that allows you to connect with other players and join a capaign.</p>
        <h2>Detailed Customizability</h2>
        <p>Evrything is cuztomizable from race and looks to yours skills and magics</p>
        <div>
          <Link to="/login">Sign in</Link>
          <Link to="/register">Register</Link>
        </div>
      </main>
    </section>
  );
}
