import { Request, Response, NextFunction } from 'express'

import convertString from '../utilities/convertString'
import { Medicine, IMedicine } from '../models/medicineModel'

// Get all Medicine
export const getAllMedicines = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const sortType = request.query.sorting
    let sort: {} = {}
    if (sortType === 'ExpiredDateAsc') {
        sort = { expirationDate: 1 }
    } else if (sortType === 'ExpiredDateDsc') {
        sort = { expirationDate: -1 }
    } else if (sortType === 'nameAZ') {
        sort = { name: 1 }
    } else if (sortType === 'nameZA') {
        sort = { name: -1 }
    }
    try {
        const data: IMedicine[] = await Medicine.find({}).sort(sort)
        response.status(200).send(data)
    } catch (error) {
        next(error)
    }
}

// Get  Medicine by ID
export const getMedicineById = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const data: IMedicine | null = await Medicine.findOne({
            _id: request.params.id,
        })

        if (!data) throw new Error('medicine not found')

        response.status(200).send(data)
    } catch (error) {
        next(error)
    }
}

// Create Medicine
export const createMedicine = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const medicineObject = new Medicine({ ...request.body })
        const data = await medicineObject.save()
        response.status(201).json(data)
    } catch (error) {
        next(error)
    }
}

// Update Appointment
export const updateMedicine = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const data = await Medicine.updateOne(
            { _id: convertString.toObjectId(request.params.id) },
            { $set: request.body }
        )
        console.log(data)

        if (!data.acknowledged)
            throw new Error('entered data not follow schema')
        if (data.matchedCount < 1) throw new Error('medicine not found')
        if (data.modifiedCount < 1)
            throw new Error('no update happened to medicine')

        response.status(200).json({ message: 'modified medicine' })
    } catch (error) {
        next(error)
    }
}

// delete Medicine BY ID
export const deleteMedicineById = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const data = await Medicine.deleteOne({
            _id: convertString.toObjectId(request.params.id),
        })
        if (data.deletedCount < 1) throw new Error('medicine not found')
        response.status(200).json({ message: 'deleted medicine' })
    } catch (error) {
        next(error)
    }
}
