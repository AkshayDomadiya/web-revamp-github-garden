
import React from "react";
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
import LateArrivalsScreen from "./pages/dashboard/LateArrivalsScreen";
import UpcomingHolidaysScreen from "./pages/dashboard/UpcomingHolidaysScreen";
import LeaveSummaryScreen from "./pages/dashboard/LeaveSummaryScreen";
import Payroll from "./pages/dashboard/Payroll";
import AddPayroll from "./pages/dashboard/AddPayroll";
import AdminDashboard from "./pages/dashboard/AdminDashboard";

export type UserRole = "user" | "hr" | "manager" | "admin";

export interface RouteConfig {
  icon?: React.ReactElement;
  name?: string;
  path: string;
  element: React.ReactElement;
  roles: UserRole[];
}

export interface RouteSection {
  layout: string;
  title?: string;
  pages: RouteConfig[];
}

const iconProps = {
  className: "w-5 h-5 text-inherit",
};

export const routes: RouteSection[] = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...iconProps} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
        roles: ["user", "hr", "manager"],
      },
      {
        icon: <HomeIcon {...iconProps} />,
        name: "admin dashboard",
        path: "/home",
        element: <AdminDashboard />,
        roles: ["admin"],
      },
      {
        icon: <TableCellsIcon {...iconProps} />,
        name: "employees",
        path: "/employee",
        element: <Employee />,
        roles: ["admin", "hr", "manager"],
      },
      {
        icon: <CalendarDaysIcon {...iconProps} />,
        name: "payroll",
        path: "/payroll",
        element: <Payroll />,
        roles: ["admin", "hr"],
      },
      {
        icon: <CalendarDaysIcon {...iconProps} />,
        name: "schedule",
        path: "/schedule",
        element: <ScheduleScreen />,
        roles: ["admin", "manager", "user"],
      },
      {
        icon: <ClipboardDocumentIcon {...iconProps} />,
        name: "leave request",
        path: "/leave-request",
        element: <LeaveRequest />,
        roles: ["user", "hr", "manager"],
      },
      {
        icon: <ClipboardIcon {...iconProps} />,
        name: "approved leaves",
        path: "/approved-leaves",
        element: <ApprovedLeavesScreen />,
        roles: ["admin", "hr"],
      },
      {
        icon: <ClockIcon {...iconProps} />,
        name: "pending leaves",
        path: "/pending-leaves",
        element: <PendingLeavesScreen />,
        roles: ["admin", "hr"],
      },
      {
        icon: <UserGroupIcon {...iconProps} />,
        name: "today's clock-ins",
        path: "/todays-clock-ins",
        element: <TodaysClockInsScreen />,
        roles: ["admin", "manager"],
      },
      {
        icon: <ExclamationCircleIcon {...iconProps} />,
        name: "late arrivals",
        path: "/late-arrivals",
        element: <LateArrivalsScreen />,
        roles: ["admin", "manager"],
      },
      {
        icon: <CalendarIcon {...iconProps} />,
        name: "upcoming holidays",
        path: "/upcoming-holidays",
        element: <UpcomingHolidaysScreen />,
        roles: ["admin", "user", "hr", "manager"],
      },
      // Hidden routes (no icon/name for sidebar)
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
