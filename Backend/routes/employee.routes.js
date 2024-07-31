import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getAllEmployees,
  updateEmployee,
} from "../controllers/employee.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const employeeRouter = express.Router();

employeeRouter.post("/create", createEmployee);
employeeRouter.get("/get-all", getAllEmployees);
employeeRouter.get("/get-employee/:id", getEmployee);
employeeRouter.put("/update/:id", updateEmployee);
employeeRouter.delete("/delete/:id", deleteEmployee);

export default employeeRouter;
