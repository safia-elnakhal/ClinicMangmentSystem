const mongoose = require('mongoose')
require('../models/doctorModel')

const Doctor = mongoose.model('doctors')

// Get All Doctors
export const getAllDoctor = (request: any, response: any, next: any) => {
    Doctor.find({})
        .then((data: any) => {
            response.status(200).json(data)
        })
        .catch((error: any) => {
            next(error)
        })
}

// Get Doctor By Id
export const getDoctorByID = (request: any, response: any, next: any) => {
    Doctor.findOne({ _id: request.params.id })
        .then((data: any) => {
            if (data == null) next(new Error(' Doctor not found'))
            response.status(200).json(data)
        })
        .catch((error: any) => {
            next(error)
        })
}

// Create Doctors
export const createDoctor = (request: any, response: any, next: any) => {
    const object = new Doctor({
        name: request.body.name,
        age: request.body.age,
        email: request.body.email,
        password: request.body.password,
    })
    object
        .save()
        .then((data: any) => {
            response.status(201).json({ data: 'added' })
        })
        .catch((error: any) => next(error))
}

// Update Doctor By Id
export const updateDoctor = (request: any, response: any, next: any) => {
    // console.log(request.body.id);
    Doctor.findById(request.body.id)
        .then((data: { [x: string]: any; save: () => void }) => {
            for (const key in request.body) {
                data[key] = request.body[key]
            }
            data.save()
            response.status(200).json({ data: 'updated' })
        })
        .catch((error: any) => {
            next(error)
        })
}

// Delete Doctor By Id
export const deleteDoctor = (request: any, response: any, next: any) => {
    Doctor.deleteOne({ _id: request.params.id })
        .then((data: any) => {
            if (!data) {
                next(new Error(' Employee not found'))
            } else {
                response.status(200).json({ data: 'deleted' })
            }
        })
        .catch((error: any) => {
            next(error)
        })
}
