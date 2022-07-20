import { Request, Response, NextFunction } from 'express'
import { Types } from 'mongoose'

import { Clinic, IClinic } from '../models/clinicModel'
import { Employee, IEmployee } from '../models/employeeModel'

// create Clinic
export const createClinic = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        console.log(request.body.employeeId)
        const employeeArray: Array<Types.ObjectId> = request.body.employeeId
        employeeArray.forEach(async (employeeId) => {
            const isEmployeeValid = await Employee.exists({
                _id: employeeId,
            })
            if (!isEmployeeValid)
                throw new Error(`${employeeId} is not  valid employeeId`)
        })
        //! gives error if employeeId doesn't exist but saves in the database
        const clinicProperties: IClinic = request.body
        const clinicObject = new Clinic(clinicProperties)
        const data = await clinicObject.save()
        response.status(201).json(data)
    } catch (error) {
        next(error)
    }
}

// Get Clinic Data
export const getAllClinicData = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const data: IClinic[] = await Clinic.find({}, { services: 0 })

        response.status(200).json({
            Clinic: data,
        })
    } catch (error) {
        next(error)
    }
}

//  Get All Clinic Services
export const getAllClinicServices = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const data: IClinic[] = await Clinic.find({}, { services: 1 }).populate(
            {
                path: 'employeeId',
                select: { name: 1, typeofEmployee: 1, role: 1 },
            }
        )

        // http://localhost:8080/clinics/services?service=eyesight
        // http://localhost:8080/clinics/services?service=eyelasic

        let serviceSort = request.query.serviceName
        let filter: {} = {}
        if (serviceSort) {
            filter = { 'services.name': serviceSort }
        }

        const data: IClinic[] = await Clinic.find(filter, { services: 1 })
        response.status(200).json({
            ClinicServices: data,
        })
    } catch (error) {
        next(error)
    }
}

//  Get Specific Clinic Service  //!Check it again (find by name)
export const getClinicServiceById = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const data: IClinic | null = await Clinic.findOne(
            {
                'services._id': request.params.id,
            },
            { services: 1 }
        ).populate({
            path: 'services.doctorId',
            select: { name: 1, email: 1, specialty: 1 },
        })
        console.log(request.params)
        console.log(data)
        if (data == null) next(new Error('Clinic Service Does not Exist'))
        else {
            response.status(200).json(data)
        }
    } catch (error) {
        next(error)
    }
}

// Update Clinic Services (adding new services)
export const updateClinicServices = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const data = await Clinic.updateOne(
            { _id: request.body.id },
            {
                $addToSet: {
                    services: request.body.services,
                },
            }
        )
        if (data.matchedCount === 0) next(new Error('Clinic Not Found'))
        else {
            response.status(200).json('Clinic Services Has Been Added')
        }
    } catch (error) {
        next(error)
    }
}

// Update Clinic Services(deleteService)
export const deleteClinicServices = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const data = await Clinic.updateOne(
            { _id: request.body.id },
            {
                $pull: {
                    services: request.body.services,
                },
            }
        )
        if (data.matchedCount === 0) next(new Error('Clinic Not Found'))
        else {
            response.status(200).json('Clinic Services Has Been deleted')
        }
    } catch (error) {
        next(error)
    }
}
