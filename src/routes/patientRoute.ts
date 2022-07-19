const { body, param, query } = require("express-validator");
import { Router } from "express"
import * as patientController from "../controllers/patientController";
const patientRoute = Router();
import validationMW from "../middlewares/validationMw"


patientRoute.route("/patient")
  .get(patientController.getAllPatients)
  .post([
    body("name").isAlpha().withMessage("patient name should be string"),
    body("email").isEmail().withMessage("patient Email should be Email"),
    body("password").isLength({ min: 6 }).withMessage("patient password should be more than 6 numbers"),
    body("age").isNumeric().withMessage("patient age should be Email"),
    body("historyOfDisease").isAlpha().withMessage("patient history with disease should be string"),
    body("InsuranceCompany").isAlpha().withMessage("patient InsuranceCompany should be string"),
    body("gender").isAlpha().withMessage("patient gender should be string"),

  ], validationMW,
    patientController.createPatient)


  .put([
    body("name").isAlpha().withMessage("patient name should be string"),
    body("email").isEmail().withMessage("patient Email should be Email"),
    body("password").isLength({ min: 6 }).withMessage("patient password should be more than 6 numbers"),
    body("age").isNumeric().withMessage("patient age should be Email"),
    body("historyOfDisease").isAlpha().withMessage("patient history with disease should be string"),
    body("InsuranceCompany").isAlpha().withMessage("patient InsuranceCompany should be string"),
    body("gender").isAlpha().withMessage("patient gender should be string"),
  ], validationMW,
    patientController.updatePatient)

patientRoute.route("/patient/:id")
  .delete([param("id").isMongoId().withMessage("patient id should be objectId")
  ], validationMW,
    patientController.deletePatientById)


  .get([param("id").isMongoId().withMessage("patient id should be objectId")
  ], validationMW,
    patientController.getPatientsById)





export default patientRoute;