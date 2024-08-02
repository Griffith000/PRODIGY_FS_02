import React from 'react';
import { useSelector } from 'react-redux';

const EmployeeList = () => {
    const employees = useSelector((state) => state.employee.employees);

    return (
        <div>
            {employees.map((employee) => (
                <div key={employee.id}>{employee.name}</div>
            ))}
        </div>
    );
};

export default EmployeeList;