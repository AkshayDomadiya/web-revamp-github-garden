
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
  CalendarDaysIcon,
  BellIcon,
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 lg:p-6">
      {/* Header */}
      <div className="mb-8 text-center lg:text-left">
        <Typography variant="h2" className="font-bold bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-transparent mb-2">
          Admin Dashboard
        </Typography>
        <Typography variant="lead" className="text-gray-600 text-lg">
          Real-time employee monitoring and management system
        </Typography>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="h3" className="font-bold text-white">
                  24
                </Typography>
                <Typography variant="small" className="text-blue-100">
                  Total Employees
                </Typography>
              </div>
              <UserGroupIcon className="h-12 w-12 text-blue-200" />
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="h3" className="font-bold text-white">
                  22
                </Typography>
                <Typography variant="small" className="text-green-100">
                  Present Today
                </Typography>
              </div>
              <ClockIcon className="h-12 w-12 text-green-200" />
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="h3" className="font-bold text-white">
                  3
                </Typography>
                <Typography variant="small" className="text-yellow-100">
                  Pending Requests
                </Typography>
              </div>
              <BellIcon className="h-12 w-12 text-yellow-200" />
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="h3" className="font-bold text-white">
                  2051
                </Typography>
                <Typography variant="small" className="text-purple-100">
                  Weekly Hours
                </Typography>
              </div>
              <ChartBarIcon className="h-12 w-12 text-purple-200" />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8">
        
        {/* Employee Status - Left Column */}
        <div className="xl:col-span-4">
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm h-full hover:shadow-3xl transition-all duration-300">
            <CardHeader floated={false} color="transparent" className="m-0 p-6 pb-4 bg-gradient-to-r from-blue-600 to-indigo-600">
              <div className="flex items-center justify-between mb-4">
                <Typography variant="h5" className="font-bold text-white">
                  Employee Status
                </Typography>
                <Button variant="text" size="sm" className="p-2 text-white hover:bg-white/20">
                  <EllipsisHorizontalIcon className="h-5 w-5" />
                </Button>
              </div>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="!bg-white/20 !border-white/30 !text-white placeholder:!text-white/70"
                  labelProps={{
                    className: "!text-white/70",
                  }}
                  icon={<MagnifyingGlassIcon className="h-5 w-5 text-white/70" />}
                />
              </div>
            </CardHeader>
            <CardBody className="pt-0 px-6 pb-6 max-h-96 overflow-y-auto custom-scrollbar">
              <div className="space-y-3">
                {filteredEmployees.map((employee) => (
                  <div key={employee.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                      <div className="relative">
                        <Avatar src={employee.avatar} alt={employee.name} size="md" className="ring-2 ring-blue-200" />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full ring-2 ring-white"></div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <Typography variant="small" className="font-semibold text-gray-800 truncate">
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
                    <Typography variant="small" className="text-gray-600 font-medium shrink-0 ml-2">
                      {employee.time}
                    </Typography>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center text-blue-600 font-medium">
                    <UserGroupIcon className="h-4 w-4 mr-1" />
                    {filteredEmployees.length} Total
                  </span>
                  <span className="flex items-center text-green-600 font-medium">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {filteredEmployees.filter(emp => emp.status === 'WORKING').length} Working
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Middle Section - Exceptions & Charts */}
        <div className="xl:col-span-8 space-y-6">
          {/* Exceptions */}
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-3xl transition-all duration-300">
            <CardHeader floated={false} color="transparent" className="m-0 p-6 pb-4 bg-gradient-to-r from-indigo-600 to-purple-600">
              <div className="flex items-center justify-between">
                <Typography variant="h5" className="font-bold text-white">
                  Today's Exceptions
                </Typography>
                <Button variant="text" size="sm" className="p-2 text-white hover:bg-white/20">
                  <EllipsisHorizontalIcon className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardBody className="pt-0 px-6 pb-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border-l-4 border-orange-400 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <Typography variant="h4" className="font-bold text-orange-600 mb-1">
                    17
                  </Typography>
                  <Typography variant="small" className="text-orange-800 font-medium">
                    Arrived Early
                  </Typography>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border-l-4 border-red-400 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <Typography variant="h4" className="font-bold text-red-600 mb-1">
                    2
                  </Typography>
                  <Typography variant="small" className="text-red-800 font-medium">
                    Arrived Late
                  </Typography>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-l-4 border-purple-400 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <Typography variant="h4" className="font-bold text-purple-600 mb-1">
                    0
                  </Typography>
                  <Typography variant="small" className="text-purple-800 font-medium">
                    Left Early
                  </Typography>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-l-4 border-gray-400 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <Typography variant="h4" className="font-bold text-gray-600 mb-1">
                    0
                  </Typography>
                  <Typography variant="small" className="text-gray-800 font-medium">
                    Left Late
                  </Typography>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border-l-4 border-red-400 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <Typography variant="h4" className="font-bold text-red-600 mb-1">
                    27
                  </Typography>
                  <Typography variant="small" className="text-red-800 font-medium">
                    No Show
                  </Typography>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border-l-4 border-yellow-400 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <Typography variant="h4" className="font-bold text-yellow-600 mb-1">
                    0
                  </Typography>
                  <Typography variant="small" className="text-yellow-800 font-medium">
                    Missing Punch
                  </Typography>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Schedule Monitor and Scheduled Hours */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Schedule Monitor */}
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-3xl transition-all duration-300">
              <CardHeader floated={false} color="transparent" className="m-0 p-6 pb-4 bg-gradient-to-r from-cyan-600 to-blue-600">
                <div className="flex items-center justify-between">
                  <Typography variant="h6" className="font-bold text-white">
                    Schedule Monitor
                  </Typography>
                  <Button variant="text" size="sm" className="p-2 text-white hover:bg-white/20">
                    <EllipsisHorizontalIcon className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 px-6 pb-6">
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle cx="64" cy="64" r="50" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                      <circle cx="64" cy="64" r="50" stroke="url(#gradient1)" strokeWidth="8" fill="none" 
                              strokeDasharray={`${2.51 * 50 * 1} ${2.51 * 50}`} strokeLinecap="round" />
                      <defs>
                        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#06b6d4" />
                          <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Typography variant="h3" className="font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                          0
                        </Typography>
                        <Typography variant="small" className="text-gray-600 font-medium">
                          Unfilled Shifts
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center space-x-1">
                    {[1, 2, 3, 4, 5].map((dot) => (
                      <div key={dot} className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse"></div>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Scheduled Hours Chart */}
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-3xl transition-all duration-300">
              <CardHeader floated={false} color="transparent" className="m-0 p-6 pb-4 bg-gradient-to-r from-green-600 to-teal-600">
                <div className="flex items-center justify-between">
                  <Typography variant="h6" className="font-bold text-white">
                    Weekly Schedule
                  </Typography>
                  <Button variant="text" size="sm" className="p-2 text-white hover:bg-white/20">
                    <EllipsisHorizontalIcon className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 px-6 pb-6">
                <div className="space-y-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => {
                    const hours = Math.floor(Math.random() * 200 + 300);
                    const percentage = Math.random() * 40 + 60;
                    return (
                      <div key={day} className="flex items-center justify-between">
                        <Typography variant="small" className="text-gray-700 w-12 font-medium">
                          {day}
                        </Typography>
                        <div className="flex-1 mx-4">
                          <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-green-500 to-teal-500 h-3 rounded-full flex items-center justify-center text-white font-bold text-xs transition-all duration-500 hover:from-green-600 hover:to-teal-600"
                              style={{ width: `${percentage}%` }}
                            >
                              {hours}h
                            </div>
                          </div>
                        </div>
                        <Typography variant="small" className="text-gray-600 w-16 text-right font-medium">
                          {percentage.toFixed(0)}%
                        </Typography>
                      </div>
                    );
                  })}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Approaching Overtime */}
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-3xl transition-all duration-300">
          <CardHeader floated={false} color="transparent" className="m-0 p-6 pb-4 bg-gradient-to-r from-amber-600 to-orange-600">
            <div className="flex items-center justify-between">
              <Typography variant="h6" className="font-bold text-white">
                Approaching Overtime
              </Typography>
              <Button variant="text" size="sm" className="p-2 text-white hover:bg-white/20">
                <EllipsisHorizontalIcon className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardBody className="pt-0 px-6 pb-6">
            {overtimeData.map((employee, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-l-4 border-orange-400 gap-4 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar src="/img/team-4.jpeg" alt={employee.name} size="lg" className="ring-2 ring-orange-200" />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                      <ExclamationTriangleIcon className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <Typography variant="small" className="font-bold text-gray-800 text-base">
                      {employee.name}
                    </Typography>
                    <Typography variant="small" className="text-gray-600">
                      {employee.workedHours}
                    </Typography>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <Typography variant="small" className="text-orange-600 font-bold text-sm">
                    {employee.approaching}
                  </Typography>
                  <Chip value={employee.status} color="green" size="sm" className="text-xs mt-2" />
                </div>
              </div>
            ))}
            <Typography variant="small" className="text-gray-500 mt-6 text-center">
              Last Update: September 30, 2021 9:05 AM
            </Typography>
          </CardBody>
        </Card>

        {/* Time Off Requests */}
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-3xl transition-all duration-300">
          <CardHeader floated={false} color="transparent" className="m-0 p-6 pb-4 bg-gradient-to-r from-rose-600 to-pink-600">
            <div className="flex items-center justify-between">
              <Typography variant="h6" className="font-bold text-white">
                Time Off Requests
              </Typography>
              <Button variant="text" size="sm" className="p-2 text-white hover:bg-white/20">
                <EllipsisHorizontalIcon className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardBody className="pt-0 px-6 pb-6">
            <div className="space-y-4">
              {timeOffRequests.map((request) => (
                <div key={request.id} className="flex flex-col lg:flex-row lg:items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-rose-50 rounded-xl border-l-4 border-rose-400 gap-4 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Avatar src="/img/team-2.jpeg" alt={request.name} size="lg" className="ring-2 ring-rose-200" />
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center">
                        <CalendarDaysIcon className="h-3 w-3 text-white" />
                      </div>
                    </div>
                    <div>
                      <Typography variant="small" className="font-bold text-gray-800 text-base">
                        {request.name}
                      </Typography>
                      <Typography variant="small" className="text-gray-600">
                        {request.hours} • {request.type}
                      </Typography>
                      <Chip value="Pending" color="orange" size="sm" className="text-xs mt-1" />
                    </div>
                  </div>
                  <div className="text-left lg:text-right">
                    <Typography variant="small" className="text-gray-600 mb-3 font-medium">
                      {request.dates}
                    </Typography>
                    <div className="flex flex-row space-x-2">
                      <Button
                        size="sm"
                        className="px-4 py-2 text-xs bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-300"
                        onClick={() => handleApprove(request.id)}
                      >
                        <CheckIcon className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        className="px-4 py-2 text-xs bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300"
                        onClick={() => handleDeny(request.id)}
                      >
                        <XMarkIcon className="h-4 w-4 mr-1" />
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
