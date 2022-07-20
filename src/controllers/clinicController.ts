import { Request, Response, NextFunction } from 'express'

import { Clinic, IClinic } from '../models/clinicModel'

// create Clinic
export const createClinic = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {

        const clinicProperties: IClinic = request.body
        const clinicObject = await new Clinic(clinicProperties)
        await clinicObject.save()
        response.status(201).json({ data: 'New Clinic Added' })
    } catch (error) {
        next(error)
    }
}
// Get all Clinic
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
        )
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
