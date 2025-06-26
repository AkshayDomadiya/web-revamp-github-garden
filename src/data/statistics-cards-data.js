import {
  UserGroupIcon,
  ClockIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  BellIcon,
  CalendarIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "blue",
    icon: UserGroupIcon,
    title: "Total Employees",
    value: "15",
    route: "EmployeeList",
    roles: ["admin", "hr", "manager"],
    footer: {
      color: "text-blue-500",
      value: "+2",
      label: "new this week",
    },
  },
  {
    color: "lime",
    icon: ClockIcon,
    title: "Today's Clock-ins",
    value: "10",
    route: "Present",
    roles: ["admin", "hr"],
    footer: {
      color: "text-lime-500",
      value: "-1",
      label: "since yesterday",
    },
  },
  {
    color: "orange",
    icon: ExclamationCircleIcon,
    title: "Pending Leaves",
    value: "2",
    route: "PendingLeaves",
    roles: ["admin", "hr"],
    footer: {
      color: "text-orange-500",
      value: "+1",
      label: "since yesterday",
    },
  },
  {
    color: "green",
    icon: CheckCircleIcon,
    title: "Approved Leaves",
    value: "5",
    route: "ApprovedLeaves",
    roles: ["admin", "hr"],
    footer: {
      color: "text-green-500",
      value: "+3",
      label: "this month",
    },
  },
  {
    color: "pink",
    icon: BellIcon,
    title: "Late Arrivals",
    value: "3",
    route: "LateArrivals",
    roles: ["admin", "hr"],
    footer: {
      color: "text-pink-500",
      value: "+2",
      label: "today",
    },
  },
  {
    color: "purple",
    icon: CalendarIcon,
    title: "Upcoming Holidays",
    value: "2",
    route: "Holidays",
    roles: ["admin", "hr", "manager"],
    footer: {
      color: "text-purple-500",
      value: "✓",
      label: "this week",
    },
  },
];

export default statisticsCardsData;
