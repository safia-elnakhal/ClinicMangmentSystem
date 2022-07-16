"use strict";
exports.__esModule = true;
var express_1 = require("express");
var Controller = require("../controller/employeeController");
var routes = (0, express_1.Router)();
routes
    .route("/employee")
    .get(Controller.getAllEmployees)
    .post(Controller.createEmployee)
    .put(Controller.updateEmployee);
routes
    .route("/employee/:id")
    .get(Controller.getEmployeeByID)["delete"](Controller.deleteEmployee);
exports["default"] = routes;
