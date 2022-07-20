import { Request, Response, NextFunction } from 'express'
// require("../models/patientModel");
// let Patient = mongoose.model("Patient");

import { Patient, IPatient } from '../models/patientModel'

const mongoose = require('mongoose')

// Get All patient
export const getAllPatients = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data: IPatient[] = await Patient.find({}).populate({ path: 'reports.doctorId' }).populate({ path: 'reports.appointmentId' }).populate({ path: 'reports.invoiceId' })
        res.status(200).send(data)
    } catch (error) {
        next(error)
    }
}

// // Get All patient
// export const getAllPatients = (request: Request, response: Response, next: NextFunction) => {
//     Patient.find({})
//         .then((data: IPatient[]) => {
//             response.status(200).json(data);
//         })
//         .catch((error) => {
//             next(error);
//         });
// };

// Get patient ByID
export const getPatientsById = async (
    req: Request,
    res: Response,
    next: NextFunction
    // eslint-disable-next-line consistent-return
) => {
    try {
        const data: IPatient | null = await Patient.findOne({
            _id: req.params.id,
        }).populate({ path: 'reports.doctorId' }).populate({ path: 'reports.appointmentId' }).populate({ path: 'reports.invoiceId' })

        if (data) {
            return res.status(200).send(data)
        }
        next(new Error(' patient not found'))
    } catch (error) {
        next(error)
    }
}

// // Get Patient By ID
// export const getPatientsById = (request: Request, response: Response, next: NextFunction) => {
//     Patient.findOne({ _id: request.params.id })
//         .then((data: IPatient | null) => {
//             if (data) {
//                 response.status(200).json(data);

//             } else {
//                 next(new Error(" patient not found"));
//             }
//         })
//         .catch((error: any) => {
//             next(error);
//         });
// };

// Create patient
export const createPatient = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data: IPatient = req.body

        const object = await Patient.create(data)

        res.status(201).json(object)
    } catch (error) {
        next(error)
    }
}

// Create patient
// export const createPatient = (request: Request, response: Response, next: NextFunction) => {

//     let object = new Patient({
//         name: request.body.name,
//         age: request.body.age,
//         email: request.body.email,
//         password: request.body.password,
//         gender: request.body.gender,
//         historyOfDisease: request.body.historyOfDisease,
//         InsuranceCompany: request.body.InsuranceCompany,
//         reports: request.body.reports
//     });

//     object.save()

//         .then((data) => {
//             response.status(201).json({ data: "added" });
//         })
//         .catch((error) => next(error));
// };

// UpdatePatient
export const updatePatient = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data: IPatient | null = await Patient.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(req.body.id) },
            { $set: req.body }
        )

        if (!data) {
            throw new Error('patient not found')
        }

        res.status(200).json({ message: 'modified patient' })
    } catch (error) {
        next(error)
    }
}

// Update patient By ID
// export const updatePatient = (request: Request, response: Response, next: NextFunction) => {
//     Patient.findById({ _id: request.body.id })
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

// delete Patient
export const deletePatientById = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const data = await Patient.deleteOne({
            _id: mongoose.Types.ObjectId(request.body.id),
        })
        if (data.deletedCount < 1) throw new Error('patient  not found')
        response.status(200).json({ message: 'patient deleted' })
    } catch (error) {
        next(error)
    }
}

// Delete Admin By ID
// export const deletePatientById = (request: Request, response: Response, next: NextFunction) => {
//     Patient.deleteOne({ _id: request.params.id })
//         .then((data: any) => {
//             if (!data) {
//                 next(new Error(" patinet not found"));
//             } else {
//                 response.status(200).json({ data: "deleted" });
//             }
//         })
//         .catch((error: any) => {
//             next(error);
//         });
// };
