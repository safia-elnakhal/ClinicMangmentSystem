"use strict";
exports.__esModule = true;
var _a = require("express-validator"), body = _a.body, param = _a.param, query = _a.query;
var express_1 = require("express");
var patientController = require("../controller/patientController");
var routes = (0, express_1.Router)();
routes.route("/patient")
    .get(patientController.getAllPatients)
    .post([
    body("name").isAlpha().withMessage("Patient name should be string")
], patientController.createPatient)
    .put(patientController.updatePatient);
routes.route("/patient/:id")["delete"](patientController.deletePatientById)
    .get(patientController.getPatientsById);
exports["default"] = routes;
