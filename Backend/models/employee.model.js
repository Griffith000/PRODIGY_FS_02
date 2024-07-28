import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
});

const Employee = sequelize.define(
  "Employee",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
    },
    salary: {
      type: DataTypes.DECIMAL(10, 2),
    },
    hire_date: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "employees",
    timestamps: false,
  }
);
// Synchronize the model with the database
sequelize
  .sync()
  .then(() => {
    console.log("employees table has been created.");
  })
  .catch((error) => {
    console.error("Unable to create the table:", error);
  });
export default Employee;
