const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017')
.then(() => {
  console.log('Connected to the database!');
})
.catch((err) => {
  console.error('Error in connection:', err.message);
});

module.exports = mongoose;
