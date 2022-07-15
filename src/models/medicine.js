var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Medicine = new Schema({
  name: {
    type: String,
    required: true
  },
  takingInstructions: {
    type: String
  },
  time: {
    type: Date
  },
  description: {
    type: String
  }
});