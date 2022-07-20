import { Request, Response, NextFunction } from 'express'

import convertString from '../utilities/convertString'
import { Medicine, IMedicine } from '../models/medicineModel'

export const getAllMedicines = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data: IMedicine[] = await Medicine.find({})
        res.status(200).send(data)
    } catch (error) {
        next(error)
    }
}

export const getMedicineById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data: IMedicine | null = await Medicine.findOne({
            _id: req.params.id,
        })

        if (!data) throw new Error('medicine not found')

        res.status(200).send(data)
    } catch (error) {
        next(error)
    }
}

export const createMedicine = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const medicineObject = new Medicine({ ...req.body })
        const data = await medicineObject.save()
        res.status(201).json(data)
    } catch (error) {
        next(error)
    }
}

export const updateMedicine = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await Medicine.updateOne(
            { _id: convertString.toObjectId(req.params.id) },
            { $set: req.body }
        )
        console.log(data)

        if (!data.acknowledged)
            throw new Error('entered data not follow schema')
        if (data.matchedCount < 1) throw new Error('medicine not found')
        if (data.modifiedCount < 1)
            throw new Error('no update happened to medicine')

        res.status(200).json({ message: 'modified medicine' })
    } catch (error) {
        next(error)
    }
}

export const deleteMedicineById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await Medicine.deleteOne({
            _id: convertString.toObjectId(req.params.id),
        })
        if (data.deletedCount < 1) throw new Error('medicine not found')
        res.status(200).json({ message: 'deleted medicine' })
    } catch (error) {
        next(error)
    }
}
