const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGODB_URL;
mongoose.connect(url);

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

module.exports = db;