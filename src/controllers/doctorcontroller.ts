import { Request, Response, NextFunction } from 'express'
import convertString from '../utilities/convertString'
import { Doctor, IDoctor } from '../models/doctorModel'

// Get All Doctors
export const getAllDoctor = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data: IDoctor[] = await Doctor.find({})
        res.status(200).send(data)
    } catch (error) {
        next(error)
    }
}

// export const getAllDoctor = (request: any, response: any, next: any) => {
//     Doctor.find({})
//         .then((data: any) => {
//             response.status(200).json(data)
//         })
//         .catch((error: any) => {
//             next(error)
//         })
// }

// Get Doctor By Id

export const getDoctorByID = async (
    req: Request,
    res: Response,
    next: NextFunction
    // eslint-disable-next-line consistent-return
) => {
    try {
        const data: IDoctor | null = await Doctor.findOne({
            _id: req.params.id,
        })

        if (data) {
            return res.status(200).send(data)
        }
        next(new Error(' Doctor not found'))
    } catch (error) {
        next(error)
    }
}

// export const getDoctorByID = (request: any, response: any, next: any) => {
//     Doctor.findOne({ _id: request.params.id })
//         .then((data: any) => {
//             if (data == null) next(new Error(' Doctor not found'))
//             response.status(200).json(data)
//         })
//         .catch((error: any) => {
//             next(error)
//         })
// }

// Create Doctors

export const createDoctor = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data: IDoctor = req.body

        const object = await Doctor.create(data)

        res.status(201).json(object)
    } catch (error) {
        next(error)
    }
}

// export const createDoctor = (request: any, response: any, next: any) => {
//     const object = new Doctor({
//         name: request.body.name,
//         age: request.body.age,
//         email: request.body.email,
//         password: request.body.password,
//     })
//     object
//         .save()
//         .then(() => {
//             response.status(201).json({ data: 'added' })
//         })
//         .catch((error: any) => next(error))
// }

// Update Doctor By Id

export const updateDoctor = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const data = await Doctor.updateOne(
            { _id: convertString.toObjectId(request.params.id) },
            { $set: request.body }
        )
        console.log(data)

        if (!data.acknowledged)
            throw new Error('entered data not follow schema')
        if (data.matchedCount < 1) throw new Error('Doctor not found')
        if (data.modifiedCount < 1)
            throw new Error('no update happened to Doctor')

        response.status(200).json({ message: 'modified Doctor' })
    } catch (error) {
        next(error)
    }
}

// Delete Doctor By Id
export const deleteDoctor = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const data = await Doctor.deleteOne({
            _id: convertString.toObjectId(request.body.id),
        })
        if (data.deletedCount === 0) throw new Error('Doctor  not found')
        response.status(200).json({ message: 'Doctor deleted' })
    } catch (error) {
        next(error)
    }
}

// export const deleteDoctor = (request: any, response: any, next: any) => {
//     Doctor.deleteOne({ _id: request.params.id })
//         .then((data: any) => {
//             if (!data) {
//                 next(new Error(' Employee not found'))
//             } else {
//                 response.status(200).json({ data: 'deleted' })
//             }
//         })
//         .catch((error: any) => {
//             next(error)
//         })
// }
