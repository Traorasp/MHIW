import { Routes, Route } from 'react-router-dom';
import Layout from './component/Layout';
import Home from './component/Home';
import Login from './features/auth/Login';
import RequireAuth from './features/auth/RequireAuth';
import Profile from './component/Profile';
import Register from './features/auth/Register';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<RequireAuth />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
