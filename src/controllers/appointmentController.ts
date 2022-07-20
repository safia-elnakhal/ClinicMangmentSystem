import { Request, Response, NextFunction } from 'express'

import convertString from '../utilities/convertString'
import { Appointment, IAppointment } from '../models/appointmentModel'
import { Patient as patientModel } from '../models/patientModel'
import { Doctor as doctorModel } from '../models/doctorModel'

import EmailClient from '../utilities/sendEmail'

const emailNotifier = new EmailClient()
async function notifyUsers(
    doctorInfo: any,
    patientInfo: any
): Promise<{ isSentToDoctor: boolean; isSentToPatient: boolean }> {
    const doctorMsgState = await emailNotifier.sendMessage(
        'appointment_creation',
        doctorInfo.name,
        doctorInfo.email
    )
    const patientMsgState = await emailNotifier.sendMessage(
        'appointment_creation',
        patientInfo.name,
        patientInfo.email
    )

    return { isSentToDoctor: doctorMsgState, isSentToPatient: patientMsgState }
}

// Get all Appointments
export const getAllAppointments = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const sortType = request.query.sorting
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
        const doctorInfo = await doctorModel.findById(request.body.doctorId)
        // eslint-disable-next-line quotes
        if (!doctorInfo) throw new Error(`doctorId isn't valid`)

        const patientInfo = await patientModel.findById(request.body.patientId)
        // eslint-disable-next-line quotes
        if (!patientInfo) throw new Error(`patientId isn't valid`)

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
        const sendingStates = await notifyUsers(doctorInfo, patientInfo)

        // response.status(201).json(object)
        response.status(201).json({ createdAppointment: object, sendingStates })
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
