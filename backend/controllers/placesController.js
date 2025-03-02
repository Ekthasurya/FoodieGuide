const axios = require('axios');
require('dotenv').config();

const getTopItems = async (req, res) => {
  let { lat, lon, restaurantId } = req.query;

  lat = lat ? parseFloat(lat) : null;
  lon = lon ? parseFloat(lon) : null;

  if (!restaurantId && (lat === null || lon === null || isNaN(lat) || isNaN(lon))) {
    return res.status(400).json({ message: 'Provide either latitude & longitude, or a restaurant ID' });
  }

  try {
    let apiUrl, params;

    if (restaurantId) {
      apiUrl = `https://api.documenu.com/v2/restaurant/${restaurantId}`;
      params = {};
    } else {
      apiUrl = `https://api.documenu.com/v2/restaurants/search/geo?lat=${lat}&lon=${lon}&distance=5`;
    }

    console.log(`🌐 Making API request to: ${apiUrl}`);

    const response = await axios.get(apiUrl, {
      headers: {
        'x-api-key': process.env.RAPIDAPI_KEY,
      },
    });

    console.log('✅ Full API Response:', JSON.stringify(response.data, null, 2));

    let menuItems = response.data.menuItems || [];

    if (!menuItems.length && !restaurantId) {
      console.log('No menu items found, trying a nearby restaurant...');
      const nearbyRestaurants = response.data.data || [];
      if (nearbyRestaurants.length > 0) {
        const firstRestaurant = nearbyRestaurants[0];
        console.log(`🔄 Fetching menu for nearby restaurant: ${firstRestaurant.restaurant_id}`);
        return getTopItems({ query: { restaurantId: firstRestaurant.restaurant_id } }, res);
      }
    }

    const topItems = menuItems
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 5);

    res.json(topItems.length ? topItems : { message: 'No menu items found' });
  } catch (error) {
    console.error('❌ API Request Failed:', error.response?.data || error.message);
    return res.status(500).json({ message: 'API request failed', error: error.message });
  }
};

module.exports = { getTopItems };
