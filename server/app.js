//Server for backend
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

//Routes
app.use('/users', userRoutes);
app.use('/admin', adminRoutes);

//start server and connect to mongoDB, uses env file for mongo DB URI and which port to listen to
app.listen(PORT, async () => {
  console.log(`Server listening on port: ${PORT}...`);
  try {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
    console.log('Connected to Mongo DB...');
  } catch (error) {
    console.log(error);
  }
});

module.exports = app;
