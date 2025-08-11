console.log('Init free library')
require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8000;

// const SAMPLE = require('./routes/SAMPLE.router');
// app.use('/api/SAMPLE', SAMPLE);

app.use(express.json());