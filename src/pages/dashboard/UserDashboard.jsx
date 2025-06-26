
import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Button,
  Progress,
} from "@material-tailwind/react";
import {
  ClockIcon,
  ChartBarIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  PlayIcon,
  PauseIcon,
  StopIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export function UserDashboard() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClocked, setIsClocked] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [workHours, setWorkHours] = useState("0:00");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const userStats = [
    { title: "Hours Today", value: workHours, change: "+2h", icon: ClockIcon, color: "from-blue-500 to-blue-600" },
    { title: "This Week", value: "32h", change: "+4h", icon: ChartBarIcon, color: "from-green-500 to-green-600" },
    { title: "Leave Balance", value: "12", change: "-1", icon: CalendarDaysIcon, color: "from-purple-500 to-purple-600" },
    { title: "Tasks Done", value: "8", change: "+3", icon: CheckCircleIcon, color: "from-orange-500 to-orange-600" },
  ];

  const upcomingTasks = [
    { task: "Review project proposal", deadline: "Today 2:00 PM", priority: "High" },
    { task: "Team meeting", deadline: "Today 3:30 PM", priority: "Medium" },
    { task: "Submit timesheet", deadline: "Tomorrow 9:00 AM", priority: "Low" },
  ];

  const recentActivities = [
    { action: "Clocked in", time: "9:00 AM", type: "clock" },
    { action: "Started project review", time: "9:30 AM", type: "work" },
    { action: "Completed task #1", time: "11:00 AM", type: "task" },
    { action: "Break time", time: "12:00 PM", type: "break" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      {/* Header */}
      <div className="mb-8">
        <Typography variant="h3" className="font-bold text-gray-900 mb-2">
          Welcome Back! 👋
        </Typography>
        <Typography variant="lead" className="text-gray-600">
          {currentTime.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </Typography>
      </div>

      {/* Time Tracking Card */}
      <Card className="mb-8 shadow-lg border-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <CardBody className="p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="text-center lg:text-left mb-6 lg:mb-0">
              <Typography variant="h2" className="font-bold mb-2">
                {currentTime.toLocaleTimeString()}
              </Typography>
              <Typography variant="h6" className="opacity-90">
                {isClocked ? (onBreak ? "On Break" : "Working") : "Not Clocked In"}
              </Typography>
            </div>
            <div className="flex gap-3">
              {!isClocked ? (
                <Button
                  onClick={() => setIsClocked(true)}
                  className="flex items-center gap-2 bg-white text-purple-600 hover:bg-gray-100"
                  size="lg"
                >
                  <PlayIcon className="h-5 w-5" />
                  Clock In
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => setOnBreak(!onBreak)}
                    className={`flex items-center gap-2 ${
                      onBreak ? "bg-green-500 hover:bg-green-600" : "bg-yellow-500 hover:bg-yellow-600"
                    }`}
                    size="lg"
                  >
                    <PauseIcon className="h-5 w-5" />
                    {onBreak ? "End Break" : "Start Break"}
                  </Button>
                  <Button
                    onClick={() => setIsClocked(false)}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600"
                    size="lg"
                  >
                    <StopIcon className="h-5 w-5" />
                    Clock Out
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {userStats.map((stat, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-white">
            <CardBody className="p-6">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <Typography variant="h4" className="font-bold text-gray-800 mb-1">
                {stat.value}
              </Typography>
              <Typography variant="small" className="text-gray-600 mb-2">
                {stat.title}
              </Typography>
              <div className="flex items-center">
                <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-gray-500 ml-1">today</span>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Quick Actions */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-white">
          <CardHeader floated={false} color="transparent" className="m-0 p-6">
            <Typography variant="h6" className="font-bold text-gray-800">
              🚀 Quick Actions
            </Typography>
          </CardHeader>
          <CardBody className="pt-0 space-y-4">
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
              color="green"
              className="w-full justify-start"
            >
              <ChartBarIcon className="h-5 w-5 mr-3" />
              View Schedule
            </Button>
            <Button
              onClick={() => navigate("/dashboard/leave-request/leave-summary")}
              variant="gradient"
              color="purple"
              className="w-full justify-start"
            >
              <CheckCircleIcon className="h-5 w-5 mr-3" />
              Leave Summary
            </Button>
          </CardBody>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-white">
          <CardHeader floated={false} color="transparent" className="m-0 p-6">
            <Typography variant="h6" className="font-bold text-gray-800">
              📋 Upcoming Tasks
            </Typography>
          </CardHeader>
          <CardBody className="pt-0 space-y-4">
            {upcomingTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                <div>
                  <Typography variant="small" className="font-semibold text-gray-800">
                    {task.task}
                  </Typography>
                  <Typography variant="small" className="text-gray-600">
                    {task.deadline}
                  </Typography>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  task.priority === 'High' ? 'bg-red-100 text-red-800' :
                  task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {task.priority}
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      {/* Recent Activities & Weekly Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader floated={false} color="transparent" className="m-0 p-6">
            <Typography variant="h6" className="font-bold text-gray-800">
              🔔 Recent Activities
            </Typography>
          </CardHeader>
          <CardBody className="pt-0">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.type === 'clock' ? 'bg-green-500' :
                    activity.type === 'work' ? 'bg-blue-500' :
                    activity.type === 'task' ? 'bg-purple-500' :
                    'bg-yellow-500'
                  }`}></div>
                  <div>
                    <Typography variant="small" className="font-medium text-gray-800">
                      {activity.action}
                    </Typography>
                    <Typography variant="small" className="text-gray-600">
                      {activity.time}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card className="shadow-lg border-0 bg-white">
          <CardHeader floated={false} color="transparent" className="m-0 p-6">
            <Typography variant="h6" className="font-bold text-gray-800">
              📊 Weekly Progress
            </Typography>
          </CardHeader>
          <CardBody className="pt-0 space-y-6">
            <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
              <Typography variant="h4" className="font-bold text-gray-800 mb-2">
                80%
              </Typography>
              <Typography variant="small" className="text-gray-600">
                Weekly Goal Achievement
              </Typography>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Work Hours</span>
                <span className="text-sm text-gray-600">32/40 hrs</span>
              </div>
              <Progress value={80} color="blue" className="h-3" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Tasks Completed</span>
                <span className="text-sm text-gray-600">8/10</span>
              </div>
              <Progress value={80} color="green" className="h-3" />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default UserDashboard;
