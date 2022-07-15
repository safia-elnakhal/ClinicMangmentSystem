import * as express from "express"
import * as Controller from "../controller/employeeController";
const router = express.Router();

router
  .route("/employee")
  .get(Controller.getAllEmployees)
  .post(
      Controller.createEmployee
  )
  .put(
    Controller.updateEmployee
  );

router
  .route("/employee/:id")
  .get(
    Controller.getEmployeeByID
  )
  .delete(
    Controller.deleteEmployee
  );

module.exports = router;
