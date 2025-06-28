
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
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      {/* Header */}
      <div className="mb-8">
        <Typography variant="h2" className="font-bold text-gray-800 mb-2">
          Admin Dashboard
        </Typography>
        <Typography variant="lead" className="text-gray-600">
          Employee management and monitoring system
        </Typography>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader variant="gradient" color="blue" floated={false} shadow={false} className="absolute grid h-12 w-12 place-items-center">
            <UserGroupIcon className="h-6 w-6 text-white" />
          </CardHeader>
          <CardBody className="p-4 text-right">
            <Typography variant="small" className="font-normal text-blue-gray-600">
              Total Employees
            </Typography>
            <Typography variant="h4" color="blue-gray">
              24
            </Typography>
          </CardBody>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader variant="gradient" color="blue" floated={false} shadow={false} className="absolute grid h-12 w-12 place-items-center">
            <ClockIcon className="h-6 w-6 text-white" />
          </CardHeader>
          <CardBody className="p-4 text-right">
            <Typography variant="small" className="font-normal text-blue-gray-600">
              Present Today
            </Typography>
            <Typography variant="h4" color="blue-gray">
              22
            </Typography>
          </CardBody>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader variant="gradient" color="blue" floated={false} shadow={false} className="absolute grid h-12 w-12 place-items-center">
            <BellIcon className="h-6 w-6 text-white" />
          </CardHeader>
          <CardBody className="p-4 text-right">
            <Typography variant="small" className="font-normal text-blue-gray-600">
              Pending Requests
            </Typography>
            <Typography variant="h4" color="blue-gray">
              3
            </Typography>
          </CardBody>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader variant="gradient" color="blue" floated={false} shadow={false} className="absolute grid h-12 w-12 place-items-center">
            <ChartBarIcon className="h-6 w-6 text-white" />
          </CardHeader>
          <CardBody className="p-4 text-right">
            <Typography variant="small" className="font-normal text-blue-gray-600">
              Weekly Hours
            </Typography>
            <Typography variant="h4" color="blue-gray">
              2051
            </Typography>
          </CardBody>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        
        {/* Employee Status - Left Column */}
        <div className="xl:col-span-1">
          <Card className="shadow-lg h-full">
            <CardHeader floated={false} shadow={false} color="transparent" className="m-0 p-6 pb-4">
              <div className="flex items-center justify-between mb-4">
                <Typography variant="h6" className="font-semibold text-blue-gray-800">
                  Employee Status
                </Typography>
                <Button variant="text" size="sm" className="p-2">
                  <EllipsisHorizontalIcon className="h-5 w-5" />
                </Button>
              </div>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="!border-blue-gray-200 focus:!border-blue-500"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
            </CardHeader>
            <CardBody className="pt-0 px-6 pb-6 max-h-96 overflow-y-auto">
              <div className="space-y-3">
                {filteredEmployees.map((employee) => (
                  <div key={employee.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                      <div className="relative">
                        <Avatar src={employee.avatar} alt={employee.name} size="sm" />
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <Typography variant="small" className="font-medium text-gray-800 truncate">
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
                    <Typography variant="small" className="text-gray-600 shrink-0">
                      {employee.time}
                    </Typography>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Middle & Right Section */}
        <div className="xl:col-span-2 space-y-6">
          {/* Exceptions */}
          <Card className="shadow-lg">
            <CardHeader floated={false} shadow={false} color="transparent" className="m-0 p-6 pb-4">
              <div className="flex items-center justify-between">
                <Typography variant="h6" className="font-semibold text-blue-gray-800">
                  Today's Exceptions
                </Typography>
                <Button variant="text" size="sm" className="p-2">
                  <EllipsisHorizontalIcon className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardBody className="pt-0 px-6 pb-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <Typography variant="h4" className="font-bold text-orange-600 mb-1">
                    17
                  </Typography>
                  <Typography variant="small" className="text-orange-800">
                    Arrived Early
                  </Typography>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                  <Typography variant="h4" className="font-bold text-red-600 mb-1">
                    2
                  </Typography>
                  <Typography variant="small" className="text-red-800">
                    Arrived Late
                  </Typography>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <Typography variant="h4" className="font-bold text-blue-600 mb-1">
                    0
                  </Typography>
                  <Typography variant="small" className="text-blue-800">
                    Left Early
                  </Typography>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <Typography variant="h4" className="font-bold text-gray-600 mb-1">
                    0
                  </Typography>
                  <Typography variant="small" className="text-gray-800">
                    Left Late
                  </Typography>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                  <Typography variant="h4" className="font-bold text-red-600 mb-1">
                    27
                  </Typography>
                  <Typography variant="small" className="text-red-800">
                    No Show
                  </Typography>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <Typography variant="h4" className="font-bold text-yellow-600 mb-1">
                    0
                  </Typography>
                  <Typography variant="small" className="text-yellow-800">
                    Missing Punch
                  </Typography>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Schedule Monitor and Scheduled Hours */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Schedule Monitor */}
            <Card className="shadow-lg">
              <CardHeader floated={false} shadow={false} color="transparent" className="m-0 p-6 pb-4">
                <div className="flex items-center justify-between">
                  <Typography variant="h6" className="font-semibold text-blue-gray-800">
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
                      <circle cx="64" cy="64" r="50" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                      <circle cx="64" cy="64" r="50" stroke="#3b82f6" strokeWidth="8" fill="none" 
                              strokeDasharray={`${2.51 * 50 * 1} ${2.51 * 50}`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Typography variant="h3" className="font-bold text-blue-600">
                          0
                        </Typography>
                        <Typography variant="small" className="text-gray-600">
                          Unfilled Shifts
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Scheduled Hours Chart */}
            <Card className="shadow-lg">
              <CardHeader floated={false} shadow={false} color="transparent" className="m-0 p-6 pb-4">
                <div className="flex items-center justify-between">
                  <Typography variant="h6" className="font-semibold text-blue-gray-800">
                    Weekly Schedule
                  </Typography>
                  <Button variant="text" size="sm" className="p-2">
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
                          <div className="bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                        <Typography variant="small" className="text-gray-600 w-16 text-right">
                          {hours}h
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
        <Card className="shadow-lg">
          <CardHeader floated={false} shadow={false} color="transparent" className="m-0 p-6 pb-4">
            <div className="flex items-center justify-between">
              <Typography variant="h6" className="font-semibold text-blue-gray-800">
                Approaching Overtime
              </Typography>
              <Button variant="text" size="sm" className="p-2">
                <EllipsisHorizontalIcon className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardBody className="pt-0 px-6 pb-6">
            {overtimeData.map((employee, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200 gap-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar src="/img/team-4.jpeg" alt={employee.name} size="md" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                      <ExclamationTriangleIcon className="h-2 w-2 text-white" />
                    </div>
                  </div>
                  <div>
                    <Typography variant="small" className="font-medium text-gray-800">
                      {employee.name}
                    </Typography>
                    <Typography variant="small" className="text-gray-600">
                      {employee.workedHours}
                    </Typography>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <Typography variant="small" className="text-yellow-600 font-medium">
                    {employee.approaching}
                  </Typography>
                  <Chip value={employee.status} color="green" size="sm" className="text-xs mt-1" />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>

        {/* Time Off Requests */}
        <Card className="shadow-lg">
          <CardHeader floated={false} shadow={false} color="transparent" className="m-0 p-6 pb-4">
            <div className="flex items-center justify-between">
              <Typography variant="h6" className="font-semibold text-blue-gray-800">
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
                <div key={request.id} className="flex flex-col lg:flex-row lg:items-center justify-between p-4 bg-gray-50 rounded-lg gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Avatar src="/img/team-2.jpeg" alt={request.name} size="md" />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <CalendarDaysIcon className="h-2 w-2 text-white" />
                      </div>
                    </div>
                    <div>
                      <Typography variant="small" className="font-medium text-gray-800">
                        {request.name}
                      </Typography>
                      <Typography variant="small" className="text-gray-600">
                        {request.hours} • {request.type}
                      </Typography>
                      <Chip value="Pending" color="orange" size="sm" className="text-xs mt-1" />
                    </div>
                  </div>
                  <div className="text-left lg:text-right">
                    <Typography variant="small" className="text-gray-600 mb-3">
                      {request.dates}
                    </Typography>
                    <div className="flex flex-row space-x-2">
                      <Button
                        size="sm"
                        color="green"
                        className="px-3 py-2 text-xs"
                        onClick={() => handleApprove(request.id)}
                      >
                        <CheckIcon className="h-3 w-3 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        color="red"
                        className="px-3 py-2 text-xs"
                        onClick={() => handleDeny(request.id)}
                      >
                        <XMarkIcon className="h-3 w-3 mr-1" />
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
