import { Router } from 'express'
import * as patientController from '../controllers/patientController'

const { body, param, query } = require('express-validator')

const patientRoute = Router()

patientRoute
    .route('/patient')
    .get(patientController.getAllPatients)
    .post(patientController.createPatient)
    .put(patientController.updatePatient)

patientRoute
    .route('/patient/:id')
    .delete(patientController.deletePatientById)
    .get(patientController.getPatientsById)

export default patientRoute
