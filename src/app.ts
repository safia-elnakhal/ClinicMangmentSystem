// import * as express from "express";
// import express = require('express')
// import { Request, Response, NextFunction } from 'express'
import express, { Application, Request, Response, NextFunction } from 'express'

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

require('dotenv').config()

const app = express()
const port = process.env.PORT || 8080

const cmsDB_URL = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
mongoose
    .connect(cmsDB_URL)
    .then(() => {
        app.listen(port, () => {
            console.log('App listens on port', port)
        })
    })
    .catch((error: any) => {
        console.log('DB Connection Error', error)
    })

app.use(cors())
app.use(morgan(':method :url'))
app.use(express.json())

app.use(employeeRoute)
app.use(doctorRoutes)
app.use(patientRoutes)
app.use(clinicServicesRoute)

// not-found middleware
app.use((request: Request, response: Response, next: NextFunction) => {
    // throw new Error("very big error"); //throwing an error causes the error handling middleware to work
    response.status(404).json({ message: 'Endpoint not found.' })
})

// handling errors middleware
app.use(
    (error: any, request: Request, response: Response, next: NextFunction) => {
        let status: number = error.status || 500
        response
            .status(status)
            .json({ Message: 'Internal Error', details: error.message })
        // response
        //   .status(error.status || 500)
        //   .json({ message: 'Internal Error', details: error.message })
    }
)
