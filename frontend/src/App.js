import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import APOD from './components/APOD';
import MarsRover from './components/MarsRover';
import Header from './components/Header';
import './App.css';

export const ThemeContext = createContext();

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <Router>
        <div className={darkMode ? 'dark' : 'light'}>
          <Header />
          <Routes>
            <Route path="/" element={<APOD />} />
            <Route path="/mars" element={<MarsRover />} />
          </Routes>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;
