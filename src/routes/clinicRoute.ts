import express from 'express'
import clinicController from '../controllers/clinicController'

const router = express.Router()

router
    .route('/clinic')
    .post(clinicController.createClinicService)
    .get(clinicController.getAllClinicServices)

router
    .route('/clinic/services')
    .put(clinicController.updateClinicServices)
    .delete(clinicController.deleteClinicServices)

export = router
