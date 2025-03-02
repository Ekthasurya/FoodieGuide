require('dotenv').config();
const mongoose = require('mongoose');
const axios = require('axios');

const { MONGO_URI, GOOGLE_API_KEY, PORT } = process.env;

// ✅ Check MongoDB Connection
const checkMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('✅ MongoDB Connection Successful!');
    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
  }
};

// ✅ Check Google Places API
const checkGoogleAPI = async () => {
  try {
    const lat = 37.7749; // Example latitude (San Francisco)
    const lon = -122.4194; // Example longitude
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=1000&type=restaurant&key=${GOOGLE_API_KEY}`;

    const response = await axios.get(url);
    
    if (response.data.status === "OK") {
      console.log("✅ Google API Key is Valid!");
    } else {
      console.error("❌ Google API Key is Invalid:", response.data.error_message);
    }
  } catch (error) {
    console.error("❌ Error Checking Google API:", error.message);
  }
};

// ✅ Check PORT Variable
const checkPort = () => {
  if (PORT) {
    console.log(`✅ PORT is set to: ${PORT}`);
  } else {
    console.error("❌ PORT is not defined in .env file");
  }
};

// Run All Checks
(async () => {
  console.log("🔍 Checking Environment Variables...");
  await checkMongoDB();
  await checkGoogleAPI();
  checkPort();
})();
   