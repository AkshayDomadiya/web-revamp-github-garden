
import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Button,
  Progress,
} from "@material-tailwind/react";
import {
  UserGroupIcon,
  ClockIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  TrophyIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export function ManagerDashboard() {
  const navigate = useNavigate();

  const teamStats = [
    { title: "Team Members", value: "12", change: "+1", icon: UserGroupIcon, color: "from-indigo-500 to-indigo-600" },
    { title: "Present Today", value: "11", change: "0", icon: ClockIcon, color: "from-green-500 to-green-600" },
    { title: "Team Performance", value: "94%", change: "+2%", icon: ChartBarIcon, color: "from-blue-500 to-blue-600" },
    { title: "Pending Tasks", value: "7", change: "-3", icon: ExclamationTriangleIcon, color: "from-orange-500 to-orange-600" },
  ];

  const teamMembers = [
    { name: "Alice Johnson", role: "Senior Developer", status: "Present", performance: 95 },
    { name: "Bob Smith", role: "UI Designer", status: "Present", performance: 88 },
    { name: "Carol Davis", role: "Developer", status: "On Leave", performance: 92 },
    { name: "David Wilson", role: "QA Engineer", status: "Present", performance: 90 },
  ];

  const upcomingDeadlines = [
    { project: "Website Redesign", deadline: "Dec 15", priority: "High" },
    { project: "Mobile App", deadline: "Dec 20", priority: "Medium" },
    { project: "API Integration", deadline: "Dec 25", priority: "Low" },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <Typography variant="h3" className="font-bold text-gray-800 mb-2">
          Manager Dashboard 🎯
        </Typography>
        <Typography variant="lead" className="text-gray-600">
          Lead your team to success
        </Typography>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {teamStats.map((stat, index) => (
          <Card key={index} className="shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
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
                <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : stat.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-gray-500 ml-1">vs last week</span>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Team Overview & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader floated={false} color="transparent" className="m-0 p-6">
            <Typography variant="h6" className="font-bold text-gray-800">
              👥 Team Overview
            </Typography>
          </CardHeader>
          <CardBody className="pt-0">
            <div className="space-y-4">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <Typography variant="small" className="font-semibold text-gray-800">
                        {member.name}
                      </Typography>
                      <Typography variant="small" className="text-gray-600">
                        {member.role}
                      </Typography>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium mb-2 ${
                      member.status === 'Present' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {member.status}
                    </div>
                    <Typography variant="small" className="text-gray-600">
                      {member.performance}% performance
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader floated={false} color="transparent" className="m-0 p-6">
            <Typography variant="h6" className="font-bold text-gray-800">
              🚀 Quick Actions
            </Typography>
          </CardHeader>
          <CardBody className="pt-0 space-y-3">
            <Button
              onClick={() => navigate("/dashboard/employee")}
              variant="gradient"
              color="purple"
              className="w-full justify-start"
            >
              <UserGroupIcon className="h-5 w-5 mr-3" />
              View Team
            </Button>
            <Button
              onClick={() => navigate("/dashboard/schedule")}
              variant="gradient"
              color="blue"
              className="w-full justify-start"
            >
              <CalendarDaysIcon className="h-5 w-5 mr-3" />
              Manage Schedule
            </Button>
            <Button
              onClick={() => navigate("/dashboard/todays-clock-ins")}
              variant="gradient"
              color="green"
              className="w-full justify-start"
            >
              <ClockIcon className="h-5 w-5 mr-3" />
              Today's Attendance
            </Button>
            <Button
              onClick={() => navigate("/dashboard/late-arrivals")}
              variant="gradient"
              color="orange"
              className="w-full justify-start"
            >
              <ExclamationTriangleIcon className="h-5 w-5 mr-3" />
              Late Arrivals
            </Button>
          </CardBody>
        </Card>
      </div>

      {/* Project Deadlines & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader floated={false} color="transparent" className="m-0 p-6">
            <Typography variant="h6" className="font-bold text-gray-800">
              📅 Upcoming Deadlines
            </Typography>
          </CardHeader>
          <CardBody className="pt-0">
            <div className="space-y-4">
              {upcomingDeadlines.map((project, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <Typography variant="small" className="font-semibold text-gray-800">
                      {project.project}
                    </Typography>
                    <Typography variant="small" className="text-gray-600">
                      Due: {project.deadline}
                    </Typography>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                    {project.priority}
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader floated={false} color="transparent" className="m-0 p-6">
            <Typography variant="h6" className="font-bold text-gray-800">
              🏆 Team Performance
            </Typography>
          </CardHeader>
          <CardBody className="pt-0 space-y-4">
            <div className="text-center p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl">
              <TrophyIcon className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
              <Typography variant="h4" className="font-bold text-gray-800">
                94%
              </Typography>
              <Typography variant="small" className="text-gray-600">
                Overall Team Performance
              </Typography>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Productivity</span>
                <span className="text-sm text-gray-600">92%</span>
              </div>
              <Progress value={92} color="green" className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Quality</span>
                <span className="text-sm text-gray-600">96%</span>
              </div>
              <Progress value={96} color="blue" className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Collaboration</span>
                <span className="text-sm text-gray-600">89%</span>
              </div>
              <Progress value={89} color="purple" className="h-2" />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default ManagerDashboard;
