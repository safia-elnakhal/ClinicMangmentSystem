"use strict";
exports.__esModule = true;
var express = require("express");
var Controller = require("../controller/employeeController");
var router = express.Router();
router
    .route("/employee")
    .get(Controller.getAllEmployees)
    .post(Controller.createEmployee)
    .put(Controller.updateEmployee);
router
    .route("/employee/:id")
    .get(Controller.getEmployeeByID)["delete"](Controller.deleteEmployee);
module.exports = router;
