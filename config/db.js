const mongoose = require('mongoose');

const dbURI = process.env.DB_URL; // your mongodb url

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the application on connection error
  }
};

module.exports = connectDB;
