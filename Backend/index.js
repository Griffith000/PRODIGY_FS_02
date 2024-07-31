import express from "express";
import pkg from "pg";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import employeeRouter from "./routes/employee.routes.js";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
const app = express();
const PORT = 3000;
dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust this to match the frontend URL
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const { Client } = pkg;
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client
  .connect()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Error connecting to the database");
    console.log(err);
  });

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
app.use("/api/auth", authRouter);
app.use("/api/employee", employeeRouter);
