import { Request, Response, NextFunction } from 'express'

import convertString from '../utilities/convertString'
import { Prescription, IPrescription } from '../models/prescriptionModel'
import { Patient as patientModel } from '../models/patientModel'
import { Doctor as doctorModel } from '../models/doctorModel'
import { Medicine as medicineModel } from '../models/medicineModel'

export const getAllPrescriptions = async (
    req: Request,
    res: Response,
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

        res.status(200).send(data)
    } catch (error) {
        next(error)
    }
}

export const getPrescriptionById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data: IPrescription | null = await Prescription.findOne({
            _id: req.params.id,
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

        res.status(200).send(data)
    } catch (error) {
        next(error)
    }
}

export const createPrescription = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const isDoctorValid = await doctorModel.exists({
            _id: req.body.doctorId,
        })
        // eslint-disable-next-line quotes
        if (!isDoctorValid) throw new Error(`doctorId isn't valid`)

        const isPatientValid = await patientModel.exists({
            _id: req.body.patientId,
        })
        // eslint-disable-next-line quotes
        if (!isPatientValid) throw new Error(`patientId isn't valid`)

        const isMedicineValid = await medicineModel.exists({
            _id: req.body.medicineId,
        })
        // eslint-disable-next-line quotes
        if (!isMedicineValid) throw new Error(`medicineId isn't valid`)

        const prescriptionObject = new Prescription({ ...req.body })
        const data = await prescriptionObject.save()
        res.status(201).json(data)
    } catch (error) {
        next(error)
    }
}

export const updatePrescription = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (req.body.doctorId) {
            const isDoctorValid = await doctorModel.exists({
                _id: req.body.doctorId,
            })
            // eslint-disable-next-line quotes
            if (!isDoctorValid) throw new Error(`doctorId isn't valid`)
        }

        if (req.body.patientId) {
            const isPatientValid = await patientModel.exists({
                _id: req.body.patientId,
            })
            // eslint-disable-next-line quotes
            if (!isPatientValid) throw new Error(`patientId isn't valid`)
        }

        if (req.body.medicineId) {
            const isMedicineValid = await medicineModel.exists({
                _id: req.body.medicineId,
            })
            // eslint-disable-next-line quotes
            if (!isMedicineValid) throw new Error(`medicineId isn't valid`)
        }

        const data = await Prescription.updateOne(
            { _id: convertString.toObjectId(req.params.id) },
            { $set: req.body }
        )
        // console.log(data)

        // if (!data) throw new Error('prescription not found')

        if (data.matchedCount < 1) throw new Error('prescription not found')
        if (data.modifiedCount < 1)
            throw new Error('no update happened to prescription')

        res.status(200).json({ message: 'modified prescription' })
    } catch (error) {
        next(error)
    }
}

export const deletePrescriptionById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await Prescription.deleteOne({
            _id: convertString.toObjectId(req.params.id),
        })
        if (data.deletedCount < 1) throw new Error('prescription not found')
        res.status(200).json({ message: 'deleted prescription' })
    } catch (error) {
        next(error)
    }
}
