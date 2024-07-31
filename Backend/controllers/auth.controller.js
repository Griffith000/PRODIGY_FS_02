
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });
    let expiryDate = new Date(Number(new Date()) + 60 * 60 * 1000);
    return res.status(200).cookie("token", token, {
      httpOnly: true,
      expires:expiryDate,
      sameSite: 'None', 
      secure:true// Ensure cross-site cookies are allowed
    }).json({
      message: "Admin Logged in Successfully",
      role: "Admin",
      email: email,
      
    });
  }
};
export const logout = async (req, res) => {
  res.clearCookie("token");
  return res.send({
    message: "Logged out Successfully",
  });
};