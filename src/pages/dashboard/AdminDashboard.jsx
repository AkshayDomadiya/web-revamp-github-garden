
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
  BuildingOfficeIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  BellIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export function AdminDashboard() {
  const navigate = useNavigate();

  const adminStats = [
    { title: "Total Employees", value: "156", change: "+12", icon: UserGroupIcon, color: "from-blue-500 to-blue-600" },
    { title: "Departments", value: "8", change: "+1", icon: BuildingOfficeIcon, color: "from-purple-500 to-purple-600" },
    { title: "Monthly Revenue", value: "$2.4M", change: "+8%", icon: CurrencyDollarIcon, color: "from-green-500 to-green-600" },
    { title: "System Health", value: "99.9%", change: "+0.1%", icon: ShieldCheckIcon, color: "from-emerald-500 to-emerald-600" },
  ];

  const departmentData = [
    { name: "Engineering", employees: 45, budget: "$450K", utilization: 92 },
    { name: "Sales", employees: 32, budget: "$320K", utilization: 88 },
    { name: "Marketing", employees: 28, budget: "$280K", utilization: 85 },
    { name: "HR", employees: 15, budget: "$150K", utilization: 78 },
    { name: "Finance", employees: 12, budget: "$120K", utilization: 95 },
  ];

  const systemAlerts = [
    { type: "info", message: "System backup completed successfully", time: "2 hours ago" },
    { type: "warning", message: "High server load detected", time: "4 hours ago" },
    { type: "success", message: "New security patch installed", time: "1 day ago" },
  ];

  const getAlertIcon = (type) => {
    switch (type) {
      case "info": return "ℹ️";
      case "warning": return "⚠️";
      case "success": return "✅";
      default: return "📋";
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case "info": return "bg-blue-50 border-blue-200";
      case "warning": return "bg-yellow-50 border-yellow-200";
      case "success": return "bg-green-50 border-green-200";
      default: return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <Typography variant="h3" className="font-bold text-gray-800 mb-2">
          Admin Dashboard 🎛️
        </Typography>
        <Typography variant="lead" className="text-gray-600">
          Complete system oversight and control
        </Typography>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {adminStats.map((stat, index) => (
          <Card key={index} className="shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm">
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
                <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-blue-600'}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-gray-500 ml-1">this month</span>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Admin Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader floated={false} color="transparent" className="m-0 p-6">
            <Typography variant="h6" className="font-bold text-gray-800">
              🔧 System Controls
            </Typography>
          </CardHeader>
          <CardBody className="pt-0 space-y-3">
            <Button
              onClick={() => navigate("/dashboard/employee")}
              variant="gradient"
              color="blue"
              className="w-full justify-start"
            >
              <UserGroupIcon className="h-5 w-5 mr-3" />
              Manage Users
            </Button>
            <Button
              onClick={() => navigate("/dashboard/payroll")}
              variant="gradient"
              color="green"
              className="w-full justify-start"
            >
              <CurrencyDollarIcon className="h-5 w-5 mr-3" />
              Payroll System
            </Button>
            <Button
              variant="gradient"
              color="purple"
              className="w-full justify-start"
            >
              <Cog6ToothIcon className="h-5 w-5 mr-3" />
              System Settings
            </Button>
            <Button
              variant="gradient"
              color="orange"
              className="w-full justify-start"
            >
              <DocumentTextIcon className="h-5 w-5 mr-3" />
              Generate Reports
            </Button>
          </CardBody>
        </Card>

        <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader floated={false} color="transparent" className="m-0 p-6">
            <Typography variant="h6" className="font-bold text-gray-800">
              🏢 Department Overview
            </Typography>
          </CardHeader>
          <CardBody className="pt-0">
            <div className="space-y-4">
              {departmentData.slice(0, 3).map((dept, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <Typography variant="small" className="font-semibold text-gray-800">
                      {dept.name}
                    </Typography>
                    <Typography variant="small" className="text-gray-600">
                      {dept.employees} employees
                    </Typography>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <Typography variant="small" className="text-gray-600">
                      Budget: {dept.budget}
                    </Typography>
                    <Typography variant="small" className="text-gray-600">
                      {dept.utilization}%
                    </Typography>
                  </div>
                  <Progress value={dept.utilization} color="blue" className="h-2" />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader floated={false} color="transparent" className="m-0 p-6">
            <Typography variant="h6" className="font-bold text-gray-800">
              📊 Key Metrics
            </Typography>
          </CardHeader>
          <CardBody className="pt-0 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <Typography variant="h5" className="font-bold text-blue-600">
                  94%
                </Typography>
                <Typography variant="small" className="text-blue-800">
                  Attendance Rate
                </Typography>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <Typography variant="h5" className="font-bold text-green-600">
                  98%
                </Typography>
                <Typography variant="small" className="text-green-800">
                  Satisfaction
                </Typography>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <Typography variant="h5" className="font-bold text-purple-600">
                  87%
                </Typography>
                <Typography variant="small" className="text-purple-800">
                  Productivity
                </Typography>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-xl">
                <Typography variant="h5" className="font-bold text-orange-600">
                  12%
                </Typography>
                <Typography variant="small" className="text-orange-800">
                  Turnover Rate
                </Typography>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* System Alerts & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader floated={false} color="transparent" className="m-0 p-6">
            <Typography variant="h6" className="font-bold text-gray-800">
              🚨 System Alerts
            </Typography>
          </CardHeader>
          <CardBody className="pt-0">
            <div className="space-y-4">
              {systemAlerts.map((alert, index) => (
                <div key={index} className={`p-4 rounded-xl border-2 ${getAlertColor(alert.type)}`}>
                  <div className="flex items-start space-x-3">
                    <div className="text-xl">{getAlertIcon(alert.type)}</div>
                    <div className="flex-1">
                      <Typography variant="small" className="font-medium text-gray-800">
                        {alert.message}
                      </Typography>
                      <Typography variant="small" className="text-gray-600 mt-1">
                        {alert.time}
                      </Typography>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader floated={false} color="transparent" className="m-0 p-6">
            <Typography variant="h6" className="font-bold text-gray-800">
              📈 Performance Analytics
            </Typography>
          </CardHeader>
          <CardBody className="pt-0">
            <div className="space-y-6">
              <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <ChartBarIcon className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                <Typography variant="h4" className="font-bold text-gray-800">
                  Revenue Growth
                </Typography>
                <Typography variant="h6" className="text-green-600 font-semibold">
                  +15.3%
                </Typography>
                <Typography variant="small" className="text-gray-600">
                  Compared to last quarter
                </Typography>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Employee Satisfaction</span>
                  <span className="text-sm text-gray-600">98%</span>
                </div>
                <Progress value={98} color="green" className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">System Uptime</span>
                  <span className="text-sm text-gray-600">99.9%</span>
                </div>
                <Progress value={99.9} color="blue" className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Security Score</span>
                  <span className="text-sm text-gray-600">95%</span>
                </div>
                <Progress value={95} color="purple" className="h-2" />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default AdminDashboard;
