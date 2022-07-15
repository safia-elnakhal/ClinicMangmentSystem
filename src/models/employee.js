var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Employee = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  typeofEmployee: {
    type: String,
    required: true
  }
});