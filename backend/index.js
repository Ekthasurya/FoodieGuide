require('dotenv').config();
const express = require('express');
const cors = require('cors');
const placesRoutes = require('./routes/placesRoutes');
const connectDB = require('./config/db');

const app = express();
app.use(cors());

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Ensure JSON parsing
app.use('/api', placesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
