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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 p-3 sm:p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <Typography variant="h3" className="font-bold text-gray-800 mb-2 text-xl sm:text-2xl lg:text-3xl">
          Admin Dashboard
        </Typography>
        <Typography variant="lead" className="text-gray-600 text-sm sm:text-base">
          Real-time employee monitoring and management
        </Typography>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 mb-6">
        {/* Employee Status - Left Column */}
        <div className="lg:col-span-4 xl:col-span-3">
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm h-fit">
            <CardHeader floated={false} color="transparent" className="m-0 p-4 lg:p-6 pb-3 lg:pb-4">
              <div className="flex items-center justify-between">
                <Typography variant="h6" className="font-bold text-gray-800 text-base lg:text-lg">
                  Employee Status
                </Typography>
                <Button variant="text" size="sm" className="p-2 hidden sm:block">
                  <EllipsisHorizontalIcon className="h-5 w-5" />
                </Button>
              </div>
              <div className="mt-3 lg:mt-4 relative">
                <Input
                  type="text"
                  placeholder="Search for ID or Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 text-sm"
                  icon={<MagnifyingGlassIcon className="h-4 w-4 lg:h-5 lg:w-5" />}
                />
                <Button variant="text" size="sm" className="absolute right-2 top-1/2 -translate-y-1/2 p-1">
                  <FunnelIcon className="h-3 w-3 lg:h-4 lg:w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardBody className="pt-0 px-4 lg:px-6 pb-4 lg:pb-6 max-h-80 lg:max-h-96 overflow-y-auto">
              <div className="space-y-2 lg:space-y-3">
                {filteredEmployees.map((employee) => (
                  <div key={employee.id} className="flex items-center justify-between p-2 lg:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-2 lg:space-x-3 min-w-0 flex-1">
                      <Avatar src={employee.avatar} alt={employee.name} size="sm" className="shrink-0" />
                      <div className="min-w-0 flex-1">
                        <Typography variant="small" className="font-semibold text-gray-800 text-xs lg:text-sm truncate">
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
                    <Typography variant="small" className="text-gray-600 font-medium text-xs lg:text-sm shrink-0 ml-2">
                      {employee.time}
                    </Typography>
                  </div>
                ))}
              </div>
              <div className="mt-3 lg:mt-4 pt-3 lg:pt-4 border-t border-gray-200">
                <div className="flex justify-between text-xs lg:text-sm text-gray-600">
                  <span className="flex items-center">
                    <UserGroupIcon className="h-3 w-3 lg:h-4 lg:w-4 mr-1 text-blue-500" />
                    {filteredEmployees.length} Total
                  </span>
                  <span className="flex items-center">
                    <ClockIcon className="h-3 w-3 lg:h-4 lg:w-4 mr-1 text-green-500" />
                    {filteredEmployees.filter(emp => emp.status === 'WORKING').length} Working
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Right Column - Exceptions and Scheduled Hours */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-4 lg:space-y-6">
          {/* Exceptions and Total Scheduled Hours Row */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
            {/* Exceptions */}
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader floated={false} color="transparent" className="m-0 p-4 lg:p-6 pb-3 lg:pb-4">
                <div className="flex items-center justify-between">
                  <Typography variant="h6" className="font-bold text-gray-800 text-base lg:text-lg">
                    Exceptions
                  </Typography>
                  <Button variant="text" size="sm" className="p-2 hidden sm:block">
                    <EllipsisHorizontalIcon className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 px-4 lg:px-6 pb-4 lg:pb-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-2 gap-3 lg:gap-4">
                  <div className="text-center p-3 lg:p-4 bg-orange-50 rounded-xl border border-orange-200">
                    <Typography variant="h4" className="font-bold text-orange-600 text-2xl lg:text-3xl xl:text-4xl">
                      17
                    </Typography>
                    <Typography variant="small" className="text-orange-800 text-xs lg:text-sm">
                      Arrived Early
                    </Typography>
                  </div>
                  <div className="text-center p-3 lg:p-4 bg-red-50 rounded-xl border border-red-200">
                    <Typography variant="h4" className="font-bold text-red-600 text-2xl lg:text-3xl xl:text-4xl">
                      2
                    </Typography>
                    <Typography variant="small" className="text-red-800 text-xs lg:text-sm">
                      Arrived Late
                    </Typography>
                  </div>
                  <div className="text-center p-3 lg:p-4 bg-purple-50 rounded-xl border border-purple-200">
                    <Typography variant="h4" className="font-bold text-purple-600 text-2xl lg:text-3xl xl:text-4xl">
                      0
                    </Typography>
                    <Typography variant="small" className="text-purple-800 text-xs lg:text-sm">
                      Left Early
                    </Typography>
                  </div>
                  <div className="text-center p-3 lg:p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <Typography variant="h4" className="font-bold text-gray-600 text-2xl lg:text-3xl xl:text-4xl">
                      0
                    </Typography>
                    <Typography variant="small" className="text-gray-800 text-xs lg:text-sm">
                      Left Late
                    </Typography>
                  </div>
                  <div className="text-center p-3 lg:p-4 bg-red-50 rounded-xl border border-red-200">
                    <Typography variant="h4" className="font-bold text-red-600 text-2xl lg:text-3xl xl:text-4xl">
                      27
                    </Typography>
                    <Typography variant="small" className="text-red-800 text-xs lg:text-sm">
                      No Show
                    </Typography>
                  </div>
                  <div className="text-center p-3 lg:p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                    <Typography variant="h4" className="font-bold text-yellow-600 text-2xl lg:text-3xl xl:text-4xl">
                      0
                    </Typography>
                    <Typography variant="small" className="text-yellow-800 text-xs lg:text-sm">
                      Missing Punch
                    </Typography>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Total Scheduled Hours */}
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader floated={false} color="transparent" className="m-0 p-4 lg:p-6 pb-3 lg:pb-4">
                <div className="flex items-center justify-between">
                  <Typography variant="h6" className="font-bold text-gray-800 text-base lg:text-lg">
                    Total Scheduled Hours
                  </Typography>
                  <Button variant="text" size="sm" className="p-2 hidden sm:block">
                    <EllipsisHorizontalIcon className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 px-4 lg:px-6 pb-4 lg:pb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                  <div className="text-center">
                    <div className="relative w-20 h-20 lg:w-24 lg:h-24 mx-auto mb-3 lg:mb-4">
                      <svg className="w-20 h-20 lg:w-24 lg:h-24 transform -rotate-90">
                        <circle cx="40" cy="40" r="32" stroke="#e5e7eb" strokeWidth="6" fill="none" className="lg:hidden" />
                        <circle cx="40" cy="40" r="32" stroke="#06b6d4" strokeWidth="6" fill="none" 
                                strokeDasharray={`${2.51 * 32 * 0.85} ${2.51 * 32}`} strokeLinecap="round" className="lg:hidden" />
                        <circle cx="48" cy="48" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" className="hidden lg:block" />
                        <circle cx="48" cy="48" r="40" stroke="#06b6d4" strokeWidth="8" fill="none" 
                                strokeDasharray={`${2.51 * 40 * 0.85} ${2.51 * 40}`} strokeLinecap="round" className="hidden lg:block" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Typography variant="h5" className="font-bold text-cyan-600 text-sm lg:text-base xl:text-lg">
                          2,051
                        </Typography>
                      </div>
                    </div>
                    <Typography variant="small" className="text-gray-800 font-semibold text-xs lg:text-sm">
                      This week
                    </Typography>
                    <div className="flex items-center justify-center mt-1">
                      <Typography variant="small" className="text-green-600 font-medium text-xs lg:text-sm">
                        1% ↑
                      </Typography>
                    </div>
                    <Typography variant="small" className="text-gray-600 text-xs lg:text-sm">
                      Increase from last week
                    </Typography>
                  </div>
                  <div className="text-center">
                    <div className="relative w-20 h-20 lg:w-24 lg:h-24 mx-auto mb-3 lg:mb-4">
                      <svg className="w-20 h-20 lg:w-24 lg:h-24 transform -rotate-90">
                        <circle cx="40" cy="40" r="32" stroke="#e5e7eb" strokeWidth="6" fill="none" className="lg:hidden" />
                        <circle cx="40" cy="40" r="32" stroke="#06b6d4" strokeWidth="6" fill="none" 
                                strokeDasharray={`${2.51 * 32 * 0.80} ${2.51 * 32}`} strokeLinecap="round" className="lg:hidden" />
                        <circle cx="48" cy="48" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" className="hidden lg:block" />
                        <circle cx="48" cy="48" r="40" stroke="#06b6d4" strokeWidth="8" fill="none" 
                                strokeDasharray={`${2.51 * 40 * 0.80} ${2.51 * 40}`} strokeLinecap="round" className="hidden lg:block" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Typography variant="h5" className="font-bold text-cyan-600 text-sm lg:text-base xl:text-lg">
                          2,011
                        </Typography>
                      </div>
                    </div>
                    <Typography variant="small" className="text-gray-800 font-semibold text-xs lg:text-sm">
                      Last week
                    </Typography>
                    <div className="flex items-center justify-center mt-1">
                      <Typography variant="small" className="text-green-600 font-medium text-xs lg:text-sm">
                        6% ↑
                      </Typography>
                    </div>
                    <Typography variant="small" className="text-gray-600 text-xs lg:text-sm">
                      Higher than 4 week average
                    </Typography>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Schedule Monitor and Scheduled Hours Charts Row */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
            {/* Schedule Monitor */}
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader floated={false} color="transparent" className="m-0 p-4 lg:p-6 pb-3 lg:pb-4">
                <div className="flex items-center justify-between">
                  <Typography variant="h6" className="font-bold text-gray-800 text-base lg:text-lg">
                    Schedule Monitor
                  </Typography>
                  <Button variant="text" size="sm" className="p-2 hidden sm:block">
                    <EllipsisHorizontalIcon className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 px-4 lg:px-6 pb-4 lg:pb-6">
                <div className="text-center">
                  <div className="relative w-24 h-24 lg:w-32 lg:h-32 mx-auto mb-3 lg:mb-4">
                    <svg className="w-24 h-24 lg:w-32 lg:h-32 transform -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" className="lg:hidden" />
                      <circle cx="48" cy="48" r="40" stroke="#06b6d4" strokeWidth="8" fill="none" 
                              strokeDasharray={`${2.51 * 40 * 1} ${2.51 * 40}`} strokeLinecap="round" className="lg:hidden" />
                      <circle cx="64" cy="64" r="50" stroke="#e5e7eb" strokeWidth="10" fill="none" className="hidden lg:block" />
                      <circle cx="64" cy="64" r="50" stroke="#06b6d4" strokeWidth="10" fill="none" 
                              strokeDasharray={`${2.51 * 50 * 1} ${2.51 * 50}`} strokeLinecap="round" className="hidden lg:block" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Typography variant="h4" className="font-bold text-cyan-600 text-xl lg:text-3xl xl:text-4xl">
                          0
                        </Typography>
                        <Typography variant="small" className="text-gray-600 text-xs lg:text-sm">
                          Unfilled Open Shift
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center space-x-1 lg:space-x-2">
                    {[1, 2, 3, 4, 5].map((dot) => (
                      <div key={dot} className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-cyan-500 rounded-full"></div>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Scheduled Hours Chart */}
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader floated={false} color="transparent" className="m-0 p-4 lg:p-6 pb-3 lg:pb-4">
                <div className="flex items-center justify-between">
                  <Typography variant="h6" className="font-bold text-gray-800 text-base lg:text-lg">
                    Scheduled Hours
                  </Typography>
                  <Button variant="text" size="sm" className="p-2 hidden sm:block">
                    <EllipsisHorizontalIcon className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 px-4 lg:px-6 pb-4 lg:pb-6">
                <div className="space-y-1.5 lg:space-y-2">
                  {['Sun 10/24', 'Mon 10/25', 'Tue 10/26', 'Wed 10/27', 'Thu 10/28', 'Fri 10/29', 'Sat 10/30'].map((day, index) => (
                    <div key={day} className="flex items-center justify-between">
                      <Typography variant="small" className="text-gray-600 w-12 lg:w-16 text-xs lg:text-sm">
                        {day.split(' ')[0]}
                      </Typography>
                      <div className="flex-1 mx-2 lg:mx-3">
                        <div className="bg-gray-200 rounded-full h-4 lg:h-6">
                          <div 
                            className="bg-cyan-500 h-4 lg:h-6 rounded-full flex items-center justify-center"
                            style={{ width: `${Math.random() * 40 + 60}%` }}
                          >
                            <Typography variant="small" className="text-white font-medium text-xs">
                              {Math.floor(Math.random() * 200 + 300)}
                            </Typography>
                          </div>
                        </div>
                      </div>
                      <Typography variant="small" className="text-gray-600 w-12 lg:w-16 text-right text-xs lg:text-sm">
                        Total Hours
                      </Typography>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        {/* Approaching Overtime */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader floated={false} color="transparent" className="m-0 p-4 lg:p-6 pb-3 lg:pb-4">
            <div className="flex items-center justify-between">
              <Typography variant="h6" className="font-bold text-gray-800 text-base lg:text-lg">
                Approaching Overtime
              </Typography>
              <Button variant="text" size="sm" className="p-2 hidden sm:block">
                <EllipsisHorizontalIcon className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardBody className="pt-0 px-4 lg:px-6 pb-4 lg:pb-6">
            {overtimeData.map((employee, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 lg:p-4 bg-yellow-50 rounded-lg border border-yellow-200 gap-3 sm:gap-0">
                <div className="flex items-center space-x-3">
                  <Avatar src="/img/team-4.jpeg" alt={employee.name} size="sm" />
                  <div>
                    <Typography variant="small" className="font-semibold text-gray-800 text-xs lg:text-sm">
                      {employee.name}
                    </Typography>
                    <Typography variant="small" className="text-gray-600 text-xs lg:text-sm">
                      {employee.workedHours}
                    </Typography>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <Typography variant="small" className="text-orange-600 font-medium text-xs lg:text-sm">
                    {employee.approaching}
                  </Typography>
                  <Chip value={employee.status} color="green" size="sm" className="text-xs mt-1" />
                </div>
              </div>
            ))}
            <Typography variant="small" className="text-gray-500 mt-3 lg:mt-4 text-xs lg:text-sm">
              Last Update: September 30, 2021 9:05 AM
            </Typography>
          </CardBody>
        </Card>

        {/* Time Off Requests */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader floated={false} color="transparent" className="m-0 p-4 lg:p-6 pb-3 lg:pb-4">
            <div className="flex items-center justify-between">
              <Typography variant="h6" className="font-bold text-gray-800 text-base lg:text-lg">
                Time Off Requests
              </Typography>
              <Button variant="text" size="sm" className="p-2 hidden sm:block">
                <EllipsisHorizontalIcon className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardBody className="pt-0 px-4 lg:px-6 pb-4 lg:pb-6">
            <div className="space-y-3 lg:space-y-4">
              {timeOffRequests.map((request) => (
                <div key={request.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 lg:p-4 bg-gray-50 rounded-lg gap-3 sm:gap-0">
                  <div className="flex items-center space-x-3">
                    <Avatar src="/img/team-2.jpeg" alt={request.name} size="sm" />
                    <div>
                      <Typography variant="small" className="font-semibold text-gray-800 text-xs lg:text-sm">
                        {request.name}
                      </Typography>
                      <Typography variant="small" className="text-gray-600 text-xs lg:text-sm">
                        {request.hours} • {request.type}
                      </Typography>
                      <Chip value="Pending" color="orange" size="sm" className="text-xs mt-1" />
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <Typography variant="small" className="text-gray-600 mb-2 text-xs lg:text-sm">
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
