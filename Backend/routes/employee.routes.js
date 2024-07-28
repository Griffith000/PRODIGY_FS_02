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

employeeRouter.post("/create", verifyToken, createEmployee);
employeeRouter.get("/get-all", verifyToken, getAllEmployees);
employeeRouter.get("/get-employee/:id", verifyToken, getEmployee);
employeeRouter.put("/update/:id", verifyToken, updateEmployee);
employeeRouter.delete("/delete/:id", verifyToken, deleteEmployee);

export default employeeRouter;
