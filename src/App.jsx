import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { SignIn, ForgotPassword } from "./pages/auth";
import CompanyRegistration from "./pages/auth/CompanyRegistration";
import { Profile } from "./pages/dashboard";
import EmployeeDetails from "./pages/dashboard/EmployeeDetails";

function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/dashboard/profile" element={<Profile />} />
      {/* <Route path="/employee/:id" element={<EmployeeDetails />} /> */}
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/auth/sign-in" element={<SignIn />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/registration" element={<CompanyRegistration />} />
      <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
    </Routes>
  );
}

export default App;
