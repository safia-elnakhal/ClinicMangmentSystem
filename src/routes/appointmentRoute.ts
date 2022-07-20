import { Router } from 'express'
import { body, param } from 'express-validator'
import * as appointmentController from '../controllers/appointmentController'
import validationMW from '../middlewares/validationMW'

const appointmentRoute = Router()

appointmentRoute
    .route('/appointments')
    .get(appointmentController.getAllAppointments)
    .post(
        [
            body('doctorId')
                .exists()
                .withMessage('appointments id is required')
                .isMongoId()
                .withMessage('appointments id should be objectId'),
            body('patientId')
                .exists()
                .withMessage('appointments id is required')
                .isMongoId()
                .withMessage('appointments id should be objectId'),
            body('reasonOfVisit')
                .optional()
                .isAlphanumeric('en-US', { ignore: 's' })
                .withMessage('appointments reasonOfVisit must be an alpha'),
            body('date')
                .optional()
                .isDate()
                .withMessage('appointments expirationDate must be a date'),
        ],
        validationMW,
        appointmentController.createAppointment
    )
    .put(
        [
            body('doctorId')
                .exists()
                .withMessage('appointments id is required')
                .isMongoId()
                .withMessage('appointments id should be objectId'),
            body('patientId')
                .exists()
                .withMessage('appointments id is required')
                .isMongoId()
                .withMessage('appointments id should be objectId'),
            body('reasonOfVisit')
                .optional()
                .isAlphanumeric('en-US', { ignore: ' ' })
                .withMessage('appointments reasonOfVisit must be an alpha'),
            body('date')
                .optional()
                .isDate()
                .withMessage('appointments expirationDate must be a date'),
        ],
        validationMW,
        appointmentController.updateAppointment
    )

appointmentRoute
    .route('/appointments/:id')
    .get(
        [
            param('id')
                .exists()
                .withMessage('appointments id is required')
                .isMongoId()
                .withMessage('appointments id should be objectId'),
        ],
        validationMW,
        appointmentController.getAppointmentById
    )
    .delete(
        [
            param('id')
                .exists()
                .withMessage('appointments id is required')
                .isMongoId()
                .withMessage('appointments id should be objectId'),
        ],
        validationMW,
        appointmentController.deleteAppointmentById
    )

export default appointmentRoute
