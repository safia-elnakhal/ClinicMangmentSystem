import { Router } from 'express'
import * as patientController from '../controllers/patientController'
import validationMW from '../middlewares/validationMW'

const { body, param } = require('express-validator')

const patientRoute = Router()

patientRoute
    .route('/patients')
    .get(patientController.getAllPatients)
    .post(
        [
            body('name').isAlpha().withMessage('patient name should be string'),
            body('email')
                .isEmail()
                .withMessage('patient Email should be Email'),
            body('password')
                .isLength({ min: 6 })
                .withMessage('patient password should be more than 6 numbers'),
            body('age').isNumeric().withMessage('patient age should be Email'),
            body('historyOfDisease')
                .isAlpha()
                .withMessage('patient history with disease should be string'),
            body('InsuranceCompany')
                .isAlpha()
                .withMessage('patient InsuranceCompany should be string'),
            body('gender')
                .isAlpha()
                .withMessage('patient gender should be string'),
        ],
        validationMW,
        patientController.createPatient
    )

patientRoute
    .route('/patients/:id')
    .delete(
        [param('id').isMongoId().withMessage('patient id should be objectId')],
        validationMW,
        patientController.deletePatientById
    )

    .get(
        [param('id').isMongoId().withMessage('patient id should be objectId')],
        validationMW,
        patientController.getPatientsById
    )
    .put(
        [
            body('name').isAlpha().withMessage('patient name should be string'),
            body('email')
                .isEmail()
                .withMessage('patient Email should be Email'),
            body('password')
                .isLength({ min: 6 })
                .withMessage('patient password should be more than 6 numbers'),
            body('age').isNumeric().withMessage('patient age should be Email'),
            body('historyOfDisease')
                .isAlpha()
                .withMessage('patient history with disease should be string'),
            body('InsuranceCompany')
                .isAlpha()
                .withMessage('patient InsuranceCompany should be string'),
            body('gender')
                .isAlpha()
                .withMessage('patient gender should be string'),
        ],
        validationMW,
        patientController.updatePatient
    )

patientRoute.route('/patients/:id/report').get(
    [param('id').isMongoId().withMessage('patient id should be objectId')],
    validationMW,

    patientController.getReportbyPatientId
)
export default patientRoute
