import {
  HomeIcon,
  TableCellsIcon,
  CalendarDaysIcon,
  ClipboardDocumentIcon,
  ClipboardIcon,
  ClockIcon,
  UserGroupIcon,
  ExclamationCircleIcon,
  CalendarIcon,
} from "@heroicons/react/24/solid";

import { Home, Employee } from "@/pages/dashboard";
import EmployeeDetails from "./pages/dashboard/EmployeeDetails";
import AddEmployee from "./pages/dashboard/AddEmployee";
import AddMultipleEmployee from "./pages/dashboard/AddMultipleEmployee";
import ScheduleScreen from "./pages/dashboard/ScheduleScreen";
import LeaveRequest from "./pages/dashboard/LeaveRequest";
import ApprovedLeavesScreen from "./pages/dashboard/ApprovedLeavesScreen";
import PendingLeavesScreen from "./pages/dashboard/PendingLeavesScreen";
import TodaysClockInsScreen from "./pages/dashboard/TodaysClockInsScreen";
import LateArrivalsScreen from "./pages/dashboard/LateArrivalsScreen";  // Import new screen
import UpcomingHolidaysScreen from "./pages/dashboard/UpcomingHolidaysScreen";
import LeaveSummaryScreen from "./pages/dashboard/LeaveSummaryScreen";
import Payroll from "./pages/dashboard/Payroll";
import AddPayroll from "./pages/dashboard/AddPayroll";
import AdminDashboard from "./pages/dashboard/AdminDashboard";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
        roles: ["user", "hr", "manager"], // All roles
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <AdminDashboard />,
        roles: ["admin"], // All roles
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Employee",
        path: "/employee",
        element: <Employee />,
        roles: ["admin", "hr", "manager"], // No basic users
      },
      {
        icon: <CalendarDaysIcon {...icon} />,
        name: "Payroll",
        path: "/payroll",
        element: <Payroll />,
        roles: ["admin", "hr"],
      },
      {
        icon: <CalendarDaysIcon {...icon} />,
        name: "Schedule",
        path: "/schedule",
        element: <ScheduleScreen />,
        roles: ["admin", "manager", "user"],
      },
      {
        icon: <ClipboardDocumentIcon {...icon} />,
        name: "Leave Request",
        path: "/leave-request",
        element: <LeaveRequest />,
        roles: ["user", "hr", "manager"],
      },
      {
        icon: <ClipboardIcon {...icon} />,
        name: "Approved Leaves",
        path: "/approved-leaves",
        element: <ApprovedLeavesScreen />,
        roles: ["admin", "hr"],
      },
      {
        icon: <ClockIcon {...icon} />,
        name: "Pending Leaves",
        path: "/pending-leaves",
        element: <PendingLeavesScreen />,
        roles: ["admin", "hr"],
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "Todays Clock-ins",
        path: "/todays-clock-ins",
        element: <TodaysClockInsScreen />,
        roles: ["admin", "manager"],
      },
      {
        icon: <ExclamationCircleIcon {...icon} />,
        name: "Late Arrivals",
        path: "/late-arrivals",
        element: <LateArrivalsScreen />,
        roles: ["admin", "manager"],
      },
      {
        icon: <CalendarIcon {...icon} />,
        name: "Upcoming Holidays",
        path: "/upcoming-holidays",
        element: <UpcomingHolidaysScreen />,
        roles: ["admin", "user", "hr", "manager"],
      },
      {
        path: "employee/add",
        element: <AddEmployee />,
        roles: ["admin", "hr"],
      },
      {
        path: "employee/add-multiple",
        element: <AddMultipleEmployee />,
        roles: ["admin", "hr"],
      },
      {
        path: "employee/:id",
        element: <EmployeeDetails />,
        roles: ["admin", "hr"],
      },
      {
        path: "leave-request/leave-summary",
        element: <LeaveSummaryScreen />,
        roles: ["user"],
      },
      {
        path: "employee/payroll/add",
        element: <AddPayroll />,
        roles: ["admin", "hr"],
      },
    ],
  },
];

export default routes;
