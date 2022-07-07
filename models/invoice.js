var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Invoice = new Schema({
  doctorId: {
    type: Doctor,
    required: true
  },
  patientId: {
    type: Patient,
    required: true
  },
  Charge: {
    type: Number,
    required: true
  }
});
