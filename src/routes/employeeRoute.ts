import { Router } from 'express'
import { body, param } from 'express-validator'
import * as Controller from '../controllers/employeeController'
import validationMW from '../middlewares/validationMW'

const routes = Router()

routes
    .route('/employee')
    .get(Controller.getAllEmployees)
    .post(
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
    .route('/employee/:id')
    .get(
        [param('id').isMongoId().withMessage('employee id should be objectId')],
        validationMW,
        Controller.getEmployeeByID
    )
    .delete(
        [param('id').isMongoId().withMessage('employee id should be objectId')],
        validationMW,
        Controller.deleteEmployee
    )

export default routes
