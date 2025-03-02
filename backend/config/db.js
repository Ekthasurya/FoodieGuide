const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("❌ MONGO_URI is not defined in environment variables.");
    }

    await mongoose.connect(uri); // No extra options needed for Mongoose 6+

    console.log('✅ MongoDB Connected:', mongoose.connection.host);
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
