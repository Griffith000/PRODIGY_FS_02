import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import ManageEmployees from "./Pages/ManageEmployees";
import Profile from "./Pages/Profile";
import { ThemeProvider } from "./Components/ThemeContext";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/manage-employees" element={<ManageEmployees />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
