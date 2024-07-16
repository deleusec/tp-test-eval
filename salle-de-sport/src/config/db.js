const mongoose = require('mongoose');

const mongoDBURI = `${process.env.MONGODB_METHOD}://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_SERVER_URI}/${process.env.MONGODB_DATABASE}`;

mongoose.connect(mongoDBURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connection to MongoDB established successfully');
});

mongoose.connection.on('error', (err) => {
  console.error(`Error connecting to MongoDB: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  console.warn('Disconnected from MongoDB');
});

module.exports = mongoose;
