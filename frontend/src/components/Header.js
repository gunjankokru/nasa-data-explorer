import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../App';

const Header = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const location = useLocation();

  return (
    <header className="header">
      <h1>🚀 NASA Data Explorer</h1>
      <nav>
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>APOD</Link>
        <Link to="/mars" className={location.pathname === '/mars' ? 'active' : ''}>Mars Rover</Link>
        <button onClick={() => setDarkMode(!darkMode)} className="theme-toggle">
          {darkMode ? '🌞 Light' : '🌙 Dark'}
        </button>
      </nav>
    </header>
  );
};

export default Header;
