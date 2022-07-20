import { Router } from 'express'
import { body, param } from 'express-validator'
import * as medicineController from '../controllers/medicineController'
import authMW, { adminAndOwner, adminOnly } from '../middlewares/authMW'
import validationMW from '../middlewares/validationMW'

const medicineRoute = Router()

medicineRoute
    .route('/medicines')
    .get(authMW, adminOnly, medicineController.getAllMedicines)
    .post(
        authMW,
        adminOnly,
        [
            body('name')
                .exists()
                .withMessage('medicine name is required')
                .isAlphanumeric('en-US', { ignore: ' ' })
                .withMessage('medicine name must be an alpha'),
            body('description')
                .optional()
                .isAlphanumeric('en-US', { ignore: ' ' })
                .withMessage('medicine description must be an alpha'),
            body('expirationDate')
                .optional()
                .isDate()
                .withMessage('medicine expirationDate must be a date'),
            body('takingInstructions')
                .optional()
                .isAlphanumeric('en-US', { ignore: ' ' })
                .withMessage('medicine takingInstructions must be an alpha'),
        ],
        validationMW,
        medicineController.createMedicine
    )

medicineRoute
    .route('/medicines/:id')
    .get(
        authMW,
        adminAndOwner,
        [
            param('id')
                .exists()
                .withMessage('medicine id is required')
                .isMongoId()
                .withMessage('medicine id should be objectId'),
        ],
        validationMW,
        medicineController.getMedicineById
    )
    .put(
        authMW,
        adminOnly,
        [
            param('id')
                .exists()
                .withMessage('medicine id is required')
                .isMongoId()
                .withMessage('medicine id should be objectId'),
            body('name')
                .optional()
                .isAlphanumeric('en-US', { ignore: ' ' })
                .withMessage('medicine name must be an alpha'),
            body('description')
                .optional()
                .isAlphanumeric('en-US', { ignore: ' ' })
                .withMessage('medicine description must be an alpha'),
            body('expirationDate')
                .optional()
                .isDate()
                .withMessage('medicine expirationDate must be a date'),
            body('takingInstructions')
                .optional()
                .isAlphanumeric('en-US', { ignore: ' ' })
                .withMessage('medicine takingInstructions must be an alpha'),
        ],
        validationMW,
        medicineController.updateMedicine
    )
    .delete(
        authMW,
        adminOnly,
        [
            param('id')
                .exists()
                .withMessage('medicine id is required')
                .isMongoId()
                .withMessage('medicine id should be objectId'),
        ],
        validationMW,
        medicineController.deleteMedicineById
    )

export default medicineRoute
