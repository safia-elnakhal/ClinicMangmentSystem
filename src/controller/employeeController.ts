const mongoose = require("mongoose");
require("../models/employee");

let Employee = mongoose.model("Employee");

// Get All Employees
module.exports.getAllEmployees = (request: any, response: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any): void; new(): any; }; }; }, next: (arg0: any) => void) => {
    Employee.find({})
        .then((data: any) => {
            response.status(200).json(data);
        })
        .catch((error:any) => {
            next(error);
        });
};

// Get Employee By ID
module.exports.getEmployeeByID = (request: { params: { id: any; }; }, response: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any): void; new(): any; }; }; }, next: (arg0: Error) => void) => {
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
module.exports.createEmployee = (request: { body: { fullName: any; age: any; email: any; password: any; phone: any; national_id: any; image: any; }; }, response: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { data: string; }): void; new(): any; }; }; }, next: (arg0: any) => any) => {
    let object = new Employee({
        fullName: request.body.fullName,
        age: request.body.age,
        email: request.body.email,
        password: request.body.password,
        phone: request.body.phone,
        national_id: request.body.national_id,
        image: request.body.image,
    });
    object
        .save()
        .then((data: any) => {
            response.status(201).json({ data: "added" });
        })
        .catch((error: any) => next(error));
};

// Update Employee By ID
module.exports.updateEmployee = (request: { body: { [x: string]: any; id: any; }; }, response: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { data: string; }): void; new(): any; }; }; }, next: (arg0: any) => void) => {
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
module.exports.deleteEmployee = (request: { params: { id: any; }; }, response: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { data: string; }): void; new(): any; }; }; }, next: (arg0: Error) => void) => {
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
