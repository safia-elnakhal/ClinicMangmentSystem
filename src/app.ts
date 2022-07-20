// import * as express from "express";
// import express = require('express')
// import { Request, Response, NextFunction } from 'express'
import express, { Application, Request, Response } from 'express'

// import morgan = require('morgan')
import morgan from 'morgan'
// import mongoose from "mongoose";
import mongoose from 'mongoose'
import cors from 'cors'
// import cors = require('cors')
import employeeRoute from './routes/employeeRoute'
import doctorRoutes from './routes/doctorRoutes'
import patientRoutes from './routes/patientRoute'
import clinicServicesRoute from './routes/clinicRoute'
import loginRoute from './routes/loginRoute'

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
app.use(employeeRoute)
app.use(doctorRoutes)
app.use(patientRoutes)
app.use(clinicServicesRoute)

// not-found middleware
app.use((request: Request, response: Response) => {
    // throw new Error("very big error"); //throwing an error causes the error handling middleware to work
    response.status(404).json({ message: 'Endpoint not found.' })
})

// handling errors middleware
app.use((error: any, request: Request, response: Response) => {
    const status: number = error.status || 500
    response
        .status(status)
        .json({ Message: 'Internal Error', details: error.message })
    // response
    //   .status(error.status || 500)
    //   .json({ message: 'Internal Error', details: error.message })
})
