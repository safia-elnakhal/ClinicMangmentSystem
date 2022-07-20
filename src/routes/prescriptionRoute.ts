import { Router } from 'express'
import { body, param } from 'express-validator'
import * as prescriptionController from '../controllers/prescriptionController'
import validationMW from '../middlewares/validationMW'

const prescriptionRoute = Router()

prescriptionRoute
    .route('/prescriptions')
    .get(prescriptionController.getAllPrescriptions)
    .post(
        [
            body('doctorId')
                .exists()
                .withMessage('prescription doctorId is required')
                .isMongoId()
                .withMessage('prescription doctorId be a mongo id'),
            body('patientId')
                .exists()
                .withMessage('prescription patientId is required')
                .isMongoId()
                .withMessage('prescription patientId must be a mongo id'),
            body('medicineId')
                .exists()
                .withMessage('prescription medicineId is required')
                .isMongoId()
                .withMessage('prescription medicineId must be a mongo id'),
            body('consultation')
                .optional()
                .isDate()
                .withMessage('prescription charge must be a date'),
        ],
        validationMW,
        prescriptionController.createPrescription
    )

prescriptionRoute
    .route('/prescriptions/:id')
    .get(
        [
            param('id')
                .exists()
                .withMessage('prescription id is required')
                .isMongoId()
                .withMessage('prescription id should be objectId'),
        ],
        validationMW,
        prescriptionController.getPrescriptionById
    )
    .put(
        [
            param('id')
                .exists()
                .withMessage('prescription id is required')
                .isMongoId()
                .withMessage('prescription id should be objectId'),
            body('doctorId')
                .optional()
                .isMongoId()
                .withMessage('prescription doctorId be a mongo id'),
            body('patientId')
                .optional()
                .isMongoId()
                .withMessage('prescription patientId must be a mongo id'),
            body('medicineId')
                .optional()
                .isMongoId()
                .withMessage('prescription medicineId must be a mongo id'),
            body('consultation')
                .optional()
                .isDate()
                .withMessage('prescription charge must be a date'),
        ],
        validationMW,
        prescriptionController.updatePrescription
    )
    .delete(
        [
            param('id')
                .exists()
                .withMessage('prescription id is required')
                .isMongoId()
                .withMessage('prescription id should be objectId'),
        ],
        validationMW,
        prescriptionController.deletePrescriptionById
    )

export default prescriptionRoute
