import { Router } from 'express'
import { body, param } from 'express-validator'
import * as Controller from '../controllers/doctorcontroller'
import validationMW from '../middlewares/validationMW'
import authMW, { adminAndOwner, adminOnly } from '../middlewares/authMW'

const routes = Router()

routes
    .route('/doctors')
    .get(authMW, adminOnly, Controller.getAllDoctor)
    .post(
        authMW,
        adminOnly,
        [
            body('name')
                .exists()
                .withMessage('specialty name is required')
                .isAlphanumeric('en-US', { ignore: ' ' })
                .withMessage('specialty name must be an alpha'),
            body('email').isEmail().withMessage('Doctor Email should be Email'),
            body('age').isNumeric().withMessage('Doctor age should be Email'),
            body('password')
                .isLength({ min: 6 })
                .withMessage('Doctor password should be more than 6 numbers'),
        ],
        validationMW,
        Controller.createDoctor
    )

routes
    .route('/doctors/:id')
    .get(
        authMW,
        adminAndOwner,
        [param('id').isMongoId().withMessage('Doctor id should be objectId')],
        validationMW,
        Controller.getDoctorByID
    )
    .put(
        authMW,
        adminOnly,
        [
            body('name')
                .exists()
                .withMessage('Doctor name is required')
                .isAlphanumeric('en-US', { ignore: ' ' })
                .withMessage('Doctor name must be an alpha'),
            body('email').isEmail().withMessage('Doctor Email should be Email'),
            body('password')
                .isLength({ min: 6 })
                .withMessage('Doctor password should be more than 6 numbers'),
            body('age').isNumeric().withMessage('Doctor age should be Email'),
            body('specialty')
                .optional()
                .isAlphanumeric('en-US', { ignore: ' ' })
                .withMessage('Doctor specialty must be an alpha'),
        ],
        validationMW,
        Controller.updateDoctor
    )
    .delete(
        authMW,
        adminOnly,
        [param('id').isMongoId().withMessage('Doctor id should be objectId')],
        validationMW,
        Controller.deleteDoctor
    )

export default routes
