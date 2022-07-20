import { Router } from 'express'
import { body } from 'express-validator'

import * as clinicController from '../controllers/clinicController'
import validationMW from '../middlewares/validationMW'

const router = Router()

router
    .route('/clinics')
    .post(
        [
            body('name')
                .isAlpha('en-US', { ignore: '' })
                .withMessage('Service Name Must Be Characters'),
        ],
        validationMW,
        clinicController.createClinic
    )
    .get(clinicController.getAllClinicData)

router
    .route('/clinics/services')
    .get(clinicController.getAllClinicServices)
    .put(
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
    .delete(clinicController.deleteClinicServices)

router.get('/clinic/services/:id', clinicController.getClinicServiceById)

export default router
