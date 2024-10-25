//Server for backend
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

const PORT = process.env.PORT || 3000;

const app = express();

// Serve static files from the Vite build directory
app.use(express.static(path.join(__dirname, 'path/to/your/vite-app/dist')));

// Catch-all route to serve the Vite app for other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'path/to/your/vite-app/dist/index.html'));
});

const prodOrigins = [process.env.ORIGIN_1, process.env.ORIGIN_2];
const devOrigin = ['http://localhost:5173'];
const allowedOrigins =
  process.env.NODE_ENV === 'production' ? prodOrigins : devOrigin;

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin)) {
        console.log(origin, allowedOrgins);
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);
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
