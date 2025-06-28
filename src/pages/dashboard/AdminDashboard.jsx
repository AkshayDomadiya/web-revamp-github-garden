
import React, { useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  Avatar,
  Chip,
  Progress,
} from "@material-tailwind/react";
import {
  UserGroupIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EllipsisHorizontalIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export function AdminDashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for employee status
  const employeeStatus = [
    { id: 1, name: "Adrian Maranja", status: "WORKING", time: "8:45 AM", avatar: "/img/team-1.jpeg" },
    { id: 2, name: "Altana Diaz", status: "WORKING", time: "8:30 AM", avatar: "/img/team-2.jpeg" },
    { id: 3, name: "Alexis Gonzalez", status: "WORKING", time: "9:00 AM", avatar: "/img/team-3.jpeg" },
    { id: 4, name: "Anthony Rodriguez", status: "WORKING", time: "9:00 AM", avatar: "/img/team-4.jpeg" },
    { id: 5, name: "Boris Fornaris", status: "WORKING", time: "8:45 AM", avatar: "/img/team-1.jpeg" },
    { id: 6, name: "Brianna Talley", status: "WORKING", time: "8:45 AM", avatar: "/img/team-2.jpeg" },
    { id: 7, name: "Carolina Jaime", status: "WORKING", time: "9:00 AM", avatar: "/img/team-3.jpeg" },
    { id: 8, name: "Christopher Casely", status: "WORKING", time: "9:00 AM", avatar: "/img/team-4.jpeg" },
  ];

  // Mock data for overtime approaching
  const overtimeData = [
    { name: "Christopher Casely", workedHours: "30.20 (Weekly)", approaching: "9h 39m to OT1", status: "Working" },
  ];

  // Mock data for time off requests
  const timeOffRequests = [
    { id: 1, name: "Kalina Jaime", hours: "16 Hr(s)", type: "Vacation", dates: "Nov 18 - Nov 19", status: "Pending" },
    { id: 2, name: "Natalia Krasnova", hours: "8 Hr(s)", type: "Floating Holiday", dates: "Oct 8, 2021", status: "Pending" },
    { id: 3, name: "Yens Ferrero", hours: "40 Hr(s)", type: "Vacation", dates: "Nov 1 - Nov 5", status: "Pending" },
  ];

  const filteredEmployees = employeeStatus.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApprove = (id) => {
    console.log(`Approved request ${id}`);
  };

  const handleDeny = (id) => {
    console.log(`Denied request ${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-4 sm:p-6">
      {/* Header */}
      <div className="mb-8">
        <Typography variant="h3" className="font-bold text-gray-900 mb-2 text-2xl sm:text-3xl lg:text-4xl">
          Admin Dashboard
        </Typography>
        <Typography variant="lead" className="text-gray-600 text-sm sm:text-base lg:text-lg">
          Real-time employee monitoring and management
        </Typography>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Employee Status - Left Column */}
        <div className="lg:col-span-1">
          <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm h-fit">
            <CardHeader floated={false} color="transparent" className="m-0 p-6 pb-4">
              <div className="flex items-center justify-between mb-4">
                <Typography variant="h6" className="font-bold text-gray-800 text-lg">
                  Employee Status
                </Typography>
                <Button variant="text" size="sm" className="p-2">
                  <EllipsisHorizontalIcon className="h-5 w-5" />
                </Button>
              </div>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for ID or Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
                <Button variant="text" size="sm" className="absolute right-2 top-1/2 -translate-y-1/2 p-1">
                  <FunnelIcon className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardBody className="pt-0 px-6 pb-6 max-h-80 overflow-y-auto">
              <div className="space-y-3">
                {filteredEmployees.map((employee) => (
                  <div key={employee.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                      <Avatar src={employee.avatar} alt={employee.name} size="sm" className="shrink-0" />
                      <div className="min-w-0 flex-1">
                        <Typography variant="small" className="font-semibold text-gray-800 text-sm truncate">
                          {employee.name}
                        </Typography>
                        <Chip
                          value={employee.status}
                          color="green"
                          size="sm"
                          className="text-xs mt-1"
                        />
                      </div>
                    </div>
                    <Typography variant="small" className="text-gray-600 font-medium text-sm shrink-0 ml-2">
                      {employee.time}
                    </Typography>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm text-gray-600">
                  <span className="flex items-center">
                    <UserGroupIcon className="h-4 w-4 mr-1 text-blue-500" />
                    {filteredEmployees.length} Total
                  </span>
                  <span className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1 text-green-500" />
                    {filteredEmployees.filter(emp => emp.status === 'WORKING').length} Working
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Middle Section - Exceptions & Schedule */}
        <div className="lg:col-span-2 space-y-6">
          {/* Exceptions */}
          <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader floated={false} color="transparent" className="m-0 p-6 pb-4">
              <div className="flex items-center justify-between">
                <Typography variant="h6" className="font-bold text-gray-800 text-lg">
                  Exceptions
                </Typography>
                <Button variant="text" size="sm" className="p-2">
                  <EllipsisHorizontalIcon className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardBody className="pt-0 px-6 pb-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-200 hover:shadow-md transition-shadow">
                  <Typography variant="h4" className="font-bold text-orange-600 text-3xl">
                    17
                  </Typography>
                  <Typography variant="small" className="text-orange-800 text-sm">
                    Arrived Early
                  </Typography>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-xl border border-red-200 hover:shadow-md transition-shadow">
                  <Typography variant="h4" className="font-bold text-red-600 text-3xl">
                    2
                  </Typography>
                  <Typography variant="small" className="text-red-800 text-sm">
                    Arrived Late
                  </Typography>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200 hover:shadow-md transition-shadow">
                  <Typography variant="h4" className="font-bold text-purple-600 text-3xl">
                    0
                  </Typography>
                  <Typography variant="small" className="text-purple-800 text-sm">
                    Left Early
                  </Typography>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                  <Typography variant="h4" className="font-bold text-gray-600 text-3xl">
                    0
                  </Typography>
                  <Typography variant="small" className="text-gray-800 text-sm">
                    Left Late
                  </Typography>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-xl border border-red-200 hover:shadow-md transition-shadow">
                  <Typography variant="h4" className="font-bold text-red-600 text-3xl">
                    27
                  </Typography>
                  <Typography variant="small" className="text-red-800 text-sm">
                    No Show
                  </Typography>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-xl border border-yellow-200 hover:shadow-md transition-shadow">
                  <Typography variant="h4" className="font-bold text-yellow-600 text-3xl">
                    0
                  </Typography>
                  <Typography variant="small" className="text-yellow-800 text-sm">
                    Missing Punch
                  </Typography>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Schedule Monitor and Scheduled Hours */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Schedule Monitor */}
            <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader floated={false} color="transparent" className="m-0 p-6 pb-4">
                <div className="flex items-center justify-between">
                  <Typography variant="h6" className="font-bold text-gray-800 text-lg">
                    Schedule Monitor
                  </Typography>
                  <Button variant="text" size="sm" className="p-2">
                    <EllipsisHorizontalIcon className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 px-6 pb-6">
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle cx="64" cy="64" r="50" stroke="#e5e7eb" strokeWidth="10" fill="none" />
                      <circle cx="64" cy="64" r="50" stroke="#06b6d4" strokeWidth="10" fill="none" 
                              strokeDasharray={`${2.51 * 50 * 1} ${2.51 * 50}`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Typography variant="h4" className="font-bold text-cyan-600 text-4xl">
                          0
                        </Typography>
                        <Typography variant="small" className="text-gray-600 text-sm">
                          Unfilled Open Shift
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center space-x-2">
                    {[1, 2, 3, 4, 5].map((dot) => (
                      <div key={dot} className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Scheduled Hours Chart */}
            <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader floated={false} color="transparent" className="m-0 p-6 pb-4">
                <div className="flex items-center justify-between">
                  <Typography variant="h6" className="font-bold text-gray-800 text-lg">
                    Scheduled Hours
                  </Typography>
                  <Button variant="text" size="sm" className="p-2">
                    <EllipsisHorizontalIcon className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 px-6 pb-6">
                <div className="space-y-3">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                    <div key={day} className="flex items-center justify-between">
                      <Typography variant="small" className="text-gray-600 w-12 text-sm">
                        {day}
                      </Typography>
                      <div className="flex-1 mx-3">
                        <div className="bg-gray-200 rounded-full h-6">
                          <div 
                            className="bg-cyan-500 h-6 rounded-full flex items-center justify-center text-white font-medium text-xs"
                            style={{ width: `${Math.random() * 40 + 60}%` }}
                          >
                            {Math.floor(Math.random() * 200 + 300)}
                          </div>
                        </div>
                      </div>
                      <Typography variant="small" className="text-gray-600 w-16 text-right text-sm">
                        Total Hours
                      </Typography>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Right Column - Total Scheduled Hours */}
        <div className="lg:col-span-1">
          <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader floated={false} color="transparent" className="m-0 p-6 pb-4">
              <div className="flex items-center justify-between">
                <Typography variant="h6" className="font-bold text-gray-800 text-lg">
                  Total Scheduled Hours
                </Typography>
                <Button variant="text" size="sm" className="p-2">
                  <EllipsisHorizontalIcon className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardBody className="pt-0 px-6 pb-6">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle cx="64" cy="64" r="50" stroke="#e5e7eb" strokeWidth="10" fill="none" />
                      <circle cx="64" cy="64" r="50" stroke="#06b6d4" strokeWidth="10" fill="none" 
                              strokeDasharray={`${2.51 * 50 * 0.85} ${2.51 * 50}`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Typography variant="h5" className="font-bold text-cyan-600 text-2xl">
                        2,051
                      </Typography>
                    </div>
                  </div>
                  <Typography variant="small" className="text-gray-800 font-semibold text-sm">
                    This week
                  </Typography>
                  <div className="flex items-center justify-center mt-1">
                    <Typography variant="small" className="text-green-600 font-medium text-sm">
                      1% ↑
                    </Typography>
                  </div>
                  <Typography variant="small" className="text-gray-600 text-sm">
                    Increase from last week
                  </Typography>
                </div>
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle cx="64" cy="64" r="50" stroke="#e5e7eb" strokeWidth="10" fill="none" />
                      <circle cx="64" cy="64" r="50" stroke="#06b6d4" strokeWidth="10" fill="none" 
                              strokeDasharray={`${2.51 * 50 * 0.80} ${2.51 * 50}`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Typography variant="h5" className="font-bold text-cyan-600 text-2xl">
                        2,011
                      </Typography>
                    </div>
                  </div>
                  <Typography variant="small" className="text-gray-800 font-semibold text-sm">
                    Last week
                  </Typography>
                  <div className="flex items-center justify-center mt-1">
                    <Typography variant="small" className="text-green-600 font-medium text-sm">
                      6% ↑
                    </Typography>
                  </div>
                  <Typography variant="small" className="text-gray-600 text-sm">
                    Higher than 4 week average
                  </Typography>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Approaching Overtime */}
        <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader floated={false} color="transparent" className="m-0 p-6 pb-4">
            <div className="flex items-center justify-between">
              <Typography variant="h6" className="font-bold text-gray-800 text-lg">
                Approaching Overtime
              </Typography>
              <Button variant="text" size="sm" className="p-2">
                <EllipsisHorizontalIcon className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardBody className="pt-0 px-6 pb-6">
            {overtimeData.map((employee, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200 gap-3 sm:gap-0">
                <div className="flex items-center space-x-3">
                  <Avatar src="/img/team-4.jpeg" alt={employee.name} size="sm" />
                  <div>
                    <Typography variant="small" className="font-semibold text-gray-800 text-sm">
                      {employee.name}
                    </Typography>
                    <Typography variant="small" className="text-gray-600 text-sm">
                      {employee.workedHours}
                    </Typography>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <Typography variant="small" className="text-orange-600 font-medium text-sm">
                    {employee.approaching}
                  </Typography>
                  <Chip value={employee.status} color="green" size="sm" className="text-xs mt-1" />
                </div>
              </div>
            ))}
            <Typography variant="small" className="text-gray-500 mt-4 text-sm">
              Last Update: September 30, 2021 9:05 AM
            </Typography>
          </CardBody>
        </Card>

        {/* Time Off Requests */}
        <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader floated={false} color="transparent" className="m-0 p-6 pb-4">
            <div className="flex items-center justify-between">
              <Typography variant="h6" className="font-bold text-gray-800 text-lg">
                Time Off Requests
              </Typography>
              <Button variant="text" size="sm" className="p-2">
                <EllipsisHorizontalIcon className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardBody className="pt-0 px-6 pb-6">
            <div className="space-y-4">
              {timeOffRequests.map((request) => (
                <div key={request.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg gap-3 sm:gap-0">
                  <div className="flex items-center space-x-3">
                    <Avatar src="/img/team-2.jpeg" alt={request.name} size="sm" />
                    <div>
                      <Typography variant="small" className="font-semibold text-gray-800 text-sm">
                        {request.name}
                      </Typography>
                      <Typography variant="small" className="text-gray-600 text-sm">
                        {request.hours} • {request.type}
                      </Typography>
                      <Chip value="Pending" color="orange" size="sm" className="text-xs mt-1" />
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <Typography variant="small" className="text-gray-600 mb-2 text-sm">
                      {request.dates}
                    </Typography>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <Button
                        size="sm"
                        color="green"
                        onClick={() => handleApprove(request.id)}
                        className="px-3 py-1 text-xs w-full sm:w-auto"
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        color="red"
                        onClick={() => handleDeny(request.id)}
                        className="px-3 py-1 text-xs w-full sm:w-auto"
                      >
                        Deny
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default AdminDashboard;
