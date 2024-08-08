import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import {
  addEmployeeStart,
  addEmployeeSuccess,
  addEmployeeFailure,
  updateEmployeeStart,
  updateEmployeeSuccess,
  updateEmployeeFailure,
} from "../redux/slices/employeeSlice";
import axiosInstance from "../axiosInstance";
import defaultPicture from "/defaultImage.jpg";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase";
import { fetchAndFormatEmployees } from "../Pages/ManageEmployees";
import moment from "moment";

const EmployeeForm = ({
  onClose,
  employeeId,
  handleToggleForm,
  handleSuccess,
}) => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employee.employees);

  const employeeToUpdate = employees.find((emp) => emp.id === employeeId) || {
    name: "",
    position: "",
    department: "",
    salary: "",
    hire_date: moment().format("YYYY-MM-DD"),
    profile_image: defaultPicture || employee.profile_image,
  };

  const [employee, setEmployee] = useState(employeeToUpdate);
  const [error, setError] = useState(false);
  const [image, setImage] = useState(null);
  const loading = useSelector((state) => state.employee.loading);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Editing an existing employee
    console.log("Original Hire Date:", employee.hire_date);
    const formattedHireDate = moment(employee.hire_date).format("YYYY-MM-DD");
    console.log("Formatted Hire Date:", formattedHireDate);
    const updatedEmployee = {
      ...employee,
      hire_date: formattedHireDate,
      profile_image: image || employee.profile_image,
    };
    dispatch(employeeId ? updateEmployeeStart() : addEmployeeStart());

    try {
      const response = employeeId
        ? await axiosInstance.put(
            `/api/employee/update/${employeeId}`,
            updatedEmployee
          )
        : await axiosInstance.post("/api/employee/create", updatedEmployee);

      if (response.status === 200) {
        dispatch(
          employeeId
            ? updateEmployeeSuccess(response.data)
            : addEmployeeSuccess(response.data)
        );
        if (employeeId) handleSuccess("edit");
        else {
          handleSuccess("add");
        }
        fetchAndFormatEmployees(dispatch);
      } else {
        dispatch(employeeId ? updateEmployeeFailure() : addEmployeeFailure());
        setError(true);
      }
    } catch (error) {
      dispatch(employeeId ? updateEmployeeFailure() : addEmployeeFailure());
      setError(true);
    }
  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `profile_images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Optional: Handle progress updates
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error("Upload failed:", error);
      },
      () => {
        // Handle successful uploads
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setEmployee({ ...employee, profile_image: downloadURL });
        });
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className=" flex flex-col bg-white px-12 py-12 rounded-lg shadow-lg w-full max-w-lg relative">
        <button
          className="absolute top-6 right-5 bg-white text-gray-900 hover:text-gray-700"
          onClick={handleToggleForm}
        >
          <AiOutlineClose size={23} />
        </button>
        <h2 className="text-2xl font-bold mb-7">
          {employeeId ? "Update Employee" : "Add New Employee"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className=" grid grid-cols-2 gap-4">
            <div className="add-employee-input ">
              <label
                htmlFor="file"
                className="block text-gray-500 ml-5 py-2 self-start"
              >
                Upload Image
              </label>
              <input
                type="file"
                name="profile_image"
                accept="image/*"
                onChange={handleFileUpload}
                className="file-input file-input-bordered w-full max-w-xs bg-slate-100  "
              />
            </div>
            <div className="add-employee-input">
              <label
                htmlFor="name"
                className="block text-gray-500 ml-5 py-2 self-start"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                value={employee.name}
                onChange={handleChange}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs bg-slate-100 text-slate-500"
              />
            </div>
            <div className="add-employee-input">
              <label
                htmlFor="name"
                className="block text-gray-500  ml-5 py-2 self-start"
              >
                Position
              </label>
              <input
                type="text"
                name="position"
                value={employee.position}
                onChange={handleChange}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs bg-slate-100 text-slate-500"
              />
            </div>
            <div className="add-employee-input">
              <label
                htmlFor="name"
                className="block text-gray-500 ml-5 py-2 self-start"
              >
                Department
              </label>
              <select
                name="department"
                value={employee.department}
                onChange={handleChange}
                className="select select-bordered w-full max-w-xs bg-slate-100 text-slate-500"
              >
                <option disabled>Select department</option>
                <option value="Technical">Technical</option>
                <option value="HR">HR</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Customer Service">Customer Service</option>
              </select>
            </div>
            <div className="add-employee-input">
              <label
                htmlFor="name"
                className="block text-gray-500  ml-5 py-2 self-start"
              >
                Salary
              </label>
              <input
                type="text"
                name="salary"
                value={employee.salary}
                onChange={handleChange}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs bg-slate-100 text-slate-500"
              />
            </div>
            <div className="add-employee-input">
              <label
                htmlFor="name"
                className="block text-gray-500  ml-5 py-2 self-start"
              >
                Hire Date
              </label>
              <input
                type="date"
                name="hire_date"
                value={employee.hire_date}
                onChange={handleChange}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs bg-slate-100 text-slate-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white self-center p-3 rounded-lg w-full hover:bg-blue-600"
          >
            {loading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : employeeId ? (
              "Update"
            ) : (
              "Add"
            )}
          </button>
          {error && (
            <p className="text-red-500 text-center">
              Failed to {employeeId ? "update" : "add"}{" "}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
