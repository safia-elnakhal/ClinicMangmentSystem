/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable guard-for-in */
/* eslint-disable no-unused-vars */
import mongoose from 'mongoose'
import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'

require('../models/employeeModel')

const saltRounds = 10

const Employee = mongoose.model('Employee')

// Get All Employees
export const getAllEmployees = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    Employee.find({})
        .then((data: any) => {
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
        .then((data: any) => {
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
    const object = new Employee({
        name: request.body.name,
        age: request.body.age,
        email: request.body.email,
        password: bcrypt.hashSync(request.body.password, saltRounds),
        typeofEmployee: request.body.typeofEmployee,
        role: request.body.role,
    })
    object
        .save()
        .then((data: any) => {
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
        .then((data: any) => {
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
        .then((data: any) => {
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
