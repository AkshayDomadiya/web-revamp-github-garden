import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
} from "@material-tailwind/react";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";

function getInitials(name) {
  if (!name) return "";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

// Define the clock-in threshold (9:00 AM) as the cutoff for "On Time"
const clockInThreshold = "09:00 AM";

function getStatus(clockInTime) {
  const [clockInHour, clockInMinute] = clockInTime.split(":");
  const [thresholdHour, thresholdMinute] = clockInThreshold.split(":");

  const isLate =
    parseInt(clockInHour) > parseInt(thresholdHour) ||
    (parseInt(clockInHour) === parseInt(thresholdHour) &&
      parseInt(clockInMinute) > parseInt(thresholdMinute));

  return isLate ? "Late" : "On Time";
}

// Fake clock-in data with a "status" field
const clockIns = [
  {
    id: 1,
    employeeName: "Alice Johnson",
    profileUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    clockInTime: "09:05 AM",
    shift: "Morning Shift",
    status: "On Time", // Added status field
  },
  {
    id: 2,
    employeeName: "Bob Smith",
    profileUrl: "",
    clockInTime: "10:12 AM",
    shift: "General Shift",
    status: "On Time", // Added status field
  },
  {
    id: 3,
    employeeName: "Catherine Lee",
    profileUrl: "https://randomuser.me/api/portraits/women/60.jpg",
    clockInTime: "08:55 AM",
    shift: "Morning Shift",
    status: "On Time", // Added status field
  },
  {
    id: 4,
    employeeName: "Daniel Martinez",
    profileUrl: "https://randomuser.me/api/portraits/men/21.jpg",
    clockInTime: "09:30 AM",
    shift: "Afternoon Shift",
    status: "Late", // Added status field
  },
  {
    id: 5,
    employeeName: "Emily Clark",
    profileUrl: "",
    clockInTime: "08:47 AM",
    shift: "Morning Shift",
    status: "On Time", // Added status field
  },
  {
    id: 6,
    employeeName: "Franklin Reed",
    profileUrl: "https://randomuser.me/api/portraits/men/34.jpg",
    clockInTime: "10:00 AM",
    shift: "General Shift",
    status: "Late", // Added status field
  },
  {
    id: 7,
    employeeName: "Grace Kim",
    profileUrl: "https://randomuser.me/api/portraits/women/15.jpg",
    clockInTime: "07:58 AM",
    shift: "Morning Shift",
    status: "On Time", // Added status field
  },
  {
    id: 8,
    employeeName: "Henry Wilson",
    profileUrl: "",
    clockInTime: "11:02 AM",
    shift: "Afternoon Shift",
    status: "Late", // Added status field
  },
  {
    id: 9,
    employeeName: "Isabella Moore",
    profileUrl: "https://randomuser.me/api/portraits/women/22.jpg",
    clockInTime: "09:15 AM",
    shift: "General Shift",
    status: "On Time", // Added status field
  },
  {
    id: 10,
    employeeName: "James Brown",
    profileUrl: "https://randomuser.me/api/portraits/men/45.jpg",
    clockInTime: "08:40 AM",
    shift: "Morning Shift",
    status: "On Time", // Added status field
  },
];

export default function TodaysClockInsScreen() {
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-8 p-6 flex justify-between items-center"
        >
          <Typography variant="h6" color="white">
            Today's Clock-ins
          </Typography>
        </CardHeader>

        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          {clockIns.length === 0 ? (
            <Typography className="text-center text-gray-600 px-4 py-6">
              No clock-ins recorded today.
            </Typography>
          ) : (
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Employee", "Shift", "Clock-in Time", "Status"].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {clockIns.map((employee, index) => {
                  const className = `py-3 px-5 ${
                    index === clockIns.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={employee.id}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          {employee.profileUrl && employee.profileUrl.trim() !== "" ? (
                            <Avatar
                              src={employee.profileUrl}
                              alt={employee.employeeName}
                              size="sm"
                              variant="rounded"
                            />
                          ) : (
                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-700 text-white text-sm font-bold">
                              {getInitials(employee.employeeName)}
                            </div>
                          )}
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            {employee.employeeName}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {employee.shift}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {employee.clockInTime}
                        </Typography>
                      </td>
                      <td className={className}>
                         <Chip
                          variant="gradient"
                          color={employee.status == "On Time" ? "green" : "red"}
                          value={employee.status}
                          className="py-0.5 px-2 text-[11px] font-medium w-fit"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
