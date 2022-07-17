const { body, param, query } = require("express-validator");
import { Router } from "express"
import * as patientController from "../controller/patientController";
const patientRoute = Router();


patientRoute.route("/patient")
    .get(patientController.getAllPatients)
    .post(patientController.createPatient)
    .put(patientController.updatePatient)

patientRoute.route("/patient/:id")
    .delete(patientController.deletePatientById)
    .get(patientController.getPatientsById)





export default patientRoute;
