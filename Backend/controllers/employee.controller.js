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
    res.setHeader("Content-Type", "application/json");
    res.json(result);
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
      res.json(data);
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
  const { name, position, department, salary, hire_date } = req.body;
  if (!name || !position || !department || !salary || !hire_date) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Create an Employee
  const employee = {
    name,
    position,
    department,
    salary,
    hire_date,
  };

  // Save Employee in the database
  try {
    const data = await Employee.create(employee);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while creating the Employee.",
    });
  }
};
// Find a single Employee with an id and delete it
export const deleteEmployee = async (req, res) => {
  const id = req.params.id;

  Employee.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.json({
          message: "Employee was deleted successfully!",
        });
      } else {
        res.json({
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
