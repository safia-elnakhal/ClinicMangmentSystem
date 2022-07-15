import { Schema, Types, model } from 'mongoose';
import { Request, Response, NextFunction } from 'express';



const mongoose = require("mongoose");
require("../models/patientModel.js");

let Patient = mongoose.model("patient");

// Get All patient
module.exports.getAllPatients = (request: Request, response: Response, next: NextFunction) => {
    Patient.find({})
        .then((data: []) => {
            response.status(200).json(data);
        })
        .catch((error) => {
            next(error);
        });
};

// Get Patient By ID
module.exports.getPatientByID = (request: Request, response: Response, next: NextFunction) => {
    let id: Types.ObjectId = request.params.id
    Patient.findOne({ _id: id })
        .then((data: {}) => {
            if (data == null) next(new Error(" patient not found"));
            response.status(200).json(data);
        })
        .catch((error) => {
            next(error);
        });
};

// Create patient
module.exports.createPatient = (request: Request, response: Response, next: NextFunction) => {

    enum Gender {
        male = 'male',
        female = 'female',
    }

    let name: string = request.body.name;
    let age: number = request.body.age;
    let email: string = request.body.email;
    let password: string = request.body.password
    let gender: Gender = request.body.gender
    let historyOfDisease: string = request.body.historyOfDisease;
    let InsuranceCompany: string = request.body.InsuranceCompany;
    let reports: {
        doctorId: Types.ObjectId;
        invoiceId: Types.ObjectId;
        appointmentId: Types.ObjectId
    }[] = request.body.reports

    let object = new Patient({
        name: name,
        age: age,
        email: email,
        password: password,
        gender: gender,
        historyOfDisease: historyOfDisease,
        InsuranceCompany: InsuranceCompany,
        reports: reports
    });
    object
        .save()
        .then((data) => {
            response.status(201).json({ data: "added" });
        })
        .catch((error) => next(error));
};

// // Update patient By ID
// module.exports.updatePatient = (request: Request, response: Response, next: NextFunction) => {
//     let id: Types.ObjectId = request.body.id
//     Patient.findById( {_id:id})
//         .then((data) => {
//             for (const key in request.body) {
//                 data[key] = request.body[key];

//             }


//             data.save();
//             response.status(200).json({ data: "updated" });
//         })
//         .catch((error) => {
//             next(error);
//         });
// };

// Delete Admin By ID
module.exports.deletePatient = (request: Request, response: Response, next: NextFunction) => {
    let id: Types.ObjectId = request.params.id
    Patient.deleteOne({ _id: id })
        .then((data) => {
            if (!data) {
                next(new Error(" patinet not found"));
            } else {
                response.status(200).json({ data: "deleted" });
            }
        })
        .catch((error) => {
            next(error);
        });
};
