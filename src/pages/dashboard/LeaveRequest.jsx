import {
  Card,
  CardBody,
  Typography,
  Button,
  Input,
  Select,
  Option,
  Textarea,
  Alert,
} from "@material-tailwind/react";
import {
  CheckIcon,
  InformationCircleIcon,
  BriefcaseIcon,
  HeartIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LeaveRequest() {
  const navigate = useNavigate();

  const initialLeaveData = {
    employeeName: "",
    leaveType: "",
    fromDate: "",
    toDate: "",
    startTime: "",
    endTime: "",
    reason: "",
    status: "Pending",
  };

  const [leaveData, setLeaveData] = useState(initialLeaveData);
  const [errors, setErrors] = useState({});
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleChange = (field, value) => {
    setLeaveData({ ...leaveData, [field]: value });
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!leaveData.employeeName.trim()) {
      newErrors.employeeName = "Employee name is required.";
    }
    if (!leaveData.leaveType || leaveData.leaveType === "none") {
      newErrors.leaveType = "Please select a leave type.";
    }
    if (!leaveData.fromDate) {
      newErrors.fromDate = "From date is required.";
    }
    if (!leaveData.toDate) {
      newErrors.toDate = "To date is required.";
    }
    if (leaveData.fromDate && leaveData.toDate && leaveData.fromDate > leaveData.toDate) {
      newErrors.toDate = "To date cannot be before From date.";
    }
    if (leaveData.leaveType === "halfDay") {
      if (!leaveData.startTime) {
        newErrors.startTime = "Start time is required for Half Day leave.";
      }
      if (!leaveData.endTime) {
        newErrors.endTime = "End time is required for Half Day leave.";
      }
      if (
        leaveData.startTime &&
        leaveData.endTime &&
        leaveData.startTime >= leaveData.endTime
      ) {
        newErrors.endTime = "End time must be after Start time.";
      }
    }
    if (!leaveData.reason.trim()) {
      newErrors.reason = "Please provide a reason for leave.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setShowSuccessAlert(true);
      setLeaveData(initialLeaveData);
      setErrors({});

      setTimeout(() => setShowSuccessAlert(false), 3000);
    } else {
      setShowSuccessAlert(false);
    }
  };

  const handleCancel = () => {
    setLeaveData(initialLeaveData);
    setErrors({});
    setShowSuccessAlert(false);
  };

  const inputErrorClass = (field) =>
    errors[field]
      ? "border-red-500 focus:border-red-600 focus:ring-red-600"
      : "";

  return (
    <>
      {/* Alert */}
      {showSuccessAlert && (
        <Alert
          color="green"
          icon={<InformationCircleIcon className="h-6 w-6" />}
          onClose={() => setShowSuccessAlert(false)}
          className="mx-4 mb-4"
        >
          Leave request submitted successfully!
        </Alert>
      )}

      {/* Leave Balance Cards */}
          <div className="mt-8 mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {[
              {
                icon: <BriefcaseIcon className="h-8 w-8 text-blue-600" />,
                label: "Vacation",
                value: "12 Days",
                bg: "bg-blue-50",
                text: "text-blue-900",
              },
              {
                icon: <HeartIcon className="h-8 w-8 text-green-600" />,
                label: "Sick",
                value: "5 Days",
                bg: "bg-green-50",
                text: "text-green-900",
              },
              {
                icon: <UserIcon className="h-8 w-8 text-pink-600" />,
                label: "Personal",
                value: "3 Days",
                bg: "bg-pink-50",
                text: "text-pink-900",
              },
            ].map((item, idx) => (
              <Card
                key={idx}
                className={`flex items-center gap-4 p-5 ${item.bg} rounded-xl shadow-md`}
              >
                {item.icon}
                <div>
                  <Typography
                    variant="small"
                    className="text-xs font-medium text-blue-gray-600 uppercase"
                  >
                    {item.label}
                  </Typography>
                  <Typography variant="h6" className={`${item.text}`}>
                    {item.value}
                  </Typography>
                </div>
              </Card>
            ))}
          </div>

      {/* Leave Request Form */}
      <Card className="mx-4 mb-10 border border-blue-gray-100 rounded-xl shadow-lg">
        <CardBody className="p-6 md:p-8">
          {/* Header Section */}
          <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <Typography variant="h4" className="text-blue-900 font-semibold">
                Leave Request Form
              </Typography>
              <Typography variant="paragraph" className="text-blue-gray-500 mt-1">
                Please complete the form below to request a leave.
              </Typography>
            </div>

            <div className="flex flex-wrap gap-3">
  <Button
    color="green"
    onClick={handleSubmit}
    className="flex items-center gap-2"
  >
    <CheckIcon className="h-5 w-5" />
    Submit
  </Button>
  <Button
    color="red"
    onClick={handleCancel}
    className="flex items-center gap-2"
  >
    Cancel
  </Button>
  <Button
    color="blue"
    onClick={() => navigate("/dashboard/leave-request/leave-summary")}
    className="flex items-center gap-2"
  >
    <BriefcaseIcon className="h-5 w-5" />
    Leave Summary
  </Button>
