// import mongoose from 'mongoose'

import { Request, Response, NextFunction } from 'express'

import { Appointment, IAppointment } from '../models/appointmentModel'

// Get all Appointments
export const getAllAppointments = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const data: IAppointment[] = await Appointment.find({})
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
        const data: IAppointment = request.body

        const object = await Appointment.create(data)

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
        const data: IAppointment | null = await Appointment.findOneAndUpdate(
            { _id: request.body.id },
            { $set: request.body }
        )

        if (!data) {
            throw new Error('Appointment not found')
        }

        response.status(200).json({ message: 'Appointment updated' })
    } catch (error) {
        next(error)
    }
}

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
