import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import DoctorsPage from './pages/DoctorsPage.tsx';
import NursesPage from './pages/NursesPage.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<DoctorsPage />} />
        <Route path="/nurses" element={<NursesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
