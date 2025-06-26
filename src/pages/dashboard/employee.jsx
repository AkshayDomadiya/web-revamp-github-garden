
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Button,
  Input,
  IconButton,
} from "@material-tailwind/react";
import { 
  MagnifyingGlassIcon,
  PlusIcon,
  UsersIcon,
  EyeIcon,
  PencilIcon,
  FunnelIcon
} from "@heroicons/react/24/solid";
import { authorsTableData } from "@/data";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Employee() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = authorsTableData.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.job[0].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <Typography variant="h3" className="font-bold text-gray-900 mb-2">
              Employee Management
            </Typography>
            <Typography className="text-gray-600 flex items-center gap-2">
              <UsersIcon className="w-5 h-5" />
              Manage your team members and their information
            </Typography>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => navigate(`/dashboard/employee/add`)}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              size="lg"
            >
              <PlusIcon className="w-5 h-5" />
              Add Employee
            </Button>
            <Button
              onClick={() => navigate(`/dashboard/employee/add-multiple`)}
              variant="outlined"
              className="flex items-center gap-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
              size="lg"
            >
              <UsersIcon className="w-5 h-5" />
              Bulk Import
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="h4" className="font-bold">
                  {authorsTableData.length}
                </Typography>
                <Typography className="opacity-90">Total Employees</Typography>
              </div>
              <UsersIcon className="w-12 h-12 opacity-80" />
            </div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="h4" className="font-bold">
                  {authorsTableData.filter(emp => emp.online).length}
                </Typography>
                <Typography className="opacity-90">Active Now</Typography>
              </div>
              <div className="w-3 h-3 bg-green-200 rounded-full animate-pulse"></div>
            </div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="h4" className="font-bold">
                  {new Set(authorsTableData.map(emp => emp.job[0])).size}
                </Typography>
                <Typography className="opacity-90">Departments</Typography>
              </div>
              <FunnelIcon className="w-12 h-12 opacity-80" />
            </div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="h4" className="font-bold">
                  {authorsTableData.filter(emp => !emp.online).length}
                </Typography>
                <Typography className="opacity-90">Offline</Typography>
              </div>
              <div className="w-3 h-3 bg-orange-200 rounded-full"></div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Main Employee Table */}
      <Card className="shadow-xl border-0">
        <CardHeader variant="gradient" color="transparent" className="m-0 p-6 bg-gradient-to-r from-gray-900 to-gray-800">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <Typography variant="h6" color="white" className="flex items-center gap-2">
              <UsersIcon className="w-6 h-6" />
              Employee Directory
            </Typography>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/70 min-w-[250px]"
                  containerProps={{
                    className: "min-w-[250px]",
                  }}
                  icon={<MagnifyingGlassIcon className="w-5 h-5 text-white/70" />}
                />
              </div>
              <IconButton variant="text" color="white">
                <FunnelIcon className="w-5 h-5" />
              </IconButton>
            </div>
          </div>
        </CardHeader>

        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr className="bg-gray-50">
                {["Employee", "Role", "Status", "Joined", "Actions"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-4 px-6 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-600"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map(
                ({ img, name, email, job, online, date, id }, key) => {
                  const className = `py-4 px-6 ${key === filteredEmployees.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                    }`;

                  return (
                    <tr key={name} className="hover:bg-gray-50 transition-colors">
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <Avatar 
                              src={img} 
                              alt={name} 
                              size="lg" 
                              variant="rounded" 
                              className="border-2 border-gray-200"
                            />
                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                              online ? 'bg-green-500' : 'bg-gray-400'
                            }`}></div>
                          </div>
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold text-lg"
                            >
                              {name}
                            </Typography>
                            <Typography className="text-sm font-normal text-blue-gray-500">
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <div className="flex flex-col">
                          <Typography className="text-sm font-bold text-blue-gray-600">
                            {job[0]}
                          </Typography>
                          <Typography className="text-xs text-blue-gray-400">
                            {job[1] || 'Department'}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={online ? "green" : "blue-gray"}
                          value={online ? "Active" : "Offline"}
                          className="py-1 px-3 text-xs font-medium w-fit"
                        />
                      </td>
                      <td className={className}>
                        <Typography className="text-sm font-semibold text-blue-gray-600">
                          {date}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="flex items-center gap-2">
                          <IconButton
                            variant="text"
                            color="blue"
                            onClick={() => navigate(`/dashboard/employee/${key}`)}
                            className="hover:bg-blue-50"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </IconButton>
                          <IconButton
                            variant="text"
                            color="indigo"
                            onClick={() => navigate(`/dashboard/employee/${key}`)}
                            className="hover:bg-indigo-50"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </IconButton>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Employee;
