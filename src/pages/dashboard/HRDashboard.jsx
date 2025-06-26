
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
  ExclamationCircleIcon,
  CheckCircleIcon,
  ChartBarIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export function HRDashboard() {
  const navigate = useNavigate();

  const hrStats = [
    { title: "Total Employees", value: "45", change: "+3", icon: UserGroupIcon, color: "from-blue-500 to-blue-600" },
    { title: "Active Today", value: "42", change: "+2", icon: ClockIcon, color: "from-green-500 to-green-600" },
    { title: "Pending Leaves", value: "8", change: "-2", icon: ExclamationCircleIcon, color: "from-orange-500 to-orange-600" },
    { title: "Approved Today", value: "5", change: "+1", icon: CheckCircleIcon, color: "from-purple-500 to-purple-600" },
  ];

  const recentActivities = [
    { name: "John Doe", action: "submitted sick leave", time: "5 min ago", type: "leave" },
    { name: "Sarah Wilson", action: "clocked in", time: "15 min ago", type: "clock" },
    { name: "Mike Johnson", action: "requested vacation", time: "1 hour ago", type: "leave" },
    { name: "Emma Davis", action: "completed timesheet", time: "2 hours ago", type: "timesheet" },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case "leave": return "🏖️";
      case "clock": return "⏰";
      case "timesheet": return "📊";
      default: return "📋";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <Typography variant="h3" className="font-bold text-gray-800 mb-2">
          HR Dashboard 👥
        </Typography>
        <Typography variant="lead" className="text-gray-600">
          Manage your workforce efficiently
        </Typography>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {hrStats.map((stat, index) => (
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
                <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-gray-500 ml-1">this week</span>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader floated={false} color="transparent" className="m-0 p-6">
            <Typography variant="h6" className="font-bold text-gray-800">
              🚀 Quick Actions
            </Typography>
          </CardHeader>
          <CardBody className="pt-0 space-y-3">
            <Button
              onClick={() => navigate("/dashboard/employee/add")}
              variant="gradient"
              color="blue"
              className="w-full justify-start"
            >
              <UserGroupIcon className="h-5 w-5 mr-3" />
              Add Employee
            </Button>
            <Button
              onClick={() => navigate("/dashboard/pending-leaves")}
              variant="gradient"
              color="orange"
              className="w-full justify-start"
            >
              <ExclamationCircleIcon className="h-5 w-5 mr-3" />
              Review Leaves
            </Button>
            <Button
              onClick={() => navigate("/dashboard/payroll")}
              variant="gradient"
              color="green"
              className="w-full justify-start"
            >
              <DocumentTextIcon className="h-5 w-5 mr-3" />
              Process Payroll
            </Button>
          </CardBody>
        </Card>

        <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader floated={false} color="transparent" className="m-0 p-6">
            <Typography variant="h6" className="font-bold text-gray-800">
              📊 Department Overview
            </Typography>
          </CardHeader>
          <CardBody className="pt-0 space-y-4">
            {[
              { dept: "Engineering", count: 15, total: 20 },
              { dept: "Marketing", count: 8, total: 10 },
              { dept: "Sales", count: 12, total: 15 },
            ].map((dept, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <Typography variant="small" className="font-medium">
                    {dept.dept}
                  </Typography>
                  <Typography variant="small" className="text-gray-600">
                    {dept.count}/{dept.total}
                  </Typography>
                </div>
                <Progress value={(dept.count / dept.total) * 100} color="blue" className="h-2" />
              </div>
            ))}
          </CardBody>
        </Card>

        <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader floated={false} color="transparent" className="m-0 p-6">
            <Typography variant="h6" className="font-bold text-gray-800">
              📈 This Month
            </Typography>
          </CardHeader>
          <CardBody className="pt-0 space-y-4">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium text-green-800">New Hires</span>
              <span className="text-lg font-bold text-green-600">3</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium text-blue-800">Leaves Approved</span>
              <span className="text-lg font-bold text-blue-600">12</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <span className="text-sm font-medium text-purple-800">Training Hours</span>
              <span className="text-lg font-bold text-purple-600">45</span>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader floated={false} color="transparent" className="m-0 p-6">
          <Typography variant="h6" className="font-bold text-gray-800">
            🔔 Recent Activities
          </Typography>
        </CardHeader>
        <CardBody className="pt-0">
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                  <div>
                    <Typography variant="small" className="font-semibold text-gray-800">
                      {activity.name}
                    </Typography>
                    <Typography variant="small" className="text-gray-600">
                      {activity.action}
                    </Typography>
                  </div>
                </div>
                <Typography variant="small" className="text-gray-500">
                  {activity.time}
                </Typography>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default HRDashboard;
