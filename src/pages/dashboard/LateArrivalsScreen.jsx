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

// Office start time
const officeStartTime = "09:00 AM";

// Helper to convert "HH:MM AM/PM" to Date object
function parseTime(timeStr) {
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

// Helper to get late duration in minutes
function getLateDuration(arrivalTime) {
  const arrival = parseTime(arrivalTime);
  const officeStart = parseTime(officeStartTime);
  const diffMs = arrival - officeStart;
  const diffMinutes = Math.max(Math.floor(diffMs / 60000), 0);
  return `${diffMinutes} mins`;
}

// Sample late arrivals data
const lateArrivals = [
  {
    id: 1,
    employeeName: "John Doe",
    profileUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    arrivalTime: "09:15 AM",
    date: "2025-05-18",
  },
  {
    id: 2,
    employeeName: "Jane Smith",
    profileUrl: "",
    arrivalTime: "09:30 AM",
    date: "2025-05-18",
  },
  {
    id: 3,
    employeeName: "Michael Johnson",
    profileUrl: "",
    arrivalTime: "09:45 AM",
    date: "2025-05-18",
  },
];

export default function LateArrivalsScreen() {
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader
          variant="gradient"
          color="red"
          className="mb-8 p-6 flex justify-between items-center"
        >
          <Typography variant="h6" color="white">
            Late Arrivals
          </Typography>
        </CardHeader>

        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          {lateArrivals.length === 0 ? (
            <Typography className="text-center text-gray-600 px-4 py-6">
              No late arrivals found.
            </Typography>
          ) : (
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Employee", "Arrival Time", "Late By", "Date"].map((header) => (
                    <th
                      key={header}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {header}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lateArrivals.map((entry, index) => {
                  const className = `py-3 px-5 ${
                    index === lateArrivals.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={entry.id}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          {entry.profileUrl && entry.profileUrl.trim() !== "" ? (
                            <Avatar
                              src={entry.profileUrl}
                              alt={entry.employeeName}
                              size="sm"
                              variant="rounded"
                            />
                          ) : (
                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-700 text-white text-sm font-bold">
                              {getInitials(entry.employeeName)}
                            </div>
                          )}
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            {entry.employeeName}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {entry.arrivalTime}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-red-600">
                          {getLateDuration(entry.arrivalTime)}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {entry.date}
                        </Typography>
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
