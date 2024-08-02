import React, { useState ,useEffect} from 'react';
import { AiOutlineClose, AiOutlineUser, AiOutlineMail, AiOutlineTeam } from 'react-icons/ai';
import { useSelector,useDispatch } from 'react-redux';
import { addEmployeeStart,addEmployeeSuccess,addEmployeeFailure,getEmployees,updateEmployeeStart,updateEmployeeSuccess,updateEmployeeFailure } from '../redux/slices/employeeSlice';
import axiosInstance from '../axiosInstance';
import defaultPicture from '/public/defaultImage.jpg';
const EmployeeForm = ({ onClose, onSubmit,employeeId }) => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employee.employees);
  const employeeToUpdate = employees.find((emp) => emp.id === employeeId) || {
    name: '',
    position: '',
    department: '',
    salary: '',
    hire_date: '',
    profile_image: defaultPicture,
  };
  const [employee, setEmployee] = useState(employeeToUpdate);

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState(null);
  
    
    const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (employeeId) {
      dispatch(updateEmployeeStart());
      try {
        const response = await axiosInstance.put(`/api/employee/update/${employeeId}`, {
          ...employee,
          profile_image: profileImageFile,
        });
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        dispatch(updateEmployeeSuccess(response.data));
        console.log('Success:', response.data);
        setSuccess(true);
        onClose();
        dispatch(getEmployees());
      } catch (error) {
        dispatch(updateEmployeeFailure());
        console.error('Error:', error);
        setError(true);
      }
    } else {
      try {
        dispatch(addEmployeeStart());
        const response = await axiosInstance.post("/api/employee/create", employee);
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        dispatch(addEmployeeSuccess(response.data));
        console.log('Success:', response.data);
        setSuccess(true);
        onClose();
        dispatch(getEmployees());
      } catch (error) {
        dispatch(addEmployeeFailure());
        console.error('Error:', error);
        setError(true);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className=" flex flex-col bg-white px-12 py-12 rounded-lg shadow-lg w-full max-w-lg relative">
        
      <button className="absolute top-6 right-5 bg-white text-gray-900 hover:text-gray-700" onClick={onClose}>
        <AiOutlineClose size={23} />
      </button>
      <h2 className="text-2xl font-bold mb-7">{employeeId ? 'Update Employee': 'Add New Employee'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div className=' grid grid-cols-2 gap-4'>
        <div className='add-employee-input '> 
        <label htmlFor="file" className="block text-gray-500 ml-5 py-2 self-start">Upload Image</label>
      <input type="file" name="profile_image"
            
            onChange={handleChange} className="file-input file-input-bordered w-full max-w-xs bg-slate-100  " />

        </div>
        <div className='add-employee-input'>
            <label htmlFor="name" className="block text-gray-500 ml-5 py-2 self-start">Name</label>
            <input type="text" name="name"
            value={employee.name}
            onChange={handleChange} placeholder="Type here" className="input input-bordered w-full max-w-xs bg-slate-100 text-slate-500" />
        </div>
        <div className='add-employee-input'>
            <label htmlFor="name" className="block text-gray-500  ml-5 py-2 self-start">Position</label>
            <input type="text" name="position"
            value={employee.position}
            onChange={handleChange} placeholder="Type here" className="input input-bordered w-full max-w-xs bg-slate-100 text-slate-500" />
        </div>
        <div className='add-employee-input'>
            <label htmlFor="name" className="block text-gray-500 ml-5 py-2 self-start">Department</label>
            <select
          name="department"
          value={employee.department}
          onChange={handleChange}
          className="select select-bordered w-full max-w-xs bg-slate-100 text-slate-500"
        >
          <option disabled >Select department</option>
          <option value="Technical">Technical</option>
          <option value="HR">HR</option>
          <option value="Business">Business</option>
        </select>
        </div>
        <div className='add-employee-input'>
            <label htmlFor="name" className="block text-gray-500  ml-5 py-2 self-start">Salary</label>
            <input type="text" name="salary"
            value={employee.salary}
            onChange={handleChange} placeholder="Type here" className="input input-bordered w-full max-w-xs bg-slate-100 text-slate-500" />
        </div>
        <div className='add-employee-input'>
            <label htmlFor="name" className="block text-gray-500  ml-5 py-2 self-start">Hire Date</label>
            <input type="date" name="hire_date"
            value={employee.hire_date}
            onChange={handleChange} placeholder="Type here" className="input input-bordered w-full max-w-xs bg-slate-100 text-slate-500" />
        </div>

        </div>
        
        <button type="submit" className="bg-blue-500 text-white self-center p-3 rounded-lg w-full hover:bg-blue-600">
          {employeeId ? 'Update': 'Add' }
        </button>
        {error && <p className="text-red-500 text-center">Failed to {employeeId ? 'update' : 'add'}  </p>}
        {success && <p className="text-green-500 text-center">Employee {employeeId ? 'updated' : 'added'} successfully  </p>}
      </form>
    </div>
  </div>
  );
};

export default EmployeeForm;