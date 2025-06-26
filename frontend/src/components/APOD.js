import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ThemeContext } from '../App';

const APOD = () => {
  const { darkMode } = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = (selectedDate = '') => {
    setLoading(true);
    setError('');
    axios.get(`https://nasa-data-explorer-ifsi.onrender.com/api/apod${selectedDate ? `?date=${selectedDate}` : ''}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Could not load data. Please try a different date.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    fetchData(selectedDate);
  };

  const handleSurprise = () => {
    const randomDate = getRandomDate();
    setDate(randomDate);
    fetchData(randomDate);
  };

  const getRandomDate = () => {
    const start = new Date(1995, 5, 16); // APOD start date
    const end = new Date();
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0];
  };

  return (
    <div className={`content ${darkMode ? 'dark-content' : 'light-content'}`}>
      <div className="card">
        <div className="controls">
          <input type="date" value={date} onChange={handleDateChange} max={new Date().toISOString().split('T')[0]} />
          <button onClick={handleSurprise}>🎲 Surprise Me</button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {data && (
          <>
            <h2>{data.title}</h2>
            {data.media_type === 'image' ? (
              <img src={data.url} alt={data.title} className="nasa-image" />
            ) : (
              <iframe title="NASA Video" src={data.url} width="100%" height="400px" />
            )}
            <p>{data.explanation}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default APOD;
