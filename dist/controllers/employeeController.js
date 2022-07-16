"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.createEmployee = exports.getEmployeeByID = exports.getAllEmployees = void 0;
const mongoose = require("mongoose");
require("../models/employee");
let Employee = mongoose.model("Employee");
// Get All Employees
const getAllEmployees = (request, response, next) => {
    Employee.find({})
        .then((data) => {
        response.status(200).json(data);
    })
        .catch((error) => {
        next(error);
    });
};
exports.getAllEmployees = getAllEmployees;
// Get Employee By ID
const getEmployeeByID = (request, response, next) => {
    Employee.findOne({ _id: request.params.id })
        .then((data) => {
        if (data == null)
            next(new Error(" Employee not found"));
        response.status(200).json(data);
    })
        .catch((error) => {
        next(error);
    });
};
exports.getEmployeeByID = getEmployeeByID;
// Create Employee
const createEmployee = (request, response, next) => {
    let object = new Employee({
        name: request.body.name,
        age: request.body.age,
        email: request.body.email,
        password: request.body.password,
    });
    object
        .save()
        .then((data) => {
        response.status(201).json({ data: "added" });
    })
        .catch((error) => next(error));
};
exports.createEmployee = createEmployee;
// Update Employee By ID
const updateEmployee = (request, response, next) => {
    // console.log(request.body.id);
    Employee.findById(request.body.id)
        .then((data) => {
        for (const key in request.body) {
            data[key] = request.body[key];
        }
        data.save();
        response.status(200).json({ data: "updated" });
    })
        .catch((error) => {
        next(error);
    });
};
exports.updateEmployee = updateEmployee;
// Delete Employee By ID
const deleteEmployee = (request, response, next) => {
    Employee.deleteOne({ _id: request.params.id })
        .then((data) => {
        if (!data) {
            next(new Error(" Employee not found"));
        }
        else {
            response.status(200).json({ data: "deleted" });
        }
    })
        .catch((error) => {
        next(error);
    });
};
exports.deleteEmployee = deleteEmployee;
