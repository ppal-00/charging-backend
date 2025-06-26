const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: [
  'http://localhost:8080', // local dev
  'https://charging-frontend.vercel.app', // (or your deployed frontend later)
  'https://charging-api.onrender.com' // allow self if needed
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.options('*', cors()); // handle preflight requests


// Routes
app.use('/api/chargers', require('./routes/chargers'));
app.use('/api/auth', require('./routes/auth'));

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
