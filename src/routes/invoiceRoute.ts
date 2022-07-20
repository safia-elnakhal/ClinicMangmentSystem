import { Router } from 'express'
import { body, param } from 'express-validator'
import * as invoiceController from '../controllers/invoiceController'
import validationMW from '../middlewares/validationMw'

const invoiceRoute = Router()

invoiceRoute
    .route('/invoices')
    .get(invoiceController.getAllInvoices)
    .post(
        [
            body('doctorId')
                .exists()
                .withMessage('invoice doctorId is required')
                .isMongoId()
                .withMessage('invoice doctorId be a mongo id'),
            body('patientId')
                .exists()
                .withMessage('invoice patientId is required')
                .isMongoId()
                .withMessage('invoice patientId must be a mongo id'),
            body('charge')
                .exists()
                .withMessage('invoice charge is required')
                .isNumeric()
                .withMessage('invoice charge must be a number'),
        ],
        validationMW,
        invoiceController.createInvoice
    )

invoiceRoute
    .route('/invoices/:id')
    .get(
        [
            param('id')
                .exists()
                .withMessage('invoice id is required')
                .isMongoId()
                .withMessage('invoice id should be objectId'),
        ],
        validationMW,
        invoiceController.getInvoiceById
    )
    .put(
        [
            param('id')
                .exists()
                .withMessage('invoice id is required')
                .isMongoId()
                .withMessage('invoice id should be objectId'),
            body('doctorId')
                .optional()
                .isMongoId()
                .withMessage('invoice doctorId be a mongo id'),
            body('patientId')
                .optional()
                .isMongoId()
                .withMessage('invoice patientId must be a mongo id'),
            body('charge')
                .optional()
                .isNumeric()
                .withMessage('invoice charge must be a number'),
        ],
        validationMW,
        invoiceController.updateInvoice
    )
    .delete(
        [
            param('id')
                .exists()
                .withMessage('invoice id is required')
                .isMongoId()
                .withMessage('invoice id should be objectId'),
        ],
        validationMW,
        invoiceController.deleteInvoiceById
    )

export default invoiceRoute
