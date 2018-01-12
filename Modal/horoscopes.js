let mongoose = require('mongoose');

let horoscopesSchema = mongoose.Schema({
  horoscope: {
    type: String,
    required: true
  },
  monthly: {
    type: Object,
  }
});

let Customer = module.exports = mongoose.model('Horoscopes', horoscopesSchema);
