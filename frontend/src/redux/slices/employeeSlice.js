import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
  error: false,
  loading: false,
};
const employeeSlice = createSlice({
  initialState,
  name: "employee",
  reducers: {
    addEmployeeStart: (state) => {
      state.error = false;
      state.loading = true;
    },
    addEmployeeSuccess: (state, action) => {
      state.employees.push(action.payload);
      state.error = false;
      state.loading = false;
    },
    addEmployeeFailure: (state) => {
      state.error = true;
      state.loading = false;
    },
    getEmployees: (state, action) => {
      state.employees = action.payload;
      state.error = false;
      state.loading = false;
    },
    deleteEmployeeStart: (state) => {
      state.error = false;
      state.loading = true;
    },
    deleteEmployeeSuccess: (state, action) => {
      state.employees = state.employees.filter(
        (emp) => emp.id !== action.payload.id
      );
      state.error = false;
      state.loading = false;
    },
    deleteEmployeeFailure: (state) => {
      state.error = true;
      state.loading = false;
    },
    updateEmployeeStart: (state) => {
      state.error = false;
      state.loading = true;
    },
    updateEmployeeSuccess: (state, action) => {
      state.employees = state.employees.map((emp) =>
        emp.id === action.payload.id ? action.payload : emp
      );
      state.error = false;
      state.loading = false;
    },
    updateEmployeeFailure: (state) => {
      state.error = true;
      state.loading = false;
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
