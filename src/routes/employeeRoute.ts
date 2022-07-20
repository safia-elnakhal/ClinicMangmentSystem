import { Response, NextFunction, Router } from 'express'
import { body, param } from 'express-validator'
import * as Controller from '../controllers/employeeController'
import validationMW from '../middlewares/validationMW'
import authMW from '../middlewares/authMW'

const routes = Router()

routes
    .route('/employees')
    .get(Controller.getAllEmployees)
    .post(
        authMW,
        (request: any, response: Response, next: NextFunction) => {
            if (request.role === 'admin') next()
            else {
                const error: any = new Error('Not authorized')
                error.status = 403
                next(error)
            }
        },
        [
            body('name')
                .isString()
                .withMessage('employee name should be string'),
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
        (request: any, response: Response, next: NextFunction) => {
            if (request.role === 'admin') next()
            else {
                const error: any = new Error('Not authorized')
                error.status = 403
                next(error)
            }
        },
        [
            body('name')
                .isString()
                .withMessage('employee name should be string'),
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
        validationMW,
        Controller.getEmployeeByID
    )
    .delete(
        authMW,
        (request: any, response: Response, next: NextFunction) => {
            if (request.role === 'admin') next()
            else {
                const error: any = new Error('Not authorized')
                error.status = 403
                next(error)
            }
        },
        [param('id').isMongoId().withMessage('employee id should be objectId')],
        validationMW,
        Controller.deleteEmployee
    )

export default routes
