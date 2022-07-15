
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Prescription = new Schema({
  medicineId: {
    type: Medicine,
    required: true
  },
  doctoId: {
    type: String
  },
  patientId: {
    type: String
  },
  Consultation: {
    type: Date
  }
});