import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    employees: [],
    error: false,
    isAuthenticated: false,
};
const employeeSlice = createSlice({
    initialState,
    name: 'employee',
    reducers : {
        addEmployee: (state, action) => {
            state.employees.push(action.payload);
            state.error = false;
        },
        getEmployees: (state, action) => {
            state.employees = action.payload;
            state.error = false;
        },
        deleteEmployee: (state, action) => {
            state.employees = state.employees.filter(emp => emp.id !== action.payload.id);
            state.error = false;
        },  
        updateEmployee: (state, action) => {
            const index = state.employees.findIndex(emp => emp.id === action.payload.id);
            if (index !== -1) {
                state.employees[index] = action.payload;
            }
            state.error = false;
        },
        }

});

export const {addEmployee,getEmployees, deleteEmployee, updateEmployee} = employeeSlice.actions;
export default employeeSlice.reducer;