import { Request, Response, NextFunction } from 'express'

import convertString from '../utilities/convertString'
import { Invoice, IInvoice } from '../models/invoiceModel'
import { Patient as patientModel } from '../models/patientModel'
import { Doctor as doctorModel } from '../models/doctorModel'

export const getAllInvoices = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        let sortType = req.query.sorting
        let sort: {} = {}
        if (sortType === 'HightoLow') {
            sort = { charge: -1 }
        } else if (sortType === 'LowtoHigh') {
            sort = { charge: 1 }
        }
        const data: IInvoice[] = await Invoice.find({}).sort(sort)
            .populate({
                path: 'patientId',
                select: { name: 1, email: 1 },
            })
            .populate({
                path: 'doctorId',
                select: { name: 1, email: 1 },
            }).sort(sort)

        res.status(200).send(data)
    } catch (error) {
        next(error)
    }
}

export const getInvoiceById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data: IInvoice | null = await Invoice.findOne({
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

        if (!data) throw new Error('invoice not found')

        res.status(200).send(data)
    } catch (error) {
        next(error)
    }
}

export const createInvoice = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const isDoctorValid = await doctorModel.findOne({
            _id: req.body.doctorId,
        })
        // eslint-disable-next-line quotes
        if (!isDoctorValid) throw new Error(`doctorId isn't valid`)

        const isPatientValid = await patientModel.findOne({
            _id: req.body.patientId,
        })
        // eslint-disable-next-line quotes
        if (!isPatientValid) throw new Error(`patientId isn't valid`)

        const invoiceObject = new Invoice({ ...req.body })
        const data = await invoiceObject.save()
        res.status(201).json(data)
    } catch (error) {
        next(error)
    }
}

export const updateInvoice = async (
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

        const data = await Invoice.updateOne(
            { _id: convertString.toObjectId(req.params.id) },
            { $set: req.body }
        )
        console.log(data)

        // if (!data) throw new Error('invoice not found')

        if (data.matchedCount < 1) throw new Error('invoice not found')
        if (data.modifiedCount < 1)
            throw new Error('no update happened to invoice')

        res.status(200).json({ message: 'modified invoice' })
    } catch (error) {
        next(error)
    }
}

export const deleteInvoiceById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await Invoice.deleteOne({
            _id: convertString.toObjectId(req.params.id),
        })
        if (data.deletedCount < 1) throw new Error('invoice not found')
        res.status(200).json({ message: 'deleted invoice' })
    } catch (error) {
        next(error)
    }
}
