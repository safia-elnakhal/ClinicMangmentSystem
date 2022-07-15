const mongoose = require("mongoose");
require("../models/employee");

let Employee = mongoose.model("Employee");

// Get All Employees
export const getAllEmployees = (request: any, response:  any, next:any) => {
    Employee.find({})
        .then((data: any) => {
            response.status(200).json(data);
        })
        .catch((error:any) => {
            next(error);
        });
};

// Get Employee By ID
export const getEmployeeByID = (request: any, response:  any, next:any) => {
    Employee.findOne({ _id: request.params.id })
        .then((data : any) => {
            if (data == null) next(new Error(" Employee not found"));
            response.status(200).json(data);
        })
        .catch((error: any) => {
            next(error);
        });
};

// Create Employee
export const createEmployee = (request: any, response:  any, next:any) => {
    let object = new Employee({
        name: request.body.name,
        age: request.body.age,
        email: request.body.email,
        password: request.body.password,
    });
    object
        .save()
        .then((data: any) => {
            response.status(201).json({ data: "added" });
        })
        .catch((error: any) => next(error));
};

// Update Employee By ID
export const updateEmployee = (request: any, response:  any, next:any) => {
    // console.log(request.body.id);
    Employee.findById(request.body.id)
        .then((data: { [x: string]: any; save: () => void; }) => {
            for (const key in request.body) {
                data[key] = request.body[key];
            }
            data.save();
            response.status(200).json({ data: "updated" });
        })
        .catch((error: any) => {
            next(error);
        });
};

// Delete Employee By ID
export const deleteEmployee = (request: any, response:  any, next:any) => {
    Employee.deleteOne({ _id: request.params.id })
        .then((data: any) => {
            if (!data) {
                next(new Error(" Employee not found"));
            } else {
                response.status(200).json({ data: "deleted" });
            }
        })
        .catch((error: any) => {
            next(error);
        });
};



