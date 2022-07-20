/* eslint-disable no-unused-vars */

import express, { Application, NextFunction, Request, Response } from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import cors from 'cors'

import employeeRoutes from './routes/employeeRoute'
import doctorRoutes from './routes/doctorRoutes'
import patientRoutes from './routes/patientRoute'
import invoiceRoutes from './routes/invoiceRoute'
import prescriptionRoutes from './routes/prescriptionRoute'
import medicineRoutes from './routes/medicineRoute'
import clinicRoute from './routes/clinicRoute'
import loginRoute from './routes/loginRoute'
import appointmentRoute from './routes/appointmentRoute'

require('dotenv').config()

const app: Application = express()
const port = process.env.PORT || 8080

const dbURL = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
mongoose
    .connect(dbURL)
    .then(() => {
        app.listen(port, () => {
            console.log(`App listens on http://localhost:${port}`)
        })
    })
    .catch((error: any) => {
        console.log('DB Connection Error', error)
    })

app.use(cors())
app.use(morgan(':method :url'))
app.use(express.json())

app.use(loginRoute)
app.use(employeeRoutes)
app.use(doctorRoutes)
app.use(patientRoutes)
app.use(invoiceRoutes)
app.use(prescriptionRoutes)
app.use(medicineRoutes)
app.use(clinicRoute)

app.use(appointmentRoute)

// not-found middleware
app.use((request: Request, response: Response, next: NextFunction) => {
    response.status(404).json({ message: 'Endpoint not found.' })
})

// handling errors middleware
app.use(
    (error: any, request: Request, response: Response, next: NextFunction) => {
        const status: number = error.status || 500
        response
            .status(status)
            .json({ Message: 'Internal Error', details: error.message })
    }
)
