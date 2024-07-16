require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use('/api', routes);

mongoose.connect(`${process.env.MONGODB_METHOD}://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_SERVER_URI}/${process.env.MONGODB_DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Database connection error:', err);
});

module.exports = app;
