import { Request, Response, NextFunction } from 'express'

import convertString from '../utilities/convertString'
import { Appointment, IAppointment } from '../models/appointmentModel'
import { Doctor } from '../models/doctorModel'

// Get all Appointments
export const getAllAppointments = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        let sortType = request.query.sorting
        let sort: {} = {}

        if (sortType === 'MostRecent') {
            sort = { date: -1 }
        }

        const data: IAppointment[] = await Appointment.find({})
            .populate({ path: 'patientId' })
            .populate({ path: 'doctorId' })
            .sort(sort)
        response.status(200).send(data)
    } catch (error) {
        next(error)
    }
}

// Get Appointment ByID
export const getAppointmentById = async (
    request: Request,
    response: Response,
    next: NextFunction
    // eslint-disable-next-line consistent-return
) => {
    try {
        const data: IAppointment | null = await Appointment.findOne({
            _id: request.params.id,
        })
            .populate({ path: 'patientId' })
            .populate({ path: 'doctorId' })

        if (data) {
            return response.status(200).send(data)
        }
        next(new Error(' Appointment not found'))
    } catch (error) {
        next(error)
    }
}

// Create Appointment
export const createAppointment = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        // const doctorAppointments=Doctor.un
        const data: IAppointment = request.body
        console.log(data)
        // if(doctorAppointments.includes(request.body.date))
        //  throw new Error('This Appointement is not avalilable')
        await Doctor.updateOne(
            {
                _id: request.body.doctorId,
            },
            {
                $addToSet: {
                    ' unavailableAppointments': request.body.date,
                },
            }
        )
        // await Doctor.save()
        const object = await Appointment.create(data)
        const createdAppointment = await object.save()
        response.status(201).json(createdAppointment)
    } catch (error) {
        next(error)
    }
}

export const addAppointmentToDoctor = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const data: IAppointment = request.body
        console.log(data)
        // await Doctor.updateOne(
        //     {
        //         _id: request.body.doctorId,
        //     },
        //     {
        //         $addToSet: {
        //             ' unavailableAppointments': request.body.date,
        //         },
        //     }
        // )
        const object = new Appointment(data)
        await object.save()
        response.status(201).json(object)
    } catch (error) {
        next(error)
    }
}
// Update Appointment
export const updateAppointment = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const data = await Appointment.updateOne(
            { _id: convertString.toObjectId(request.body.id) },
            { $set: request.body }
        )

        if (!data.acknowledged) {
            throw new Error('entered data not follow schema')
        }
        if (data.matchedCount < 1) throw new Error('Appointment not found')
        if (data.modifiedCount < 1)
            throw new Error('no update happened to Appointment')

        response.status(200).json({ message: 'Appointment updated' })
    } catch (error) {
        next(error)
    }
}

// delete Appointment BY ID
export const deleteAppointmentById = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const data = await Appointment.deleteOne({
            _id: request.body.id,
        })
        if (data.deletedCount < 1) throw new Error('Appointment  not found')
        response.status(200).json({ message: 'Appointment deleted' })
    } catch (error) {
        next(error)
    }
}
