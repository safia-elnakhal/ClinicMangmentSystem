import { Request, Response, NextFunction } from 'express'
import convertString from '../utilities/convertString'

import { Patient, IPatient } from '../models/patientModel'

import EmailClient from '../utilities/sendEmail'

const invoiceEmailNotifier = new EmailClient()
async function notifyUser(patientInfo: any): Promise<boolean> {
    const patientMsgState = await invoiceEmailNotifier.sendMessage(
        'user_creation',
        patientInfo.name,
        patientInfo.email
    )

    return patientMsgState
}

// Get All patient

export const getAllPatients = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        let sortType = request.query.sorting
        let filterGender = request.query.gender
        let filtermaxAge = request.query.maxAge
        let filterminAge = request.query.minAge

        let filter: {} = {}
        let sort: {} = {}
        if (sortType === 'nameAZ') {
            sort = { name: 1 }
        } else if (sortType === 'nameZA') {
            sort = { name: -1 }
        } else if (sortType === 'ageAsc') {
            sort = { age: 1 }
        } else if (sortType === 'ageDsc') {
            sort = { age: -1 }
        } else if (filterGender) {
            filter = { gender: filterGender }
        } else if (filtermaxAge) {
            filter = { age: { $lte: filtermaxAge } }
        } else if (filterminAge) {
            filter = { age: { $gte: filterminAge } }
        }


        const data: IPatient[] = await Patient.find(filter)
            .populate({ path: 'reports.doctorId' })
            .populate({ path: 'reports.appointmentId' })
            .populate({ path: 'reports.invoiceId' })
            .sort(sort)
        response.status(200).send(data)
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
    request: Request,
    response: Response,
    next: NextFunction
    // eslint-disable-next-line consistent-return
) => {
    try {
        const data: IPatient | null = await Patient.findOne({
            _id: request.params.id,
        })
            .populate({ path: 'reports.doctorId' })
            .populate({ path: 'reports.appointmentId' })
            .populate({ path: 'reports.invoiceId' })

        if (data) {
            return response.status(200).send(data)
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
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const data: IPatient = request.body

        const object = await Patient.create(data)

        const isEmailSentToUser = await notifyUser(data)
        response.status(201).json({ createdPatient: object, isEmailSentToUser })
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
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const data = await Patient.updateOne(
            { _id: convertString.toObjectId(request.body.id) },
            { $set: request.body }
        )

        if (!data.acknowledged) {
            throw new Error('entered data not follow schema')
        }
        if (data.matchedCount < 1) throw new Error('Patient not found')
        if (data.modifiedCount < 1)
            throw new Error('no update happened to Patient')

        response.status(200).json({ message: 'modified patient' })
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
            _id: convertString.toObjectId(request.body.id),
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
