
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
  CalendarDaysIcon,
  UserIcon,
  BellIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export function UserDashboard() {
  const navigate = useNavigate();
  const [clockInTime, setClockInTime] = useState<Date | null>(null);
  const [clockOutTime, setClockOutTime] = useState<Date | null>(null);
  const [breakInTime, setBreakInTime] = useState<Date | null>(null);
  const [breakOutTime, setBreakOutTime] = useState<Date | null>(null);
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);

  const formatTime = (time: Date | null) => {
    if (!time) return "00:00:00";
    return time.toLocaleTimeString();
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <Typography variant="h3" className="font-bold text-gray-800">
              Welcome back! 👋
            </Typography>
            <Typography variant="lead" className="text-gray-600 mt-2">
              Ready to make today productive?
            </Typography>
          </div>
          <div className="hidden md:block">
            <div className="text-right">
              <Typography variant="h6" className="text-gray-700">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Typography>
              <Typography variant="small" className="text-gray-500">
                {new Date().toLocaleTimeString()}
              </Typography>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-green-400 to-green-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="h4" className="font-bold">
                  8h 30m
                </Typography>
                <Typography variant="small" className="opacity-80">
                  Hours This Week
                </Typography>
              </div>
              <ClockIcon className="h-12 w-12 opacity-80" />
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="h4" className="font-bold">
                  3
                </Typography>
                <Typography variant="small" className="opacity-80">
                  Leave Days Left
                </Typography>
              </div>
              <CalendarDaysIcon className="h-12 w-12 opacity-80" />
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-r from-purple-400 to-purple-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="h4" className="font-bold">
                  95%
                </Typography>
                <Typography variant="small" className="opacity-80">
                  Attendance Rate
                </Typography>
              </div>
              <UserIcon className="h-12 w-12 opacity-80" />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Time Tracking Card */}
      <Card className="mb-8 shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader floated={false} shadow={false} color="transparent" className="m-0 p-6">
          <Typography variant="h5" color="blue-gray" className="font-bold mb-2">
            ⏰ Time Tracking
          </Typography>
          <Typography variant="small" className="text-gray-600">
            Track your daily working and break hours
          </Typography>
        </CardHeader>
        <CardBody className="pt-0">
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            {!isClockedIn ? (
              <Button
                onClick={handleClockIn}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-8 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                🚀 Clock In
              </Button>
            ) : !isOnBreak ? (
              <>
                <Button
                  onClick={handleBreakIn}
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 px-8 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  ☕ Break In
                </Button>
                <Button
                  onClick={handleClockOut}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-8 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  🏁 Clock Out
                </Button>
              </>
            ) : (
              <Button
                onClick={handleBreakOut}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-8 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                🔙 Break Out
              </Button>
            )}
          </div>

          {/* Time Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              { label: "Clock In", value: formatTime(clockInTime), icon: "🕘", color: "from-green-400 to-green-600" },
              { label: "Break In", value: formatTime(breakInTime), icon: "☕", color: "from-yellow-400 to-yellow-600" },
              { label: "Break Out", value: formatTime(breakOutTime), icon: "🔄", color: "from-blue-400 to-blue-600" },
              { label: "Clock Out", value: formatTime(clockOutTime), icon: "🕔", color: "from-red-400 to-red-600" },
            ].map(({ label, value, icon, color }, index) => (
              <div key={index} className={`bg-gradient-to-br ${color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
                <div className="text-center">
                  <div className="text-3xl mb-3">{icon}</div>
                  <Typography variant="h6" className="font-bold mb-2">
                    {label}
                  </Typography>
                  <Typography variant="h5" className="font-mono">
                    {value}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader floated={false} color="transparent" className="m-0 p-6">
            <Typography variant="h6" className="font-bold text-gray-800">
              📋 Quick Actions
            </Typography>
          </CardHeader>
          <CardBody className="pt-0 space-y-3">
            <Button
              onClick={() => navigate("/dashboard/leave-request")}
              variant="gradient"
              color="blue"
              className="w-full justify-start"
            >
              <CalendarDaysIcon className="h-5 w-5 mr-3" />
              Request Leave
            </Button>
            <Button
              onClick={() => navigate("/dashboard/schedule")}
              variant="gradient"
              color="purple"
              className="w-full justify-start"
            >
              <ClockIcon className="h-5 w-5 mr-3" />
              View Schedule
            </Button>
            <Button
              onClick={() => navigate("/dashboard/upcoming-holidays")}
              variant="gradient"
              color="green"
              className="w-full justify-start"
            >
              <BellIcon className="h-5 w-5 mr-3" />
              Upcoming Holidays
            </Button>
          </CardBody>
        </Card>

        <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader floated={false} color="transparent" className="m-0 p-6">
            <Typography variant="h6" className="font-bold text-gray-800">
              🎉 Upcoming Events
            </Typography>
          </CardHeader>
          <CardBody className="pt-0 space-y-4">
            {[
              { event: "Team Meeting", date: "Today, 2:00 PM", color: "bg-blue-100 text-blue-800" },
              { event: "Sarah's Birthday", date: "Tomorrow", color: "bg-pink-100 text-pink-800" },
              { event: "Monthly Review", date: "Friday", color: "bg-purple-100 text-purple-800" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div>
                  <Typography variant="small" className="font-semibold">
                    {item.event}
                  </Typography>
                  <Typography variant="small" className="text-gray-600">
                    {item.date}
                  </Typography>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${item.color}`}>
                  📅
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default UserDashboard;
