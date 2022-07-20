import { Router } from 'express'
import { body, param } from 'express-validator'
import * as appointmentController from '../controllers/appointmentController'
import validationMW from '../middlewares/validationMW'
import authMW, { adminAndOwner, adminOnly } from '../middlewares/authMW'

const appointmentRoute = Router()

appointmentRoute
    .route('/appointments')
    .get(authMW, adminOnly, appointmentController.getAllAppointments)
    .post(
        authMW,
        adminOnly,
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
        appointmentController.getAppointmentById
    )
    .put(
        authMW,
        adminOnly,
        [
            param('doctorId')
                .exists()
                .withMessage('appointments id is required')
                .isMongoId()
                .withMessage('appointments id should be objectId'),
            param('patientId')
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
        authMW,
        adminAndOwner,
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
        authMW,
        adminAndOwner,
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
