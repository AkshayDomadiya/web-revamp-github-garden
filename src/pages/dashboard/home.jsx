import React, { useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "@material-tailwind/react";
import {
  ClockIcon,
  PencilSquareIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/solid";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import { statisticsCardsData, statisticsChartsData } from "@/data";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "guest";

  const cardRoutes = {
    "Total Employees": "/employee",
    "Today's Clock-ins": "/todays-clock-ins",
    "Late Arrivals": "/late-arrivals",
    "Pending Leaves": "/pending-leaves",
    "Approved Leaves": "/approved-leaves",
    "Upcoming Holidays": "/upcoming-holidays",
  };

  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);
  const [breakInTime, setBreakInTime] = useState(null);
  const [breakOutTime, setBreakOutTime] = useState(null);
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);

  const formatTime = (time) => {
    if (!time) return "00:00:00";
    const date = new Date(time);
    return date.toLocaleTimeString();
  };

  const handleClockIn = () => {
    setClockInTime(new Date());
    setIsClockedIn(true);
  };

  const handleClockOut = () => {
    setClockOutTime(new Date());
    setIsClockedIn(false);
  };

  const handleBreakIn = () => {
    setBreakInTime(new Date());
    setIsOnBreak(true);
  };

  const handleBreakOut = () => {
    setBreakOutTime(new Date());
    setIsOnBreak(false);
  };

  return (
    <div className="mt-10 px-4">
      {/* Summary Cards */}
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsCardsData
  .filter((card) => card.roles?.includes(role)) // 🔥 Filter based on role
  .map(({ icon, title, footer, ...rest }) => (
    <div
      key={title}
      className="cursor-pointer transition-transform hover:scale-[1.03]"
      onClick={() => {
        const route = cardRoutes[title];
        if (route) navigate(`/dashboard${route}`);
      }}
    >
      <StatisticsCard
        {...rest}
        title={title}
        icon={React.createElement(icon, {
          className: "w-6 h-6 text-white",
        })}
        footer={
          <Typography className="font-normal text-blue-gray-600">
            <strong className={footer.color}>{footer.value}</strong>
            &nbsp;{footer.label}
          </Typography>
        }
      />
    </div>
))}
      </div>

      {/* Time Tracking */}
      <div className="mb-6">
        <Card className="border border-blue-gray-200 rounded-lg shadow-lg">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6 flex justify-between items-center"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Time Tracking
              </Typography>
              <Typography
                variant="small"
                className="flex items-center gap-1 font-normal text-blue-gray-600"
              >
                Track your daily working and break hours
              </Typography>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {!isClockedIn ? (
                <button
                  onClick={handleClockIn}
                  className="bg-gradient-to-r from-green-400 to-green-600 text-white py-2 px-6 rounded-lg text-lg font-semibold transition-all hover:scale-105 hover:shadow-lg"
                >
                  Clock In
                </button>
              ) : !isOnBreak ? (
                <>
                  <button
                    onClick={handleBreakIn}
                    className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-2 px-6 rounded-lg text-lg font-semibold transition-all hover:scale-105 hover:shadow-lg"
                  >
                    Break In
                  </button>
                  <button
                    onClick={handleClockOut}
                    className="bg-gradient-to-r from-red-400 to-red-600 text-white py-2 px-6 rounded-lg text-lg font-semibold transition-all hover:scale-105 hover:shadow-lg"
                  >
                    Clock Out
                  </button>
                </>
              ) : (
                <button
                  onClick={handleBreakOut}
                  className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-6 rounded-lg text-lg font-semibold transition-all hover:scale-105 hover:shadow-lg"
                >
                  Break Out
                </button>
              )}
            </div>
          </CardHeader>

          <CardBody className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {[
                {
                  label: "Clock In",
                  value: formatTime(clockInTime),
                  icon: "🕘",
                  iconBg: "bg-green-500", // Green background for Clock In
                },
                {
                  label: "Break In",
                  value: formatTime(breakInTime),
                  icon: "☕",
                  iconBg: "bg-yellow-500", // Yellow background for Break In
                },
                {
                  label: "Break Out",
                  value: formatTime(breakOutTime),
                  icon: "🔁",
                  iconBg: "bg-blue-500", // Blue background for Break Out
                },
                {
                  label: "Clock Out",
                  value: formatTime(clockOutTime),
                  icon: "🕔",
                  iconBg: "bg-red-500", // Red background for Clock Out
                },
              ].map(({ label, value, icon, iconBg }, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center border-2 border-blue-gray-300 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <div
                    className={`w-16 h-16 flex items-center justify-center rounded-full text-white text-xl ${iconBg}`}
                  >
                    {icon}
                  </div>
                  <Typography
                    variant="h6"
                    className="mt-3 text-blue-gray-800 text-center font-medium"
                  >
                    {label}
                  </Typography>
                  <Typography
                    variant="small"
                    className="text-sm text-blue-gray-600 text-center"
                  >
                    {value}
                  </Typography>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Charts + Activities */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography variant="small" className="flex items-center text-blue-gray-600">
                <ClockIcon className="h-4 w-4 mr-1 text-blue-gray-400" />
                {props.footer}
              </Typography>
            }
          />
        ))}

        {/* Recent Activities */}
        <Card className="shadow-lg rounded-xl">
          <CardHeader variant="gradient" color="gray" floated={false} className="mb-8 p-6 justify-between items-center text-white">
            <Typography variant="h6">
              Recent Activities
            </Typography>
            <Typography variant="small">
              Latest updates from employees
            </Typography>
          </CardHeader>
          <CardBody className="space-y-4 pt-2">
            {[
              {
                name: "John Doe",
                action: "applied for Sick Leave",
                time: "10 mins ago",
                icon: PencilSquareIcon,
                color: "text-blue-500",
              },
              {
                name: "Alice",
                action: "clocked in at 9:00 AM",
                time: "20 mins ago",
                icon: ClockIcon,
                color: "text-green-500",
              },
              {
                name: "Bob",
                action: "clocked out at 5:00 PM",
                time: "Yesterday",
                icon: ClockIcon,
                color: "text-red-500",
              },
              {
                name: "Emily",
                action: "requested Earned Leave",
                time: "2 days ago",
                icon: CalendarDaysIcon,
                color: "text-purple-500",
              },
            ].map(({ name, action, time, icon, color }, i) => (
              <div key={i} className="flex gap-4 items-start">
                {React.createElement(icon, {
                  className: `h-5 w-5 mt-1 ${color}`,
                })}
                <div>
                  <Typography variant="small" className="font-medium text-blue-gray-800">
                    {name}
                  </Typography>
                  <Typography variant="small" className="text-xs text-blue-gray-500">
                    {action} &mdash; <span className="italic">{time}</span>
                  </Typography>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      {/* Birthdays & Attendance */}
      <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Birthdays Card */}
        <Card className="shadow-xl rounded-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader
            floated={false}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-6 border-b border-blue-gray-100"
          >
            <Typography variant="h6" color="white">
              Upcoming Birthdays
            </Typography>
            <Typography variant="small" className="text-white opacity-80">
              Celebrating team members this week
            </Typography>
          </CardHeader>
          <CardBody className="space-y-4 pt-2">
            {[
              { name: "Sophia Johnson", date: "May 6", iconColor: "text-pink-500" },
              { name: "David Lee", date: "May 8", iconColor: "text-yellow-500" },
              { name: "Megan Fox", date: "May 10", iconColor: "text-green-500" },
            ].map(({ name, date, iconColor }, i) => (
              <div key={i} className="flex gap-4 items-start hover:bg-gray-100 p-2 rounded-lg transition-all">
                <CalendarDaysIcon className={`h-6 w-6 mt-1 ${iconColor}`} />
                <div>
                  <Typography variant="small" className="font-medium text-blue-gray-800">
                    {name}
                  </Typography>
                  <Typography variant="small" className="text-xs text-blue-gray-500">
                    Birthday on <span className="italic">{date}</span>
                  </Typography>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>

        {/* Today's Attendance Card */}
        <Card className="shadow-xl rounded-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader
            floated={false}
            className="bg-gradient-to-r from-teal-400 to-teal-600 text-white p-6 border-b border-blue-gray-100"
          >
            <Typography variant="h6" color="white">
              Today's Attendance
            </Typography>
            <Typography variant="small" className="text-white opacity-80">
              Attendance summary for {new Date().toLocaleDateString()}
            </Typography>
          </CardHeader>
          <CardBody className="space-y-4 pt-2">
            {[
              { label: "Present", count: 24, color: "text-green-600" },
              { label: "Absent", count: 5, color: "text-red-500" },
              { label: "On Leave", count: 3, color: "text-blue-500" },
            ].map(({ label, count, color }, i) => (
              <div key={i} className="flex justify-between items-center hover:bg-gray-100 p-2 rounded-lg transition-all">
                <Typography variant="small" className="font-medium text-blue-gray-700">
                  {label}
                </Typography>
                <Typography variant="small" className={`font-bold ${color}`}>
                  {count}
                </Typography>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Home;
