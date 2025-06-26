import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Tooltip,
  Button,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useState } from "react";
import {
  PencilIcon,
  ArrowRightOnRectangleIcon,
  CheckIcon,
  XMarkIcon,
  ExclamationCircleIcon,  // Add this for an icon in the modal header
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export function Profile() {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState("/img/bruce-mars.jpeg");
  const [isEditing, setIsEditing] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const [admin, setAdmin] = useState({
    name: "Alex Morgan",
    title: "HR Administrator",
    email: "alex.morgan@company.com",
    phone: "+1 789 456 1230",
    location: "New York, USA",
    startDate: "January 01, 2022",
    department: "Human Resources",
    employeeId: "ADMIN-001",
    role: "System Admin",
    accessLevel: "Full Access",
  });

  const [tempAdmin, setTempAdmin] = useState({ ...admin });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfilePic(URL.createObjectURL(file));
  };

  const handleLogout = () => setLogoutOpen(true);
  const confirmLogout = () => navigate("/auth/sign-in");
  const cancelLogout = () => setLogoutOpen(false);

  const handleEditToggle = () => {
    setTempAdmin({ ...admin });
    setIsEditing(true);
  };

  const handleSave = () => {
    setAdmin({ ...tempAdmin });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempAdmin({ ...admin });
    setIsEditing(false);
  };

  const handleInputChange = (key, value) => {
    setTempAdmin({ ...tempAdmin, [key]: value });
  };

  const fields = [
    { label: "Employee ID", key: "employeeId" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Department", key: "department" },
    { label: "Location", key: "location" },
    { label: "Start Date", key: "startDate" },
    { label: "Role", key: "role" },
    { label: "Access Level", key: "accessLevel" },
  ];

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>

      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          {/* Header Section */}
          <div className="mb-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar
                  src={profilePic}
                  alt={admin.name}
                  size="xl"
                  variant="rounded"
                  className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                />
                <label htmlFor="upload-avatar">
                  <Tooltip content="Change Photo">
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
                  {admin.name}
                </Typography>
                <Typography variant="small" className="font-normal text-blue-gray-600">
                  {admin.title}
                </Typography>
              </div>
            </div>

            {/* Global Action Buttons */}
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
              {isEditing ? (
                <>
                  <Button color="green" className="flex items-center gap-2" onClick={handleSave}>
                    <CheckIcon className="h-5 w-5" />
                    Save
                  </Button>
                  <Button color="gray" variant="outlined" className="flex items-center gap-2" onClick={handleCancel}>
                    <XMarkIcon className="h-5 w-5" />
                    Cancel
                  </Button>
                </>
              ) : (
                <Button color="blue" variant="outlined" className="flex items-center gap-2" onClick={handleEditToggle}>
                  <PencilIcon className="h-5 w-5" />
                  Edit
                </Button>
              )}
              <Button
                color="red"
                variant="filled"
                className="flex items-center gap-2"
                onClick={handleLogout}
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                Logout
              </Button>
            </div>
          </div>

          {/* Profile Details Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

                {isEditing ? (
                  <Input
                    value={tempAdmin[key]}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    className="mt-1"
                  />
                ) : (
                  <Typography className="mt-1 text-sm text-blue-gray-800">
                    {admin[key]}
                  </Typography>
                )}
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Logout Confirmation Modal */}
      <Dialog
        open={logoutOpen}
        handler={cancelLogout}
        className="transition-all duration-300 ease-in-out transform"
      >
        <DialogHeader>
          <div className="flex items-center gap-2 text-red-500">
            <ExclamationCircleIcon className="h-16 w-8" />
            <span>Are you sure you want to logout?</span>
          </div>
        </DialogHeader>
        <DialogBody className="text-gray-700">
          This action will end your current session and redirect you to the sign-in page.
        </DialogBody>
        <DialogFooter className="flex gap-4 justify-center">
          <Button
            variant="outlined"
            color="gray"
            className="w-32"
            onClick={cancelLogout}
          >
            Cancel
          </Button>
          <Button
            variant="filled"
            color="red"
            className="w-32"
            onClick={confirmLogout}
          >
            Yes, Logout
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default Profile;
