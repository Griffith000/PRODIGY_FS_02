import React from "react";
import Navbar from "../Components/Navbar";
import SideBar from "../Components/SideBar";
import { useTheme } from "../Components/ThemeContext";
import { useSelector } from "react-redux";
import adminPicture from "../../public/admin-image.png";

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const { theme } = useTheme();
  if (!user) {
    return (
      <div className="flex-1 h-screen flex flex-col mt-36 items-center ">
        <h1 className="text-4xl font-bold my-4 ">Profile</h1>
        <div className="flex w-52 flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="skeleton h-16 w-16 shrink-0 rounded-full">
              <div className="avatar online placeholder">
                <div className="bg-neutral text-neutral-content w-16 rounded-full">
                  <span className="text-xl">AI</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-6 w-20 text-center">
                Role not available
              </div>
              <div className="skeleton h-6 w-44 text-center">
                Email not available
              </div>
            </div>
          </div>
          <div className="skeleton h-32 w-full"></div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Navbar />
      <div
        className={`flex items-center justify-center w-full h-screen   ${
          theme === "dark" ? "bg-slate-700" : "bg-[#f0f0f0]"
        }`}
      >
        <SideBar />
        <div className="flex-1 h-screen flex flex-col mt-36 items-center">
          <h1 className="text-4xl font-bold my-4 -mt-3">Profile</h1>
          <div className="flex w-52 flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="skeleton h-16 w-16 shrink-0 rounded-full">
                <div className="avatar online placeholder">
                  <div className="bg-neutral text-neutral-content w-16 rounded-full">
                    <span className="text-xl">
                      <img src={adminPicture} alt="" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="skeleton h-6 w-20 text-center">{user.role}</div>
                <div className="skeleton h-6 w-44 text-center">
                  {user.email}
                </div>
              </div>
            </div>
            <div className="skeleton h-52 w-60 p-3 text-sm">
              As an admin you have the ability to view and manage employee data,
              including names, positions, departments, salaries, and hire dates.
              You can also edit employee details and control access to the
              employee management system.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
