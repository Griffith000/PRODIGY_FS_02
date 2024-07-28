import { Sequelize,DataTypes } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const sequelize= new Sequelize (process.env.DATABASE_URL, {
    dialect: "postgres",
});

 const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "users",
    timestamps: false,
});

export default User
