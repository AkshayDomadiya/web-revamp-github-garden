import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";

function getInitials(name) {
  if (!name) return "";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

const users = [
  {
    id: 1,
    employeeName: "Alice Johnson",
    profileUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    leaveType: "Sick Leave",
    startDate: "2025-05-20",
    endDate: "2025-05-22",
    reason: "Flu and fever",
  },
  {
    id: 2,
    employeeName: "Bob Smith",
    profileUrl: "",
    leaveType: "Casual Leave",
    startDate: "2025-05-25",
    endDate: "2025-05-25",
    reason: "Family event",
  },
];

export default function ApprovedLeavesScreen() {
  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen flex flex-col gap-6">
      <Typography
        variant="h4"
        className="mb-4 text-center text-gray-800 font-bold text-2xl sm:text-3xl"
      >
        Approved Leaves
      </Typography>

      {users.length === 0 ? (
        <Typography variant="h6" color="gray" className="text-center">
          No approved leaves found.
        </Typography>
      ) : (
        users.map((user) => (
          <Card
            key={user.id}
            className="w-full shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <CardHeader
              floated={false}
              className="flex flex-col sm:flex-row sm:items-center gap-4 p-6 bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100"
            >
              {user.profileUrl && user.profileUrl.trim() !== "" ? (
                <Avatar
                  size="lg"
                  src={user.profileUrl}
                  alt={user.employeeName}
                  className="ring-2 ring-white shadow-md"
                />
              ) : (
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-indigo-700 text-white text-lg font-bold ring-2 ring-white shadow-md">
                  {getInitials(user.employeeName)}
                </div>
              )}

              <div className="text-center sm:text-left">
                <Typography
                  variant="h5"
                  className="text-gray-900 font-semibold text-lg sm:text-xl"
                >
                  {user.employeeName}
                </Typography>
                <Typography className="text-sm text-gray-700">
                  {user.leaveType}
                </Typography>
              </div>
            </CardHeader>

            <CardBody className="p-6">
              <div className="mb-2 text-gray-700 text-sm sm:text-base">
                <strong className="text-gray-800">From:</strong> {user.startDate}
              </div>
              <div className="mb-2 text-gray-700 text-sm sm:text-base">
                <strong className="text-gray-800">To:</strong> {user.endDate}
              </div>
              <div className="text-gray-700 text-sm sm:text-base">
                <strong className="text-gray-800">Reason:</strong> {user.reason}
              </div>
            </CardBody>
          </Card>
        ))
      )}
    </div>
  );
}
