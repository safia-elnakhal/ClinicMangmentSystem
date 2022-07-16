"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const employeeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    // typeofEmployee: {
    //   enum: [],
    //   required: true,
    // },
});
module.exports = (0, mongoose_1.model)("Employee", employeeSchema);
