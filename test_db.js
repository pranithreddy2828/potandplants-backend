const mongoose = require('mongoose');
require('dotenv').config();
console.log('Testing connection to:', process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log('Test OK');
    process.exit(0);
  })
  .catch(err => {
    console.error('Test FAILED:', err.message);
    process.exit(1);
  });
