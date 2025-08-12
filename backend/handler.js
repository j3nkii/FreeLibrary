console.log('Init free library')
require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8000;


app.use(express.json());

// const SAMPLE = require('./routes/SAMPLE.router');
// app.use('/api/SAMPLE', SAMPLE);


const USER_ROUTER = require('./routes/user.router');
app.use('/api/user', USER_ROUTER);


module.exports = app;