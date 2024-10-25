import { Route, Routes } from 'react-router-dom';
import './App.css';

import Welcome from './components/Welcome.jsx';
import Two from './components/Two.jsx';
import Three from './components/Three.jsx';
import Admin from './components/Admin.jsx';
import Data from './components/Data.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/2" element={<Two />} />
      <Route path="/3" element={<Three />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/data" element={<Data />} />
    </Routes>
  );
};

export default App;
