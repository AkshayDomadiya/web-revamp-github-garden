import React from "react";
import { Card, CardHeader, CardBody, Typography, Avatar } from "@material-tailwind/react";

function getInitials(name) {
  if (!name) return "";
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

const holidays = [
  {
    id: 1,
    name: "New Year's Day",
    date: "2025-01-01",
    description: "Celebration of the New Year",
    imageUrl: "",
  },
  {
    id: 2,
    name: "Independence Day",
    date: "2025-08-15",
    description: "National Independence Day",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_India.svg",
  },
  {
    id: 3,
    name: "Christmas Day",
    date: "2025-12-25",
    description: "Christmas celebration",
    imageUrl: "",
  },
];

export default function UpcomingHolidaysScreen() {
  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen flex flex-col gap-6">
      <Typography
        variant="h4"
        className="mb-4 text-center text-gray-800 font-semibold text-xl sm:text-2xl md:text-3xl"
      >
        Upcoming Holidays
      </Typography>

      {holidays.length === 0 ? (
        <Typography variant="h6" color="gray" className="text-center">
          No upcoming holidays found.
        </Typography>
      ) : (
        holidays.map((holiday) => {
          const hasImage = holiday.imageUrl?.trim().length > 0;
          return (
            <Card
              key={holiday.id}
              className="w-full shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <CardHeader
                floated={false}
                className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 sm:p-6 bg-gradient-to-r from-green-100 via-green-200 to-green-100"
              >
                {holiday.imageUrl && holiday.imageUrl.trim() !== "" ? (
                                <Avatar
                                  size="lg"
                                  src={holiday.imageUrl}
                                  alt={holiday.name}
                                  className="ring-2 ring-white shadow-md"
                                />
                              ) : (
                                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-indigo-700 text-white text-lg font-bold ring-2 ring-white shadow-md">
                                  {getInitials(holiday.name)}
                                </div>
                              )}
                <div className="text-center sm:text-left">
                  <Typography
                    variant="h5"
                    className="text-gray-900 font-semibold text-lg sm:text-xl"
                  >
                    {holiday.name}
                  </Typography>
                  <Typography className="text-sm text-gray-700">{holiday.date}</Typography>
                </div>
              </CardHeader>

              <CardBody className="p-4 sm:p-6 bg-white">
                <Typography className="text-gray-700 text-sm sm:text-base">
                  {holiday.description}
                </Typography>
              </CardBody>
            </Card>
          );
        })
      )}
    </div>
  );
}
