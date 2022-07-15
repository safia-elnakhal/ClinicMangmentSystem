"use strict";
exports.__esModule = true;
exports.deleteEmployee = exports.updateEmployee = exports.createEmployee = exports.getEmployeeByID = exports.getAllEmployees = void 0;
var mongoose = require("mongoose");
require("../models/employee");
var Employee = mongoose.model("Employee");
// Get All Employees
var getAllEmployees = function (request, response, next) {
    Employee.find({})
        .then(function (data) {
        response.status(200).json(data);
    })["catch"](function (error) {
        next(error);
    });
};
exports.getAllEmployees = getAllEmployees;
// Get Employee By ID
var getEmployeeByID = function (request, response, next) {
    Employee.findOne({ _id: request.params.id })
        .then(function (data) {
        if (data == null)
            next(new Error(" Employee not found"));
        response.status(200).json(data);
    })["catch"](function (error) {
        next(error);
    });
};
exports.getEmployeeByID = getEmployeeByID;
// Create Employee
var createEmployee = function (request, response, next) {
    var object = new Employee({
        name: request.body.name,
        age: request.body.age,
        email: request.body.email,
        password: request.body.password
    });
    object
        .save()
        .then(function (data) {
        response.status(201).json({ data: "added" });
    })["catch"](function (error) { return next(error); });
};
exports.createEmployee = createEmployee;
// Update Employee By ID
var updateEmployee = function (request, response, next) {
    // console.log(request.body.id);
    Employee.findById(request.body.id)
        .then(function (data) {
        for (var key in request.body) {
            data[key] = request.body[key];
        }
        data.save();
        response.status(200).json({ data: "updated" });
    })["catch"](function (error) {
        next(error);
    });
};
exports.updateEmployee = updateEmployee;
// Delete Employee By ID
var deleteEmployee = function (request, response, next) {
    Employee.deleteOne({ _id: request.params.id })
        .then(function (data) {
        if (!data) {
            next(new Error(" Employee not found"));
        }
        else {
            response.status(200).json({ data: "deleted" });
        }
    })["catch"](function (error) {
        next(error);
    });
};
exports.deleteEmployee = deleteEmployee;
