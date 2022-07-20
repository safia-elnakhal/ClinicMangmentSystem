import { Router } from 'express'
import * as Controller from '../controllers/appointmentController'

const appointmentRoute = Router()

appointmentRoute
    .route('/appointment')
    .get(Controller.getAllAppointments)
    .post(Controller.getAppointmentById)
    .put(Controller.createAppointment)

appointmentRoute
    .route('/appointment/:id')
    .get(Controller.updateAppointment)
    .delete(Controller.deleteAppointmentById)

export default appointmentRoute
