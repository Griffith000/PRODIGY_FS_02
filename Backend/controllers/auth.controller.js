import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });
    res.status(200).cookie("accessCookie", token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000,
    });
    return res.send({
      message: "Admin Logged in Successfully",
      role: "Admin",
    });
  }
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) {
    return res.status(404).send({ message: "User Not found." });
  }

  const passwordIsValid = bcryptjs.compareSync(
    req.body.password,
    user.password
  );
  if (!passwordIsValid) {
    return res.status(401).send({
      accessToken: null,
      message: "Invalid Password!",
    });
  }
  const token = jwt.sign({ id: user.id }, process.env.SECRET, {
    expiresIn: 3600, // 1 hour
  });
  res.cookie("accessToken", token, {
    httpOnly: true, // Ensures the cookie is sent only over HTTP(S), not client JavaScript
    maxAge: 3600000, // 1 hour in milliseconds
  });

  return res.status(200).send({
    id: user.id,
    name: user.name,
    email: user.email,
    role: "Admin",
  });
};
export const logout = async (req, res) => {
  res.clearCookie("accessCookie");
  return res.send({
    message: "Logged out Successfully",
  });
};
