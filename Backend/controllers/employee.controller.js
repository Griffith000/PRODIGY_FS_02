import Employee from "../models/employee.model.js";
import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
});

// Retrieve all Users from the database.
export const getAllEmployees = async (req, res) => {
  const query = "SELECT * FROM employees";

  try {
    const result = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });
    res.send(result);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving employees.",
    });
  }
};

export const getEmployee = async (req, res) => {
  const id = req.params.id;

  Employee.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Employee with id=" + id,
      });
    });
};

// Create and Save a new Employee
export const createEmployee = async (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create an Employee
  const employee = {
    name: req.body.name,
    position: req.body.position,
    department: req.body.department,
    salary: req.body.salary,
    hire_date: req.body.hire_date,
  };

  // Save Employee in the database
  Employee.create(employee)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Employee.",
      });
    });
};
// Find a single Employee with an id and delete it
export const deleteEmployee = async (req, res) => {
  const id = req.params.id;

  Employee.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Employee was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Employee with id=" + id,
      });
    });
};

export const updateEmployee = async (req, res) => {
  const id = req.params.id;
  const result = await Employee.update(req.body, {
    where: { id: id },
  });
  if (result == 1) {
    res.send({
      message: "Employee was updated successfully.",
    });
  } else {
    res.send({
      message: `Cannot update Employee with id=${id}. Maybe Employee was not found or req.body is empty!`,
    });
  }
};
