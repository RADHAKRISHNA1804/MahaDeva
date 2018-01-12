let mongoose = require('mongoose');

let sudoSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

let Su = module.exports = mongoose.model('Sudos', sudoSchema);
