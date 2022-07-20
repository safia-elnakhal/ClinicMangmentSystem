import { Router } from 'express'
import { body, param } from 'express-validator'
import * as Controller from '../controllers/employeeController'
import validationMW from '../middlewares/validationMW'
import authMW, { adminAndOwner, adminOnly } from '../middlewares/authMW'

const routes = Router()

routes
    .route('/employees')
    .get(authMW, adminOnly, Controller.getAllEmployees)
    .post(
        authMW,
        adminOnly,
        [
            body('name')
                .isAlpha('en-US', { ignore: ' ' })
                .withMessage('employee Name Must Be Characters'),
            body('email')
                .isEmail()
                .withMessage('employee Email should be Email'),
            body('password')
                .isLength({ min: 8 })
                .withMessage('employee password should be more than 8 numbers'),
            body('typeofEmployee')
                .isString()
                .withMessage('employee type should be string'),
            body('role')
                .isString()
                .withMessage('employee role should be string'),
        ],
        validationMW,
        Controller.createEmployee
    )
    .put(
        authMW,
        adminOnly,
        [
            body('name')
                .isAlpha('en-US', { ignore: '' })
                .withMessage('employee Name Must Be Characters'),
            body('email')
                .isEmail()
                .withMessage('employee Email should be Email'),
            body('password')
                .isLength({ min: 8 })
                .withMessage('employee password should be more than 8 numbers'),
            body('typeofEmployee')
                .isString()
                .withMessage('employee type should be string'),
            body('role')
                .isString()
                .withMessage('employee role should be string'),
        ],
        validationMW,
        Controller.updateEmployee
    )

routes
    .route('/employees/:id')
    .get(
        [param('id').isMongoId().withMessage('employee id should be objectId')],
        authMW,
        adminAndOwner,
        validationMW,
        Controller.getEmployeeByID
    )
    .delete(
        authMW,
        adminOnly,
        [param('id').isMongoId().withMessage('employee id should be objectId')],
        validationMW,
        Controller.deleteEmployee
    )

export default routes
