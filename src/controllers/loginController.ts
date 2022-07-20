/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
import bcrypt from 'bcrypt'
import { Request, Response, NextFunction } from 'express'

import { Employee } from '../models/employeeModel'
import { Doctor } from '../models/doctorModel'
import { Patient } from '../models/patientModel'

// require('../models/employeeModel')
// require('../models/doctorModel')
// require('../models/patientModel')

// const Patient = mongoose.model('Patient')
// const Doctor = mongoose.model('Doctor')
// const Employee = mongoose.model('Employee')
const jwt = require('jsonwebtoken')

export const loginPatient = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    Patient.findOne({
        email: request.body.email,
        password: request.body.password,
    })

        .then((data: any) => {
            console.log(data)
            if (!data) {
                const error: any = new Error('email or password incorrect')
                error.status = 401
                throw error
            } else {
                bcrypt
                    .compare(request.body.password, data.password)
                    .then(() => {
                        const token: any = jwt.sign(
                            {
                                id: data._id,
                                role: 'Patient',
                            },
                            process.env.secret,
                            { expiresIn: '1h' }
                        )
                        response.status(200).json({ token, message: 'login' })
                    })
            }
        })
        .catch((error: Error) => next(error))
}

export const loginDoctor = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    Doctor.findOne({
        email: request.body.email,
        password: request.body.password,
    })

        .then((data: any) => {
            console.log(data)
            if (!data) {
                const error: any = new Error('email or password incorrect')
                error.status = 401
                throw error
            } else {
                bcrypt
                    .compare(request.body.password, data.password)
                    .then(() => {
                        const token: any = jwt.sign(
                            {
                                id: data._id,
                                role: 'Doctor',
                            },
                            process.env.secret,
                            { expiresIn: '1h' }
                        )
                        response.status(200).json({ token, message: 'login' })
                    })
            }
        })
        .catch((error: Error) => next(error))
}

export const loginEmployee = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    Employee.findOne(
        {
            email: request.body.email,
            password: request.body.password,
            // role: request.body.role,
        },
        { role: 1 }
    )
        .then((data: any) => {
            if (!data) {
                const error: any = new Error('email or password incorrect')
                error.status = 401
                throw error
            } else if (data.role === 'admin') {
                const token: any = jwt.sign(
                    {
                        id: data._id,
                        role: 'admin',
                    },
                    process.env.secret,
                    { expiresIn: '1h' }
                )
                response.status(200).json({ token, message: 'login' })
            } else if (data.role === 'employee') {
                const token: any = jwt.sign(
                    {
                        id: data._id,
                        role: 'employee',
                    },
                    process.env.secret,
                    { expiresIn: '1h' }
                )
                response.status(200).json({ token, message: 'login' })
            }
        })
        .catch((error: Error) => next(error))
}
