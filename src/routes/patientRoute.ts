import express from "express";
const { body, param, query } = require("express-validator");
const patientController = require("./patientController")
const router = express.Router();



router.route("/patient")
    .get(patientController.getAllPatients)
    .post([
        body("name").isAlpha().withMessage("patient name should be string"),
        body("email").isEmail().withMessage("patient Email should be Email"),
        body("password").isLength({ min: 6 }).withMessage("patient password should be more than 6 numbers"),
        body("age").isNumeric().withMessage("patient age should be Email"),
        body("historyOfDisease").isAlpha.withMessage("patient history with disease should be string"),
        body("InsuranceCompany").isAlpha.withMessage("patient InsuranceCompany should be string"),
        body("gender").isAlpha.withMessage("patient gender should be string"),
        body("reports").isArray.withMessage("patient reports should be an Array")

    ],
        patientController.createPatient
    )

    .put([body("name").isAlpha().withMessage("patient name should be string"),
    body("email").isEmail().withMessage("patient Email should be Email"),
    body("password").isLength({ min: 6 }).withMessage("patient password should be more than 6 numbers"),
    body("age").isNumeric().withMessage("patient age should be Email"),
    body("historyOfDisease").isAlpha.withMessage("patient history with disease should be string"),
    body("InsuranceCompany").isAlpha.withMessage("patient InsuranceCompany should be string"),
    body("gender").isAlpha.withMessage("patient gender should be string"),
    body("reports").isArray.withMessage("patient reports should be an Array")],

        patientController.updatePatient
    )

router.route("/patient/:id")
    .get(
        [param("id").isMongoId().withMessage("patient id should be objectId")
        ],
        patientController.getAllPatientsById
    )
    .delete(
        [param("id").isMongoId().withMessage("patient id should be objectId")
        ],
        patientController.deletePatientById
    );


// router.route("/patient/:id/report")
//     .delete(

//         patientController.removeFromReport
//     );



module.exports = router;