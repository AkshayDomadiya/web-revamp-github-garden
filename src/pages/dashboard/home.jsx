
import React from "react";
import UserDashboard from "./UserDashboard";
import HRDashboard from "./HRDashboard";
import ManagerDashboard from "./ManagerDashboard";
import AdminDashboard from "./AdminDashboard";

export function Home() {
  // Get user role from localStorage with proper typing
  const user = (() => {
    try {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  })();
  
  const role = user?.role || "user";

  // Route to appropriate dashboard based on role
  switch (role) {
    case "admin":
      return <AdminDashboard />;
    case "hr":
      return <HRDashboard />;
    case "manager":
      return <ManagerDashboard />;
    case "user":
    default:
      return <UserDashboard />;
  }
}

export default Home;
