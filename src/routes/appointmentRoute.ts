import { Router } from 'express'
import * as Controller from '../controllers/appointmentController'

const routes = Router()

routes
    .route('/appointment')
    .get(Controller.getAllAppointments)
    .post(Controller.getAppointmentById)
    .put(Controller.createAppointment)

routes
    .route('/appointment/:id')
    .get(Controller.updateAppointment)
    .delete(Controller.deleteAppointmentById)

export default routes
