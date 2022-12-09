import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './component/Layout';
import Home from './component/Home';
import Login from './features/auth/Login';
import RequireAuth from './features/auth/RequireAuth';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth />} />
      </Route>
    </Routes>
  );
}

export default App;
