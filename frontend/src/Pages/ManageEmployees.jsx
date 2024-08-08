import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import SideBar from "../Components/SideBar";
import { useTheme } from "../Components/ThemeContext";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../axiosInstance";
import {
  getEmployees,
  deleteEmployeeFailure,
  deleteEmployeeStart,
  deleteEmployeeSuccess,
} from "../redux/slices/employeeSlice";
import EmployeeForm from "../Components/EmployeeForm";
import moment from "moment";
import defaultPicture from "/defaultImage.jpg";
import ToastMessage, {
  notifySuccess,
  notifyError,
  notifyWarning,
} from "../Components/ToastMessage";
import "react-toastify/dist/ReactToastify.css";

export const fetchAndFormatEmployees = async (dispatch) => {
  try {
    const response = await axiosInstance.get("/api/employee/get-all");
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const formattedEmployees = response.data.map((employee) => ({
      ...employee,
      hire_date: moment(employee.hire_date).format("YYYY-MM-DD"),
    }));

    dispatch(getEmployees(formattedEmployees));
  } catch (error) {
    dispatch(getEmployees([]));
    console.error(error);
  }
};

const ManageEmployees = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const employees = useSelector((state) => state.employee.employees);

  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchAndFormatEmployees(dispatch);
  }, [dispatch]);
  const handleDelete = async (id) => {
    console.log("Delete employee clicked");
    dispatch(deleteEmployeeStart());
    try {
      const response = await axiosInstance.delete(`/api/employee/delete/${id}`);
      if (response.status !== 200) {
        console.error("Failed to delete employee");
        return;
      }

      dispatch(deleteEmployeeSuccess(response.data));
      fetchAndFormatEmployees(dispatch);
      notifyWarning("Employee deleted successfully !");
    } catch (error) {
      console.error(error);
      dispatch(deleteEmployeeFailure());
    }
  };
  const handleEdit = async (id) => {
    console.log("Edit employee clicked");
    setSelectedEmployeeId(id);
  };
  const handleToggleForm = () => {
    setShowForm(!showForm);
  };
  const handleSuccess = (action) => {
    const message =
      action === "edit"
        ? "Employee updated successfully!"
        : "Employee added successfully!";
    notifySuccess(message);
    setShowForm(false);
  };

  return (
    <div>
      <Navbar />
      <div
        className={`flex items-center justify-center w-full h-svh ${
          theme === "dark" ? "bg-slate-700" : "bg-white"
        } ${showForm ? "blur-background" : ""} `}
      >
        <SideBar />
        <div className="flex-1 flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold my-4 -mt-10">Manage Employees </h1>
          <button
            className="btn m-4 text-white bg-green-600"
            onClick={() => {
              setShowForm(true);
              setSelectedEmployeeId(null);
            }}
          >
            Add employee
          </button>
          <div className="h-96 overflow-y-auto">
            {showForm && (
              <EmployeeForm
                onClose={() => setShowForm(false)}
                employeeId={selectedEmployeeId}
                handleToggleForm={handleToggleForm}
                handleSuccess={handleSuccess}
              />
            )}{" "}
            <table className="table ">
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
                {Array.isArray(employees) &&
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
                                src={
                                  employee.profile_image
                                    ? employee.profile_image
                                    : defaultPicture
                                }
                                alt="error  "
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{employee.name}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-ghost badge-sm p-3">
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
                      <td className="flex justify-center items-end mt-3">
                        <button
                          className="btn btn-warning btn-xs ml-1 py-1 px-2"
                          onClick={() => {
                            handleEdit(employee.id);
                            setShowForm(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger bg-red-600 text-white hover:bg-red-700 transition duration-200 btn-xs ml-1 py-1 px-2 border-none"
                          onClick={() => handleDelete(employee.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastMessage />
    </div>
  );
};

export default ManageEmployees;
