import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import SideBar from "../Components/SideBar";
import { useTheme } from "../Components/ThemeContext";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../axiosInstance";
import { getEmployees } from "../redux/slices/employeeSlice";

const ManageEmployees = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employee.employees);
  const error = useSelector((state) => state.employee.error);
  const fetchEmployees = async () => {
    try {
      const response = await axiosInstance.get("/api/employee/get-all");
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      const data = await response.data;
      dispatch(getEmployees(data));
    } catch (error) {
      dispatch(getEmployees([]));
      console.error(error);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);
  return (
    <div>
      <Navbar />
      <div
        className={`flex items-center justify-center w-full h-screen  ${
          theme === "dark" ? "bg-slate-700" : "bg-white"
        }`}
      >
        <SideBar />
        <div className="flex-1 flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold my-4">Manage Employee </h1>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Department</th>
                  <th>Salary</th>
                  <th>Hire Date</th>
                </tr>
              </thead>
              <tbody>
                {employees &&
                  employees.map((employee) => (
                    <tr key={employee.id}>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img
                                src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{employee.name}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-ghost badge-sm">
                          {employee.position}
                        </span>
                      </td>
                      <td>{employee.department}</td>
                      <th>
                        <button className="btn btn-ghost btn-xs">
                          {employee.salary}
                        </button>
                      </th>
                      <th>{employee.hire_date}</th>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageEmployees;
