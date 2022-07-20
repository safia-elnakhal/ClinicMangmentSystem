import { Request, Response, NextFunction } from 'express'

import convertString from '../utilities/convertString'
import { Invoice, IInvoice } from '../models/invoiceModel'

export const getAllInvoices = async (
    req: Request,
    res: Response,
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

        if (data) {
            res.status(200).send(data)
        }
        throw new Error('invoice not found')
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
        const data: IInvoice = req.body

        const object = await Invoice.create(data)

        res.status(201).json(object)
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
        const data: IInvoice | null = await Invoice.findOneAndUpdate(
            { _id: convertString.toObjectId(req.params.id) },
            { $set: req.body }
        )

        if (!data) {
            throw new Error('invoice not found')
        }

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
        res.status(200).json({ message: 'invoice deleted' })
    } catch (error) {
        next(error)
    }
}
