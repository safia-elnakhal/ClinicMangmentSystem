var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Clinic = new Schema({
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
  name: {
    type: String,
    required: true
  },
  doctorId: {
    type: Doctor,
    required: true
  },
  patientId: {
    type: Patient,
    required: true
  },
  employeeId: {
    type: Employee,
    required: true
  },
  contactNumberPhone: {
    type: String,
    required: true
  }
});
