import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiHome, FiUsers, FiLogOut, FiUser } from "react-icons/fi";
import axiosInstance from "../axiosInstance.js";
import { logout } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
const SideBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlelogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/auth/logout");
      dispatch(logout());
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="sidebar">
      <div>
        <ul className="flex flex-col justify-start items-start content-start ">
          <li>
            <Link
              to="/dashboard"
              className={`sidebar-item ${
                location.pathname === "/dashboard" ? "active" : ""
              }`}
            >
              <FiHome className="icon" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/manage-employees"
              className={` sidebar-item ${
                location.pathname === "/manage-employees" ? "active" : ""
              }`}
            >
              <FiUsers className="icon" />
              Manage Employees
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className={`sidebar-item ${
                location.pathname === "/profile" ? "active" : ""
              }`}
            >
              <FiUser className="icon" />
              Profile
            </Link>
          </li>
          <li onClick={handlelogout}>
            <Link to="/" className="dark sidebar-item">
              <FiLogOut className="icon" />
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
