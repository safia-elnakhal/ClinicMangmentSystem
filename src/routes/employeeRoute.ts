import { Router } from "express";
import * as Controller from "../controllers/employeeController";
const routes = Router();

routes
	.route("/employee")
	.get(Controller.getAllEmployees)
	.post(Controller.createEmployee)
	.put(Controller.updateEmployee);

routes
	.route("/employee/:id")
	.get(Controller.getEmployeeByID)
	.delete(Controller.deleteEmployee);

export default routes;
