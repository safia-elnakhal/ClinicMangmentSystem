var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Patient = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  historyOfDisease: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  InsuranceCompany: {
    type: String,
    required: true
  },
  reports: [{
    doctorId: {
      type: Doctor,
      required: true
    },
    invoiceId: {
      type: Invoice,
      required: true
    },
    appointmentId: {
      type: Appointment,
      required: true
    }
  }]
});