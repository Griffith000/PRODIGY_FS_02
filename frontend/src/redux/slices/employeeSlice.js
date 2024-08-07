import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
  error: false,
};
const employeeSlice = createSlice({
  initialState,
  name: "employee",
  reducers: {
    addEmployeeStart: (state) => {
      state.error = false;
    },
    addEmployeeSuccess: (state, action) => {
      state.employees.push(action.payload);
      state.error = false;
    },
    addEmployeeFailure: (state) => {
      state.error = true;
    },
    getEmployees: (state, action) => {
      state.employees = action.payload;
      state.error = false;
    },
    deleteEmployeeStart: (state) => {
      state.error = false;
    },
    deleteEmployeeSuccess: (state, action) => {
      state.employees = state.employees.filter(
        (emp) => emp.id !== action.payload.id
      );
      state.error = false;
    },
    deleteEmployeeFailure: (state) => {
      state.error = true;
    },
    updateEmployeeStart: (state) => {
      state.error = false;
    },
    updateEmployeeSuccess: (state, action) => {
      state.employees = state.employees.map((emp) =>
        emp.id === action.payload.id ? action.payload : emp
      );
      state.error = false;
    },
    updateEmployeeFailure: (state) => {
      state.error = true;
    },
  },
});

export const {
  addEmployeeFailure,
  addEmployeeStart,
  addEmployeeSuccess,
  getEmployees,
  deleteEmployeeFailure,
  deleteEmployeeStart,
  deleteEmployeeSuccess,
  updateEmployeeFailure,
  updateEmployeeStart,
  updateEmployeeSuccess,
} = employeeSlice.actions;
export default employeeSlice.reducer;