</div>

          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Employee Name */}
            <div className="bg-gray-50 rounded-xl border p-4 shadow-sm">
              <Typography
                variant="small"
                className="text-xs font-medium text-blue-gray-600 uppercase mb-2"
              >
                Employee Name
              </Typography>
              <Input
                value={leaveData.employeeName}
                onChange={(e) => handleChange("employeeName", e.target.value)}
                placeholder="Enter full name"
                className={inputErrorClass("employeeName")}
              />
              {errors.employeeName && (
                <Typography variant="small" className="text-red-600 mt-1">
                  {errors.employeeName}
                </Typography>
              )}
            </div>

            {/* Leave Type */}
            <div className="bg-gray-50 rounded-xl border p-4 shadow-sm">
              <Typography
                variant="small"
                className="text-xs font-medium text-blue-gray-600 uppercase mb-2"
              >
                Leave Type
              </Typography>
              <Select
                value={leaveData.leaveType}
                onChange={(val) => handleChange("leaveType", val)}
                className={inputErrorClass("leaveType")}
              >
                {[
                  { label: "Half Day", value: "halfDay" },
                  { label: "Bereavement", value: "bereavement" },
                  { label: "Emergency Vollunter", value: "emergencyVollunter" },
                  { label: "Personal Injury/Illness", value: "personalInjury" },
                  { label: "Personal/Family Emergency", value: "Personal_FamilyEmergency" },
                  { label: "Weather Related Event", value: "weatherRelatedEvent" },
                  { label: "Work Related Injury/Illness", value: "workRelatedInjury" },
                  { label: "Transportation", value: "transportation" },
                  { label: "Other", value: "other" },
                  { label: "None", value: "none" },
                ].map(({ label, value }) => (
                  <Option key={value} value={value}>
                    {label}
                  </Option>
                ))}
              </Select>
              {errors.leaveType && (
                <Typography variant="small" className="text-red-600 mt-1">
                  {errors.leaveType}
                </Typography>
              )}
            </div>

            {/* From Date */}
            <div className="bg-gray-50 rounded-xl border p-4 shadow-sm">
              <Typography
                variant="small"
                className="text-xs font-medium text-blue-gray-600 uppercase mb-2"
              >
                From Date
              </Typography>
              <Input
                type="date"
                value={leaveData.fromDate}
                onChange={(e) => handleChange("fromDate", e.target.value)}
                className={inputErrorClass("fromDate")}
              />
              {errors.fromDate && (
                <Typography variant="small" className="text-red-600 mt-1">
                  {errors.fromDate}
                </Typography>
              )}
            </div>

            {/* To Date */}
            <div className="bg-gray-50 rounded-xl border p-4 shadow-sm">
              <Typography
                variant="small"
                className="text-xs font-medium text-blue-gray-600 uppercase mb-2"
              >
                To Date
              </Typography>
              <Input
                type="date"
                value={leaveData.toDate}
                onChange={(e) => handleChange("toDate", e.target.value)}
                className={inputErrorClass("toDate")}
              />
              {errors.toDate && (
                <Typography variant="small" className="text-red-600 mt-1">
                  {errors.toDate}
                </Typography>
              )}
            </div>

            {/* Conditionally show Start Time and End Time if Half Day */}
            {leaveData.leaveType === "halfDay" && (
              <>
                <div className="bg-gray-50 rounded-xl border p-4 shadow-sm">
                  <Typography
                    variant="small"
                    className="text-xs font-medium text-blue-gray-600 uppercase mb-2"
                  >
                    Start Time
                  </Typography>
                  <Input
                    type="time"
                    value={leaveData.startTime}
                    onChange={(e) => handleChange("startTime", e.target.value)}
                    className={inputErrorClass("startTime")}
                  />
                  {errors.startTime && (
                    <Typography variant="small" className="text-red-600 mt-1">
                      {errors.startTime}
                    </Typography>
                  )}
                </div>

                <div className="bg-gray-50 rounded-xl border p-4 shadow-sm">
                  <Typography
                    variant="small"
                    className="text-xs font-medium text-blue-gray-600 uppercase mb-2"
                  >
                    End Time
                  </Typography>
                  <Input
                    type="time"
                    value={leaveData.endTime}
                    onChange={(e) => handleChange("endTime", e.target.value)}
                    className={inputErrorClass("endTime")}
                  />
                  {errors.endTime && (
                    <Typography variant="small" className="text-red-600 mt-1">
                      {errors.endTime}
                    </Typography>
                  )}
                </div>
              </>
            )}

            {/* Reason */}
            <div className="col-span-full bg-gray-50 rounded-xl border p-4 shadow-sm">
              <Typography
                variant="small"
                className="text-xs font-medium text-blue-gray-600 uppercase mb-2"
              >
                Reason
              </Typography>
              <Textarea
                value={leaveData.reason}
                onChange={(e) => handleChange("reason", e.target.value)}
                rows={4}
                placeholder="State your reason clearly"
                className={inputErrorClass("reason")}
              />
              {errors.reason && (
                <Typography variant="small" className="text-red-600 mt-1">
                  {errors.reason}
                </Typography>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
