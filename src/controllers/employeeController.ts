const mongoose = require('mongoose')
require('../models/employee')
import { ObjectID } from 'bson'
import { Request, Response, NextFunction } from 'express'

let Employee = mongoose.model('Employee')

// Get All Employees
export const getAllEmployees = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    Employee.find({})
        .then((data: String) => {
            response.status(200).json(data)
        })
        .catch((error: Error) => {
            next(error)
        })
}

// Get Employee By ID
export const getEmployeeByID = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    Employee.findOne({ _id: request.params.id })
        .then((data: string) => {
            if (data == null) next(new Error(' Employee not found'))
            response.status(200).json(data)
        })
        .catch((error: any) => {
            next(error)
        })
}

// Create Employee
export const createEmployee = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    let object = new Employee({
        name: request.body.name,
        age: request.body.age,
        email: request.body.email,
        password: request.body.password,
    })
    object
        .save()
        .then((data: String) => {
            response.status(201).json({ data: 'added' })
        })
        .catch((error: Error) => next(error))
}

// Update Employee By ID
export const updateEmployee = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    // console.log(request.body.id);
    Employee.findById(request.body.id)
        .then((data: { [x: string]: any; save: () => void }) => {
            for (const key in request.body) {
                data[key] = request.body[key]
            }
            data.save()
            response.status(200).json({ data: 'updated' })
        })
        .catch((error: Error) => {
            next(error)
        })
}

// Delete Employee By ID
export const deleteEmployee = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    Employee.deleteOne({ _id: request.params.id })
        .then((data: ObjectID) => {
            if (!data) {
                next(new Error(' Employee not found'))
            } else {
                response.status(200).json({ data: 'deleted' })
            }
        })
        .catch((error: Error) => {
            next(error)
        })
}
