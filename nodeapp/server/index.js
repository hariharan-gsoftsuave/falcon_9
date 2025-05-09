
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyparser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyparser.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
}));
const connectDB = require('./config/db');
connectDB();

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Start server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}`);
});
