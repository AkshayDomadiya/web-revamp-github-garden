import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Tooltip,
  Button,
  Input,
} from "@material-tailwind/react";
import { PencilIcon, CheckIcon, XMarkIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddEmployee() {
  const navigate = useNavigate();

  const [profilePic, setProfilePic] = useState("");
  const [isEditing, setIsEditing] = useState(true); // start in editing mode

  const [data, setData] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    date: "",
    status: "Offline",
  });

  const [tempData, setTempData] = useState({ ...data });

  const fields = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Role", key: "role" },
    { label: "Department", key: "department" },
    { label: "Status", key: "status" },
    { label: "Joining Date", key: "date" },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfilePic(URL.createObjectURL(file));
  };

  const handleInputChange = (key, value) => {
    setTempData({ ...tempData, [key]: value });
  };

  const handleSave = () => {
    // Normally here you'd send the new employee data to your backend or state
    setData({ ...tempData });
    setIsEditing(false);
    // For demo: show alert or redirect back to employee list
    alert("Employee added successfully!");
    navigate("/dashboard/employees");
  };

  const handleCancel = () => {
    setTempData({ ...data });
    // For add form, just clear or navigate back
    navigate("/dashboard/employee");
  };

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>

      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          {/* Header */}
          <div className="mb-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar
                  src={profilePic}
                  alt={tempData.name || "New Employee"}
                  size="xl"
                  variant="rounded"
                  className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                />
                <label htmlFor="upload-avatar">
                  <Tooltip content="Upload Photo">
                    <PencilIcon className="h-5 w-5 absolute bottom-0 right-0 text-white bg-blue-500 rounded-full p-1 cursor-pointer" />
                  </Tooltip>
                </label>
                <input
                  type="file"
                  id="upload-avatar"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  {tempData.name || "New Employee"}
                </Typography>
                <Typography variant="small" className="font-normal text-blue-gray-600">
                  {tempData.role || "Role"}
                </Typography>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <Button
                color="gray"
                variant="outlined"
                className="flex items-center gap-2"
                onClick={() => navigate(-1)}
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 rotate-180" />
                Back
              </Button>

              <Button
                color="green"
                onClick={handleSave}
                className="flex items-center gap-2"
              >
                <CheckIcon className="h-5 w-5" />
                Save
              </Button>

              <Button
                color="gray"
                variant="outlined"
                onClick={handleCancel}
                className="flex items-center gap-2"
              >
                <XMarkIcon className="h-5 w-5" />
                Cancel
              </Button>
            </div>
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fields.map(({ label, key }) => (
              <div
                key={key}
                className="bg-gray-50 p-4 rounded-md shadow-sm border border-gray-100"
              >
                <Typography
                  variant="small"
                  className="text-xs font-medium text-blue-gray-500 uppercase"
                >
                  {label}
                </Typography>

                <Input
                  value={tempData[key]}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  className="mt-1"
                />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </>
  );
}
