import React, { useState } from 'react';
import axios from 'axios';

const Loc = () => {
  const [selectedSuburb, setSelectedSuburb] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleSuburbChange = async (event) => {
    const suburbName = event.target.value;
    setSelectedSuburb(suburbName);

    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(suburbName)}, Kollam, Kerala`);
      if (response.status === 200 && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setLatitude(lat);
        setLongitude(lon);
        console.log("Latitude:", lat);
        console.log("Longitude:", lon);
      } else {
        throw new Error('Location not found');
      }
    } catch (error) {
      console.error('Error geocoding location:', error);
      setLatitude('');
      setLongitude('');
    }
  };

  return (
    <div className='bg-white'>
      <label htmlFor="suburb">Select a suburb:</label>
      <select id="suburb" value={selectedSuburb} onChange={handleSuburbChange}>
        <option value="">Select...</option>
        <option value="Chinnakada">Chinnakada</option>
        <option value="Kadappakada">Kadappakada</option>
        <option value="Kottiyam">Kottiyam</option>
        <option value="Karikode">Karikode</option>
        {/* Add more suburbs as needed */}
      </select>
      {latitude && longitude && (
        <div>
          <p>Latitude: {latitude}</p>
          <p>Longitude: {longitude}</p>
        </div>
      )}
    </div>
  );
};

export default Loc;
