import { Request, Response, NextFunction } from 'express'

import convertString from '../utilities/convertString'
import { Invoice, IInvoice } from '../models/invoiceModel'
import { Patient as patientModel } from '../models/patientModel'
import { Doctor as doctorModel } from '../models/doctorModel'

// get all Invoice
export const getAllInvoices = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const data: IInvoice[] = await Invoice.find({})
            .populate({
                path: 'patientId',
                select: { name: 1, email: 1 },
            })
            .populate({
                path: 'doctorId',
                select: { name: 1, email: 1 },
            })

        response.status(200).send(data)
    } catch (error) {
        next(error)
    }
}

// get Invoice by Id
export const getInvoiceById = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const data: IInvoice | null = await Invoice.findOne({
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

        if (!data) throw new Error('invoice not found')

        response.status(200).send(data)
    } catch (error) {
        next(error)
    }
}

// create Invoice
export const createInvoice = async (
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

        const invoiceObject = new Invoice({ ...request.body })
        const data = await invoiceObject.save()
        response.status(201).json(data)
    } catch (error) {
        next(error)
    }
}

// update Invoice
export const updateInvoice = async (
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

        const data = await Invoice.updateOne(
            { _id: convertString.toObjectId(request.params.id) },
            { $set: request.body }
        )
        console.log(data)

        // if (!data) throw new Error('invoice not found')

        if (data.matchedCount < 1) throw new Error('invoice not found')
        if (data.modifiedCount < 1)
            throw new Error('no update happened to invoice')

        response.status(200).json({ message: 'modified invoice' })
    } catch (error) {
        next(error)
    }
}

// delete Invoice by Id
export const deleteInvoiceById = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const data = await Invoice.deleteOne({
            _id: convertString.toObjectId(request.params.id),
        })
        if (data.deletedCount < 1) throw new Error('invoice not found')
        response.status(200).json({ message: 'deleted invoice' })
    } catch (error) {
        next(error)
    }
}
