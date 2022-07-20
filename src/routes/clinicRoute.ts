import { Router } from 'express'
import { body } from 'express-validator'
import authMW, { adminAndOwner, adminOnly } from '../middlewares/authMW'
import * as clinicController from '../controllers/clinicController'
import validationMW from '../middlewares/validationMW'

const router = Router()

router
    .route('/clinics')
    .post(
        authMW,
        adminOnly,
        [
            body('clinicName')
                .isAlpha('en-US', { ignore: 's' })
                .withMessage('clinicName Must Be Characters'),
            body('contactNumber')
                .isMobilePhone('ar-EG')
                .withMessage('contactNumber Must Be Valid Egypt Phone Number'),
            body('address')
                .optional({ checkFalsy: true, nullable: true })
                .isObject()
                .withMessage('address must contain city,street,building'),
            body('address.city')
                .optional({ checkFalsy: true, nullable: true })
                .isString()
                .withMessage('address must contain city of type string '),
            body('address.streetName')
                .optional({ checkFalsy: true, nullable: true })
                .isString()
                .withMessage('address must contain streetName of type string'),
            body('address.buildingNumber')
                .optional({ checkFalsy: true, nullable: true })
                .isNumeric()
                .withMessage(
                    'address must contain buildingNumber of type number'
                ),
            body('employeeId')
                .isArray()
                .withMessage('employeeId Must Be Array ')
                .isMongoId()
                .withMessage('employeeId must be objectId'),
        ],
        validationMW,
        clinicController.createClinic
    )
    .get(authMW, adminAndOwner, clinicController.getAllClinicData)

router
    .route('/clinics/services')
    .get(authMW, adminAndOwner, clinicController.getAllClinicServices)
    .put(
        authMW,
        adminOnly,
        [
            body('services.name') //! adding unique
                // .isEmpty()
                // .withMessage('Service Name Should Be Added')
                .isAlpha('en-US', { ignore: 's' })
                .withMessage('Service Name Must Be Characters'),
            body('services.description')
                .isAlpha('en-US', { ignore: 's-.,;?' })
                .withMessage('Service Description Must Be Characters'),
            // body('services.*.doctorId')
            //     .isMongoId()
            //     .withMessage('DoctorId Must Be Of ObjectId Datatype '),
        ],
        validationMW,
        clinicController.updateClinicServices
    )
    .delete(authMW, adminOnly, clinicController.deleteClinicServices)

router.get(
    '/clinic/services/:id',
    authMW,
    adminAndOwner,
    clinicController.getClinicServiceById
)

export default router
