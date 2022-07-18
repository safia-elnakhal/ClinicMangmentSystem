"use strict";
exports.__esModule = true;
exports.Patient = void 0;
var mongoose_1 = require("mongoose");
var Gender;
(function (Gender) {
    Gender["male"] = "male";
    Gender["female"] = "female";
})(Gender || (Gender = {}));
var PatientSchema = new mongoose_1.Schema({
    // _id: {
    //     type: Schema.Types.ObjectId,
    // },
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
    gender: { type: String, "enum": Object.values(Gender) },
    InsuranceCompany: {
        type: String,
        required: true
    },
    reports: [{
            doctorId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "doctors",
                required: true
            },
            invoiceId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "invoice",
                required: true
            },
            appointmentId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "appointments",
                required: true
            }
        }]
});
var Patient = (0, mongoose_1.model)('Patient', PatientSchema);
exports.Patient = Patient;
