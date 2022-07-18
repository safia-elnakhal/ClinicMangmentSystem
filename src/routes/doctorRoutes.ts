import { Router } from 'express'
import * as Controller from '../controllers/doctorController'
const routes = Router()

routes
  .route('/doctor')
  .get(Controller.getAllDoctor)
  .post(Controller.createDoctor)
  .put(Controller.updateDoctor)

routes
  .route('/doctor/:id')
  .get(Controller.getDoctorByID)
  .delete(Controller.deleteDoctor)

export default routes
