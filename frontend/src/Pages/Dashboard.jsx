import React, { useEffect } from "react";
import SideBar from "../Components/SideBar";
import Navbar from "../Components/Navbar";
import { useTheme } from "../Components/ThemeContext";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../axiosInstance";
import { getEmployees } from "../redux/slices/employeeSlice";

const Dashboard = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const employees = useSelector((state) => state.employee.employees);
  console.log(user);
  console.log(employees);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axiosInstance.get("/api/employee/get-all");
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        console.log(response.data);
        dispatch(getEmployees(response.data));
        localStorage.setItem("employees", JSON.stringify(response.data)); // Save to local storage
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployees();
  }, [dispatch]);

  useEffect(() => {
    const storedEmployees = localStorage.getItem("employees");
    if (storedEmployees) {
      dispatch(getEmployees(JSON.parse(storedEmployees))); // Load from local storage
    }
  }, [dispatch]);

  if (!employees) {
    return <div>Loading...</div>;
  }

  const calculateTotalSalary = () => {
    if (!employees) {
      return "loading";
    }
    const total = employees.reduce(
      (sum, employee) => sum + parseFloat(employee.salary),
      0
    );
    console.log("Total Salary:", total); // Debugging line
    return total;
  };
  const formatSalary = (salary) => {
    if (isNaN(salary)) {
      console.error("Invalid salary:", salary); // Debugging line
      return "Invalid salary";
    }
    return `$${salary.toFixed(2)}`;
  };

  return (
    <div>
      <Navbar />
      <div
        className={`flex items-center justify-center w-full h-screen  ${
          theme === "dark" ? "bg-slate-700" : "bg-[#f0f0f0]"
        }`}
      >
        <SideBar />
        <div className="flex-1 flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold">Dashboard</h1>

          <div className="flex flex-wrap gap-3 justify-center mt-8">
            <div className="card bg-blue-500 text-white p-4 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold">Admins</h2>
              <p className="text-4xl font-bold">1</p>
            </div>
            <div className="card bg-green-500 text-white p-4 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold">Employees</h2>
              <p className="text-4xl font-bold">
                {employees.length > 0 ? employees.length : "loading"}
              </p>
            </div>
            <div className="card bg-purple-500 text-white p-4 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold">Total Salary</h2>
              <p className="text-4xl font-bold">
                {formatSalary(calculateTotalSalary())}
              </p>
            </div>
          </div>
          <div className="separator"></div>
          <table className="mt-8">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">Admin1</td>
                <td className="px-4 py-2">admin1@example.com</td>
                <td className="px-4 py-2">Admin</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
