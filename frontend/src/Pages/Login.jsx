import React, { useState } from "react";
import Lottie from "react-lottie";
import loginAnimation from "../Lottie-animations/login-animation-2.json";
import axiosInstance from "../axiosInstance.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar.jsx";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/slices/userSlice.js";
import { useTheme } from "../Components/ThemeContext";
import ToastMessage, { notifyError } from "../Components/ToastMessage";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [formData, setFormData] = useState([]);
  const loading = useSelector((state) => state.user.loading);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlelogin = async (e) => {
    e.preventDefault();

    try {
      dispatch(loginStart());
      const response = await axiosInstance.post("/api/auth/login", formData);
      dispatch(loginSuccess(response.data));
      console.log(response.data);
      console.log(response.data);
      navigate("/dashboard");
    } catch (error) {
      dispatch(loginFailure());
      console.log(error);
      notifyError("Invalid Credentials");
    }
  };

  return (
    <>
      <Navbar />
      <div
        className={`flex justify-center items-center h-screen  ${
          theme === "dark" ? "bg-slate-700" : "bg-[#f0f0f0]"
        }`}
      >
        <div className="bg-gray-100 shadow-lg rounded-xl px-8 py-6 flex">
          <div className="w-1/2 flex items-center justify-center ">
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: loginAnimation,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
              height={400}
              width={400}
            />
          </div>
          <div className="w-1/2 bg-white px-8 py-6 rounded-lg ">
            <h2 className="text-2xl text-slate-700 font-bold mb-6">
              Admin Login
            </h2>
            <form className="flex flex-col gap-3 bg-[]">
              <label className="input input-bordered flex items-center gap-2 bg-slate-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  onChange={handleChange}
                  type="text"
                  name="email"
                  className="grow text-neutral-700"
                  placeholder="Email"
                />
              </label>

              <label className="input input-bordered flex items-center gap-2 bg-slate-100 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  onChange={handleChange}
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="grow text-neutral-700"
                />
              </label>
              <button
                onClick={(e) => handlelogin(e)}
                className="btn btn-accent bg-[#669bbc] hover:bg-blue-200 border-none text-white"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </div>
        </div>
        <ToastMessage />
      </div>
    </>
  );
};

export default Login;
