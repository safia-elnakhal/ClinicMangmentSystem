import { Request, Response, NextFunction } from 'express'
import convertString from '../utilities/convertString'

import { Prescription, IPrescription } from '../models/prescriptionModel'
import { Patient as patientModel } from '../models/patientModel'
import { Doctor as doctorModel } from '../models/doctorModel'
import { Medicine as medicineModel } from '../models/medicineModel'

// get all prescriptions
export const getAllPrescriptions = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const data: IPrescription[] = await Prescription.find({})
            .populate({
                path: 'patientId',
                select: { name: 1, email: 1 },
            })
            .populate({
                path: 'doctorId',
                select: { name: 1, email: 1 },
            })
            .populate({
                path: 'medicineId',
                select: { name: 1, description: 1, takingInstructions: 1 },
            })

        response.status(200).send(data)
    } catch (error) {
        next(error)
    }
}

// get  prescriptions by ID
export const getPrescriptionById = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const data: IPrescription | null = await Prescription.findOne({
            _id: request.params.id,
        })
            .populate({
                path: 'patientId',
                select: { name: 1, email: 1 },
            })
            .populate({
                path: 'doctorId',
                select: { name: 1, email: 1 },
            })
            .populate({
                path: 'medicineId',
                select: { name: 1, description: 1, takingInstructions: 1 },
            })

        if (!data) throw new Error('prescription not found')

        response.status(200).send(data)
    } catch (error) {
        next(error)
    }
}

// create prescriptions

export const createPrescription = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const isDoctorValid = await doctorModel.exists({
            _id: request.body.doctorId,
        })
        // eslint-disable-next-line quotes
        if (!isDoctorValid) throw new Error(`doctorId isn't valid`)

        const isPatientValid = await patientModel.exists({
            _id: request.body.patientId,
        })
        // eslint-disable-next-line quotes
        if (!isPatientValid) throw new Error(`patientId isn't valid`)

        const isMedicineValid = await medicineModel.exists({
            _id: request.body.medicineId,
        })
        // eslint-disable-next-line quotes
        if (!isMedicineValid) throw new Error(`medicineId isn't valid`)

        const prescriptionObject = new Prescription({ ...request.body })
        const data = await prescriptionObject.save()
        response.status(201).json(data)
    } catch (error) {
        next(error)
    }
}

// update prescriptions
export const updatePrescription = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        if (request.body.doctorId) {
            const isDoctorValid = await doctorModel.exists({
                _id: request.body.doctorId,
            })
            // eslint-disable-next-line quotes
            if (!isDoctorValid) throw new Error(`doctorId isn't valid`)
        }

        if (request.body.patientId) {
            const isPatientValid = await patientModel.exists({
                _id: request.body.patientId,
            })
            // eslint-disable-next-line quotes
            if (!isPatientValid) throw new Error(`patientId isn't valid`)
        }

        if (request.body.medicineId) {
            const isMedicineValid = await medicineModel.exists({
                _id: request.body.medicineId,
            })
            // eslint-disable-next-line quotes
            if (!isMedicineValid) throw new Error(`medicineId isn't valid`)
        }

        const data = await Prescription.updateOne(
            { _id: convertString.toObjectId(request.params.id) },
            { $set: request.body }
        )
        // console.log(data)

        // if (!data) throw new Error('prescription not found')

        if (data.matchedCount < 1) throw new Error('prescription not found')
        if (data.modifiedCount < 1)
            throw new Error('no update happened to prescription')

        response.status(200).json({ message: 'modified prescription' })
    } catch (error) {
        next(error)
    }
}

// delete prescription by ID
export const deletePrescriptionById = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const data = await Prescription.deleteOne({
            _id: convertString.toObjectId(request.params.id),
        })
        if (data.deletedCount < 1) throw new Error('prescription not found')
        response.status(200).json({ message: 'deleted prescription' })
    } catch (error) {
        next(error)
    }
}
