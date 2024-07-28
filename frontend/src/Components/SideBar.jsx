import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiUsers, FiLogOut, FiUser } from "react-icons/fi";

const SideBar = () => {
  const location = useLocation();
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
          <li>
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
