import { Routes, Route } from 'react-router-dom';
import Layout from './component/Layout';
import Home from './component/Home';
import Login from './features/auth/Login';
import RequireAuth from './features/auth/RequireAuth';
import Profile from './component/Profile';
import Register from './features/auth/Register';
import PersistLogin from './features/auth/PersistLogin';
import NavBar from './component/NavBar';
import Documentation from './features/documentation/Documentation';
import PreFetch from './features/auth/PreFetch';

function App() {
  return (
    <div>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth />}>
                <Route element={<PreFetch />}>
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/documentation" element={<Documentation />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
