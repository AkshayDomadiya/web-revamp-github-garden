
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <Typography variant="h3" className="font-bold text-gray-800 mb-2">
          Admin Dashboard
        </Typography>
        <Typography variant="lead" className="text-gray-600">
          Real-time employee monitoring and management
        </Typography>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Employee Status - Left Column */}
        <Card className="xl:col-span-1 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader floated={false} color="transparent" className="m-0 p-6 pb-4">
            <div className="flex items-center justify-between">
              <Typography variant="h6" className="font-bold text-gray-800">
                Employee Status
              </Typography>
              <Button variant="text" size="sm" className="p-2">
                <EllipsisHorizontalIcon className="h-5 w-5" />
              </Button>
            </div>
            <div className="mt-4 relative">
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
          <CardBody className="pt-0 px-6 pb-6 max-h-96 overflow-y-auto">
            <div className="space-y-3">
              {filteredEmployees.map((employee) => (
                <div key={employee.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Avatar src={employee.avatar} alt={employee.name} size="sm" />
                    <div>
                      <Typography variant="small" className="font-semibold text-gray-800">
                        {employee.name}
                      </Typography>
                      <Chip
                        value={employee.status}
                        color="green"
                        size="sm"
                        className="text-xs"
                      />
                    </div>
                  </div>
                  <Typography variant="small" className="text-gray-600 font-medium">
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

        {/* Right Column - Exceptions and Scheduled Hours */}
        <div className="xl:col-span-2 space-y-6">
          {/* Exceptions and Total Scheduled Hours Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Exceptions */}
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader floated={false} color="transparent" className="m-0 p-6 pb-4">
                <div className="flex items-center justify-between">
                  <Typography variant="h6" className="font-bold text-gray-800">
                    Exceptions
                  </Typography>
                  <Button variant="text" size="sm" className="p-2">
                    <EllipsisHorizontalIcon className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 px-6 pb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-200">
                    <Typography variant="h4" className="font-bold text-orange-600">
                      17
                    </Typography>
                    <Typography variant="small" className="text-orange-800">
                      Arrived Early
                    </Typography>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-xl border border-red-200">
                    <Typography variant="h4" className="font-bold text-red-600">
                      2
                    </Typography>
                    <Typography variant="small" className="text-red-800">
                      Arrived Late
                    </Typography>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
                    <Typography variant="h4" className="font-bold text-purple-600">
                      0
                    </Typography>
                    <Typography variant="small" className="text-purple-800">
                      Left Early
                    </Typography>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <Typography variant="h4" className="font-bold text-gray-600">
                      0
                    </Typography>
                    <Typography variant="small" className="text-gray-800">
                      Left Late
                    </Typography>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-xl border border-red-200">
                    <Typography variant="h4" className="font-bold text-red-600">
                      27
                    </Typography>
                    <Typography variant="small" className="text-red-800">
                      No Show
                    </Typography>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                    <Typography variant="h4" className="font-bold text-yellow-600">
                      0
                    </Typography>
                    <Typography variant="small" className="text-yellow-800">
                      Missing Punch
                    </Typography>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Total Scheduled Hours */}
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader floated={false} color="transparent" className="m-0 p-6 pb-4">
                <div className="flex items-center justify-between">
                  <Typography variant="h6" className="font-bold text-gray-800">
                    Total Scheduled Hours
                  </Typography>
                  <Button variant="text" size="sm" className="p-2">
                    <EllipsisHorizontalIcon className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 px-6 pb-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <svg className="w-24 h-24 transform -rotate-90">
                        <circle cx="48" cy="48" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                        <circle cx="48" cy="48" r="40" stroke="#06b6d4" strokeWidth="8" fill="none" 
                                strokeDasharray={`${2.51 * 40 * 0.85} ${2.51 * 40}`} strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Typography variant="h5" className="font-bold text-cyan-600">
                          2,051
                        </Typography>
                      </div>
                    </div>
                    <Typography variant="small" className="text-gray-800 font-semibold">
                      This week
                    </Typography>
                    <div className="flex items-center justify-center mt-1">
                      <Typography variant="small" className="text-green-600 font-medium">
                        1% ↑
                      </Typography>
                    </div>
                    <Typography variant="small" className="text-gray-600">
                      Increase from last week
                    </Typography>
                  </div>
                  <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <svg className="w-24 h-24 transform -rotate-90">
                        <circle cx="48" cy="48" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                        <circle cx="48" cy="48" r="40" stroke="#06b6d4" strokeWidth="8" fill="none" 
                                strokeDasharray={`${2.51 * 40 * 0.80} ${2.51 * 40}`} strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Typography variant="h5" className="font-bold text-cyan-600">
                          2,011
                        </Typography>
                      </div>
                    </div>
                    <Typography variant="small" className="text-gray-800 font-semibold">
                      Last week
                    </Typography>
                    <div className="flex items-center justify-center mt-1">
                      <Typography variant="small" className="text-green-600 font-medium">
                        6% ↑
                      </Typography>
                    </div>
                    <Typography variant="small" className="text-gray-600">
                      Higher than 4 week average
                    </Typography>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Schedule Monitor and Scheduled Hours Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Schedule Monitor */}
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader floated={false} color="transparent" className="m-0 p-6 pb-4">
                <div className="flex items-center justify-between">
                  <Typography variant="h6" className="font-bold text-gray-800">
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
                        <Typography variant="h4" className="font-bold text-cyan-600">
                          0
                        </Typography>
                        <Typography variant="small" className="text-gray-600">
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
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader floated={false} color="transparent" className="m-0 p-6 pb-4">
                <div className="flex items-center justify-between">
                  <Typography variant="h6" className="font-bold text-gray-800">
                    Scheduled Hours
                  </Typography>
                  <Button variant="text" size="sm" className="p-2">
                    <EllipsisHorizontalIcon className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 px-6 pb-6">
                <div className="space-y-2">
                  {['Sun 10/24', 'Mon 10/25', 'Tue 10/26', 'Wed 10/27', 'Thu 10/28', 'Fri 10/29', 'Sat 10/30'].map((day, index) => (
                    <div key={day} className="flex items-center justify-between">
                      <Typography variant="small" className="text-gray-600 w-16">
                        {day.split(' ')[0]}
                      </Typography>
                      <div className="flex-1 mx-3">
                        <div className="bg-gray-200 rounded-full h-6">
                          <div 
                            className="bg-cyan-500 h-6 rounded-full flex items-center justify-center"
                            style={{ width: `${Math.random() * 40 + 60}%` }}
                          >
                            <Typography variant="small" className="text-white font-medium text-xs">
                              {Math.floor(Math.random() * 200 + 300)}
                            </Typography>
                          </div>
                        </div>
                      </div>
                      <Typography variant="small" className="text-gray-600 w-16 text-right">
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
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Approaching Overtime */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader floated={false} color="transparent" className="m-0 p-6 pb-4">
            <div className="flex items-center justify-between">
              <Typography variant="h6" className="font-bold text-gray-800">
                Approaching Overtime
              </Typography>
              <Button variant="text" size="sm" className="p-2">
                <EllipsisHorizontalIcon className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardBody className="pt-0 px-6 pb-6">
            {overtimeData.map((employee, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center space-x-3">
                  <Avatar src="/img/team-4.jpeg" alt={employee.name} size="sm" />
                  <div>
                    <Typography variant="small" className="font-semibold text-gray-800">
                      {employee.name}
                    </Typography>
                    <Typography variant="small" className="text-gray-600">
                      {employee.workedHours}
                    </Typography>
                  </div>
                </div>
                <div className="text-right">
                  <Typography variant="small" className="text-orange-600 font-medium">
                    {employee.approaching}
                  </Typography>
                  <Chip value={employee.status} color="green" size="sm" className="text-xs mt-1" />
                </div>
              </div>
            ))}
            <Typography variant="small" className="text-gray-500 mt-4">
              Last Update: September 30, 2021 9:05 AM
            </Typography>
          </CardBody>
        </Card>

        {/* Time Off Requests */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader floated={false} color="transparent" className="m-0 p-6 pb-4">
            <div className="flex items-center justify-between">
              <Typography variant="h6" className="font-bold text-gray-800">
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
                <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar src="/img/team-2.jpeg" alt={request.name} size="sm" />
                    <div>
                      <Typography variant="small" className="font-semibold text-gray-800">
                        {request.name}
                      </Typography>
                      <Typography variant="small" className="text-gray-600">
                        {request.hours} • {request.type}
                      </Typography>
                      <Chip value="Pending" color="orange" size="sm" className="text-xs mt-1" />
                    </div>
                  </div>
                  <div className="text-right">
                    <Typography variant="small" className="text-gray-600 mb-2">
                      {request.dates}
                    </Typography>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        color="green"
                        onClick={() => handleApprove(request.id)}
                        className="px-3 py-1"
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        color="red"
                        onClick={() => handleDeny(request.id)}
                        className="px-3 py-1"
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
