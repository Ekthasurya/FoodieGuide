import React, { useState } from 'react';
import axios from 'axios';
import VoiceInput from './VoiceInput';
import '../css/Home.css';

const Home = () => {
  const [items, setItems] = useState([]);
  const [restaurantId, setRestaurantId] = useState('4072702673999819'); // Example restaurant ID (can be dynamic)
  const [error, setError] = useState(null); // Added error state

  // Function to fetch top items based on restaurantId
  const getTopItems = () => {
    console.log('getTopItems() called! Fetching location...');

    // Get user's geolocation
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude.toFixed(6); // Convert to string with precision
        const longitude = position.coords.longitude.toFixed(6);

        console.log(`Location: Lat ${latitude}, Lon ${longitude}`);

        try {
          // Make API request to the backend with restaurantId
          const response = await axios.get('http://localhost:5000/api/top-items', {
            params: { restaurantId, lat: latitude, lon: longitude },
          });
          console.log('API Response:', response.data);
          setItems(response.data); // Assuming response is an array of items
          setError(null); // Clear error on successful fetch
        } catch (error) {
          setError('Failed to fetch top items. Please try again.');
          console.error('❌ Error fetching top items:', error.message);
        }
      },
      (error) => {
        console.error('❌ Geolocation error:', error.message);
        setError('Failed to get location. Please enable geolocation.');
      }
    );
  };

  // Function to handle voice command and fetch food items if relevant
  const handleVoiceCommand = (command) => {
    console.log('Received voice command:', command);
    if (!command) {
      console.error('handleVoiceCommand received an empty command!');
      return;
    }

    // If the command contains 'food', fetch the top items
    if (command.toLowerCase().includes('food')) {
      console.log('Fetching top food items...');
      getTopItems();
    } else {
      console.log("Command did not match 'food'");
    }
  };

  return (
    <div className="container">
      <h1>Top 5 Food Items Nearby</h1>
      <VoiceInput onText={handleVoiceCommand} />
      <div>{error && <p>{error}</p>}</div>
      <ul>
        {items.length > 0 ? (
          items.map((item, index) => (
            <li key={index}>
              <strong>{item.name || 'Unknown Item'}</strong><br />
              {item.address ? <em>{item.address}</em> : <span>No address available</span>}<br />
              Rating: {item.rating || 'N/A'}
            </li>
          ))
        ) : (
          <p>No items found.</p>
        )}
      </ul>
    </div>
  );
};

export default Home;
