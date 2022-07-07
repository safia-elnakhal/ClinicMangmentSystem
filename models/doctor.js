var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Doctor = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  address: {
    city: {
      type: String,
      required: true
    },
    streetName: {
      type: String,
      required: true
    },
    buildingNumber: {
      type: Number,
      required: true
    }
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  Speciality: {
    type: String
  }
});