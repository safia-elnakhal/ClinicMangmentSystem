import { Router } from 'express'
import { param, body } from 'express-validator'

import {
    createClinic,
    getAllClinicData,
    getAllClinicServices,
    updateClinicServices,
    getClinicServiceById,
    deleteClinicServices,
} from '../controllers/clinicController'
import validationMw from '../middlewares/validationMw'

const router = Router()

router
    .route('/clinic')
    .post(
        [
            body('name')
                .isAlpha('en-US', { ignore: '' })
                .withMessage('Service Name Must Be Characters'),
        ],
        validationMw,
        createClinic
    )
    .get(getAllClinicData)

router
    .route('/clinic/services')
    .get(getAllClinicServices)
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
        validationMw,
        updateClinicServices
    )
    .delete(deleteClinicServices)

router.get('/clinic/services/:id', getClinicServiceById)

export default router
