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
import {
  PencilIcon,
  ArrowRightOnRectangleIcon,
  CheckIcon,
  XMarkIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { authorsTableData } from "@/data";

export default function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const employee = authorsTableData[id];

  const [profilePic, setProfilePic] = useState(employee?.img || "");
  const [isEditing, setIsEditing] = useState(false);

  const [data, setData] = useState({
    companyId: "",
    companyName: "",
    streetAddress: "",
    city: "",
    province: "",
    postalCode: "",
    country: "",
    phone: "",
    email: employee?.email || "",
    latitude: "",
    longitude: "",
    radius: "",
    firstName: "",
    lastName: "",
    branchDetails: "",
  });

  const [tempData, setTempData] = useState({ ...data });  

  const fields = [
    { label: "Company ID", key: "companyId" },
    { label: "Company Name", key: "companyName" },
    { label: "Street Address", key: "streetAddress" },
    { label: "City", key: "city" },
    { label: "Province", key: "province" },
    { label: "Postal Code", key: "postalCode" },
    { label: "Country", key: "country" },
    { label: "Phone", key: "phone" },
    { label: "Email", key: "email" },
    { label: "Latitude", key: "latitude" },
    { label: "Longitude", key: "longitude" },
    { label: "Radius", key: "radius" },
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Branch Details", key: "branchDetails" },
  ];

  const handleEditToggle = () => {
    setTempData({ ...data });
    setIsEditing(true);
  };

  const handleSave = () => {
    setData({ ...tempData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData({ ...data });
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfilePic(URL.createObjectURL(file));
  };

  const handleInputChange = (key, value) => {
    setTempData({ ...tempData, [key]: value });
  };


  if (!employee) {
    return (
      <div className="p-8">
        <Typography variant="h5" color="red">
          Employee not found.
        </Typography>
        <Button onClick={() => navigate(-1)} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

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
                  alt={data.name}
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
                  {data.name}
                </Typography>
                <Typography variant="small" className="font-normal text-blue-gray-600">
                  {data.role}
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
              {isEditing ? (
                <>
                  <Button color="green" onClick={handleSave} className="flex items-center gap-2">
                    <CheckIcon className="h-5 w-5" />
                    Save
                  </Button>
                  <Button color="gray" variant="outlined" onClick={handleCancel} className="flex items-center gap-2">
                    <XMarkIcon className="h-5 w-5" />
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  color="blue"
                  variant="outlined"
                  onClick={handleEditToggle}
                  className="flex items-center gap-2"
                >
                  <PencilIcon className="h-5 w-5" />
                  Edit
                </Button>
              )}
            </div>
          </div>

          {/* Details */}
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

                {isEditing ? (
                  <Input
                    value={tempData[key]}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    className="mt-1"
                  />
                ) : (
                  <Typography className="mt-1 text-sm text-blue-gray-800">
                    {data[key]}
                  </Typography>
                )}
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </>
  );
}
