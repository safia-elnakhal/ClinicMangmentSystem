var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Appointment = new Schema({
  PatientId: {
    type: Patient,
    required: true
  },
  doctorName: {
    type: Doctor,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: Date,
    required: true
  },
  reasonOfVisit: {
    type: String,
    required: true
  }
});