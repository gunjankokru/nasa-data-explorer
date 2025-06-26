import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ThemeContext } from '../App';

const MarsRover = () => {
  const { darkMode } = useContext(ThemeContext);
  const [photos, setPhotos] = useState([]);
  const [sol, setSol] = useState(1000);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPhotos = (selectedSol) => {
    setLoading(true);
    setError('');
    axios
      .get(`https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos?sol=${selectedSol}&api_key=DEMO_KEY`)
      .then((res) => {
        if (res.data.photos.length === 0) {
          setError(`No photos found for Sol ${selectedSol}. Try another one.`);
        }
        setPhotos(res.data.photos.slice(0, 15)); // Limit for display
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch Mars Rover images');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPhotos(sol);
  }, []);

  const handleSolChange = (e) => {
    const newSol = parseInt(e.target.value);
    setSol(newSol);
    fetchPhotos(newSol);
  };

  const handleSurprise = () => {
    const randomSol = Math.floor(Math.random() * 3000); // Perseverance has ~3000 sols
    setSol(randomSol);
    fetchPhotos(randomSol);
  };

  return (
    <div className={`content ${darkMode ? 'dark-content' : 'light-content'}`}>
      <div className="card">
        <h2>Mars Rover: Perseverance</h2>
        <div className="controls">
          <input type="number" value={sol} onChange={handleSolChange} placeholder="Enter Sol (Martian day)" />
          <button onClick={handleSurprise}>🎲 Surprise Me</button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        <div className="gallery">
          {photos.map((photo) => (
            <img key={photo.id} src={photo.img_src} alt={`Mars Rover ${photo.id}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarsRover;
