import express from "express"
import * as employeeController from "../controller/employeeController";
const router = express.Router();

router
  .route("/employee")
  .get(employeeController.getAllAdmins)
  .post(
    employeeController.createEmployee
  )
  .put(
    employeeController.updateEmployee
  );

router
  .route("/employee/:id")
  .get(
    employeeController.getEmployeeByID
  )
  .delete(
    employeeController.deleteEmployee
  );

module.exports = router;
