import { Router } from 'express'
import * as Controller from '../controllers/doctorController'
import validationMW from '../middlewares/validationMW'

const { body, param } = require('express-validator')

const routes = Router()

routes
    .route('/doctors')
    .get(Controller.getAllDoctor)
    .post(
        [
            body('name').isAlpha().withMessage('Doctor name should be string'),
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
        [param('id').isMongoId().withMessage('Doctor id should be objectId')],
        validationMW,
        Controller.getDoctorByID
    )
    .put(
        [
            body('name').isAlpha().withMessage('Doctor name should be string'),
            body('email').isEmail().withMessage('Doctor Email should be Email'),
            body('password')
                .isLength({ min: 6 })
                .withMessage('Doctor password should be more than 6 numbers'),
            body('age').isNumeric().withMessage('Doctor age should be Email'),
        ],
        validationMW,
        Controller.updateDoctor
    )
    .delete(
        [param('id').isMongoId().withMessage('Doctor id should be objectId')],
        validationMW,
        Controller.deleteDoctor
    )

export default routes
