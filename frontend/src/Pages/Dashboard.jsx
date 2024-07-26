import React from 'react'
import SideBar from '../Components/SideBar'
import Navbar from '../Components/Navbar'
import { useTheme } from '../Components/ThemeContext'
const Dashboard = () => {
  const {theme , toggleTheme} = useTheme()
  return (
    <div>
      <Navbar/>
      <div className={`flex items-center justify-center w-full h-screen  ${theme === 'dark' ? 'bg-slate-700' : 'bg-white'}`}>
        <SideBar />
        <div className="flex-1 flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4 mt-4"></div>
            <h2 className="text-2xl font-bold">Toggle Theme</h2>
            <button onClick={() => toggleTheme(theme === 'light' ? 'dark' : 'light')} className="btn btn-sm">{theme === 'light' ? 'Dark' : 'Light'}</button>
            
            <div className="flex flex-wrap gap-3 justify-center mt-8">
              <div className="card bg-blue-500 text-white p-4 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold">Admins</h2>
                <p className="text-4xl font-bold">5</p>
              </div>
              <div className="divider divider-start ">start</div>
              <div className="card bg-green-500 text-white p-4 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold">Employees</h2>
                <p className="text-4xl font-bold">20</p>
              </div>
              <div className="card bg-purple-500 text-white p-4 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold">Total Salary</h2>
                <p className="text-4xl font-bold">$100,000</p>
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
                  <td className="px-4 py-2">Admin 1</td>
                  <td className="px-4 py-2">admin1@example.com</td>
                  <td className="px-4 py-2">Admin</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Admin 2</td>
                  <td className="px-4 py-2">admin2@example.com</td>
                  <td className="px-4 py-2">Admin</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Admin 3</td>
                  <td className="px-4 py-2">admin3@example.com</td>
                  <td className="px-4 py-2">Admin</td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>
    </div>
  )
}

export default Dashboard