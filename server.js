// Import npm packages
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
require('dotenv').config();

const BlogPost = require('./models/blogPosts')

const app = express()
const PORT = process.env.PORT || 8080

const routes = require('./routes/api')

// Connect MongoDB
const connectDB = require('./config/db');
connectDB();

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static assets in production, must be at this location of this file
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
}

// HTTP request logger
app.use(morgan('tiny'))
app.use('/api',routes)

app.listen(PORT, console.log(`Server has started at port ${PORT}`))