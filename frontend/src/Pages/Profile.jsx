import React from "react";
import Navbar from "../Components/Navbar";
import SideBar from "../Components/SideBar";
import { useTheme } from "../Components/ThemeContext";
const Profile = () => {
  const { theme } = useTheme();
  return (
    <div>
      <Navbar />
      <div
        className={`flex items-center justify-center w-full h-screen   ${
          theme === "dark" ? "bg-slate-700" : "bg-white"
        }`}
      >
        <SideBar />
        <div className="flex-1 h-screen flex flex-col mt-36 items-center">
          <h1 className="text-4xl font-bold my-4">Profile</h1>
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
                <div className="skeleton h-4 w-20"></div>
                <div className="skeleton h-4 w-28"></div>
              </div>
            </div>
            <div className="skeleton h-32 w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
