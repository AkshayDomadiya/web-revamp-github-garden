
import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Button,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { 
  PencilIcon, 
  CheckIcon, 
  XMarkIcon, 
  ArrowLeftIcon,
  UserPlusIcon,
  CameraIcon
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddEmployee() {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    date: "",
    status: "Active",
    phone: "",
    address: "",
    salary: "",
  });

  const departments = ["Engineering", "HR", "Marketing", "Sales", "Finance", "Operations"];
  const roles = ["Software Engineer", "HR Manager", "Marketing Specialist", "Sales Representative", "Financial Analyst", "Operations Manager"];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const handleSave = () => {
    if (!data.name || !data.email || !data.role || !data.department) {
      alert("Please fill in all required fields");
      return;
    }
    
    alert("Employee added successfully!");
    navigate("/dashboard/employee");
  };

  const handleCancel = () => {
    navigate("/dashboard/employee");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="outlined"
            size="sm"
            onClick={() => navigate("/dashboard/employee")}
            className="flex items-center gap-2"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back
          </Button>
          <div>
            <Typography variant="h3" className="font-bold text-gray-900">
              Add New Employee
            </Typography>
            <Typography className="text-gray-600">
              Fill in the details to add a new team member
            </Typography>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl border-0">
          <CardBody className="p-8">
            {/* Profile Section */}
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl">
              <div className="relative">
                <Avatar
                  src={profilePic || "/img/team-1.jpeg"}
                  alt="Employee Photo"
                  size="xxl"
                  variant="rounded"
                  className="border-4 border-white shadow-lg"
                />
                <label 
                  htmlFor="upload-avatar"
                  className="absolute bottom-2 right-2 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full cursor-pointer transition-colors shadow-lg"
                >
                  <CameraIcon className="w-4 h-4" />
                </label>
                <input
                  type="file"
                  id="upload-avatar"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-2">
                  <UserPlusIcon className="w-6 h-6 text-indigo-600" />
                  <Typography variant="h5" className="font-bold text-gray-900">
                    {data.name || "New Employee"}
                  </Typography>
                </div>
                <Typography className="text-gray-600 mb-4">
                  {data.role || "Role"} • {data.department || "Department"}
                </Typography>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleSave}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 flex items-center gap-2"
                    size="lg"
                  >
                    <CheckIcon className="w-5 w-5" />
                    Save Employee
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleCancel}
                    className="flex items-center gap-2"
                    size="lg"
                  >
                    <XMarkIcon className="w-5 h-5" />
                    Cancel
                  </Button>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <div className="border-l-4 border-indigo-600 pl-4">
                  <Typography variant="h6" className="font-bold text-gray-900 mb-4">
                    Personal Information
                  </Typography>
                </div>
                
                <Input
                  size="lg"
                  label="Full Name *"
                  value={data.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="focus:border-indigo-500"
                />
                
                <Input
                  size="lg"
                  label="Email Address *"
                  type="email"
                  value={data.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="focus:border-indigo-500"
                />
                
                <Input
                  size="lg"
                  label="Phone Number"
                  value={data.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="focus:border-indigo-500"
                />
                
                <Input
                  size="lg"
                  label="Address"
                  value={data.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="focus:border-indigo-500"
                />
              </div>

              {/* Work Information */}
              <div className="space-y-6">
                <div className="border-l-4 border-purple-600 pl-4">
                  <Typography variant="h6" className="font-bold text-gray-900 mb-4">
                    Work Information
                  </Typography>
                </div>
                
                <Select
                  size="lg"
                  label="Department *"
                  value={data.department}
                  onChange={(value) => handleInputChange("department", value)}
                  className="focus:border-purple-500"
                >
                  {departments.map((dept) => (
                    <Option key={dept} value={dept}>
                      {dept}
                    </Option>
                  ))}
                </Select>
                
                <Select
                  size="lg"
                  label="Role *"
                  value={data.role}
                  onChange={(value) => handleInputChange("role", value)}
                  className="focus:border-purple-500"
                >
                  {roles.map((role) => (
                    <Option key={role} value={role}>
                      {role}
                    </Option>
                  ))}
                </Select>
                
                <Input
                  size="lg"
                  label="Joining Date"
                  type="date"
                  value={data.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className="focus:border-purple-500"
                />
                
                <Input
                  size="lg"
                  label="Salary"
                  type="number"
                  value={data.salary}
                  onChange={(e) => handleInputChange("salary", e.target.value)}
                  className="focus:border-purple-500"
                />

                <Select
                  size="lg"
                  label="Status"
                  value={data.status}
                  onChange={(value) => handleInputChange("status", value)}
                  className="focus:border-purple-500"
                >
                  <Option value="Active">Active</Option>
                  <Option value="Inactive">Inactive</Option>
                  <Option value="On Leave">On Leave</Option>
                </Select>
              </div>
            </div>

            {/* Required Fields Note */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Typography variant="small" className="text-blue-800">
                <span className="font-semibold">Note:</span> Fields marked with * are required
              </Typography>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
