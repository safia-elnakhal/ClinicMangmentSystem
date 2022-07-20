import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import convertString from '../utilities/convertString'
import { Employee, IEmployee } from '../models/employeeModel'

import EmailClient from '../utilities/sendEmail'

const emailNotifier = new EmailClient()
async function notifyUser(userInfo: any): Promise<boolean> {
    const msgState = await emailNotifier.sendMessage(
        'employee_creation',
        userInfo.name,
        userInfo.email
    )

    return msgState
}

const saltRounds = 10

// Get All Employees
export const getAllEmployees = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const data: IEmployee[] = await Employee.find({})
        response.status(200).send(data)
    } catch (error) {
        next(error)
    }
}

// export const getAllEmployees = async (
//     request: Request,
//     response: Response,
//     next: NextFunction
// ) => {
//     Employee.find({})
//         .then((data: any) => {
//             response.status(200).json(data)
//         })
//         .catch((error: Error) => {
//             next(error)
//         })
// }

// Get Employee By ID
export const getEmployeeByID = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const data: IEmployee | null = await Employee.findOne({
            _id: request.params.id,
        })

        if (!data) throw new Error('Employee not found')

        response.status(200).send(data)
    } catch (error) {
        next(error)
    }
}

// export const getEmployeeByID = (
//     request: Request,
//     response: Response,
//     next: NextFunction
// ) => {
//     Employee.findOne({ _id: request.params.id })
//         .then((data: any) => {
//             if (data == null) next(new Error(' Employee not found'))
//             response.status(200).json(data)
//         })
//         .catch((error: any) => {
//             next(error)
//         })
// }

// Create Employee
export const createEmployee = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const object = new Employee({
            name: request.body.name,
            age: request.body.age,
            email: request.body.email,
            password: bcrypt.hashSync(request.body.password, saltRounds),
            typeofEmployee: request.body.typeofEmployee,
            role: request.body.role,
        })
        const data = await object.save()

        const isEmailSentToUser = await notifyUser(data)

        response.status(201).json({ createdEmployee: data, isEmailSentToUser })
    } catch (error) {
        next(error)
    }
}

// Update Employee By ID
export const updateEmployee = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const data = await Employee.updateOne(
            { _id: convertString.toObjectId(request.params.id) },
            { $set: request.body }
        )
        console.log(data)

        if (!data.acknowledged)
            throw new Error('entered data not follow schema')
        if (data.matchedCount < 1) throw new Error('Employee not found')
        if (data.modifiedCount < 1)
            throw new Error('no update happened to Employee')

        response.status(200).json({ message: 'modified Employee' })
    } catch (error) {
        next(error)
    }
}
// export const updateEmployee = (
//     request: Request,
//     response: Response,
//     next: NextFunction
// ) => {
//     // console.log(request.body.id);
//     Employee.findById(request.body.id)
//         .then((data: any) => {
//             // eslint-disable-next-line no-restricted-syntax, guard-for-in
//             for (const key in request.body) {
//                 data[key] = request.body[key]
//             }
//             data.save()
//             response.status(200).json({ data: 'updated' })
//         })
//         .catch((error: Error) => {
//             next(error)
//         })
// }

// Delete Employee By ID
export const deleteEmployee = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const data = await Employee.deleteOne({
            _id: convertString.toObjectId(request.params.id),
        })
        if (data.deletedCount < 1) throw new Error('Employee not found')
        response.status(200).json({ message: 'deleted Employee' })
    } catch (error) {
        next(error)
    }
}
// export const deleteEmployee = (
//     request: Request,
//     response: Response,
//     next: NextFunction
// ) => {
//     Employee.deleteOne({ _id: request.params.id })
//         .then((data: any) => {
//             if (!data) {
//                 next(new Error(' Employee not found'))
//             } else {
//                 response.status(200).json({ data: 'deleted' })
//             }
//         })
//         .catch((error: Error) => {
//             next(error)
//         })
// }
