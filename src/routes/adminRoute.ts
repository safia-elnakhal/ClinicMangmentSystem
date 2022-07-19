import { Router } from 'express'
import * as adminController from '../controllers/adminController'

const router = Router()

router
    .route('/admin')
    .get(adminController.getAllAdmins)
    .post(adminController.createAdmin)
    .put(adminController.updateAdmin)

router
    .route('/admin/:id')
    .get(adminController.getAdminByID)
    .delete(adminController.deleteAdmin)

export = router
