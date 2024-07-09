const express = require('express');
const bodyParser = require('body-parser');
const dotenv=require("dotenv").config();
const cors = require('cors');
const connectDB = require('./config/db'); 
const path = require('path');


const app = express();
const PORT = process.env.PORT;// 5000 port


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

connectDB();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', require('./routes/auth')); 
app.use('/api/tenant', require('./routes/tenant')); 
app.use('/api/landlord', require('./routes/landlord')); 
app.use('/api/request', require('./routes/request')); 
app.use('/api/room', require('./routes/room')); 
app.use('/api/upload', require('./routes/upload'));


app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

