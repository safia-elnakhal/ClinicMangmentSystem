<<<<<<< HEAD
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
=======
"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var employeeSchema = new mongoose_1.Schema({
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
    }
});
module.exports = (0, mongoose_1.model)("Employee", employeeSchema);
>>>>>>> main
