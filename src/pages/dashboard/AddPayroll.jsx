import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function AddPayroll() {
  const navigate = useNavigate();
  const location = useLocation();

  const isEdit = location.state?.mode === "edit";
  const editData = location.state?.data;

  const [formData, setFormData] = useState({
    name: "",
    basic: "",
    hra: "",
    allowances: "",
    deductions: "",
  });

  useEffect(() => {
    if (isEdit && editData) {
      setFormData({
        name: editData.name || "",
        basic: editData.basic || "",
        hra: editData.hra || "",
        allowances: editData.allowances || "",
        deductions: editData.deductions || "",
      });
    }
  }, [isEdit, editData]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    const { name, basic, hra, allowances, deductions } = formData;

    if (!name || !basic) {
      alert("Please fill in at least name and basic salary.");
      return;
    }

    const processedData = {
      ...formData,
      basic: parseFloat(basic),
      hra: parseFloat(hra || 0),
      allowances: parseFloat(allowances || 0),
      deductions: parseFloat(deductions || 0),
    };

    console.log(isEdit ? "Updated Payroll:" : "New Payroll:", processedData);

    // TODO: API call here (POST or PUT depending on `isEdit`)

    navigate("/dashboard/employee/payroll");
  };

  return (
    <div className="mt-12 mb-8 px-4">
      <Card className="shadow-lg rounded-xl">
        <CardHeader
          variant="gradient"
          color="blue-gray"
          className="p-6 flex justify-between items-center"
        >
          <Typography variant="h6" color="white">
            {isEdit ? "Edit Payroll Entry" : "Add Payroll Entry"}
          </Typography>
          <Button
            onClick={() => navigate(-1)}
            size="sm"
            color="white"
            className="flex items-center gap-2 text-gray-900"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back
          </Button>
        </CardHeader>

        <CardBody>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              label="Employee Name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <Input
              label="Basic Salary"
              type="number"
              value={formData.basic}
              onChange={(e) => handleChange("basic", e.target.value)}
            />
            <Input
              label="HRA"
              type="number"
              value={formData.hra}
              onChange={(e) => handleChange("hra", e.target.value)}
            />
            <Input
              label="Allowances"
              type="number"
              value={formData.allowances}
              onChange={(e) => handleChange("allowances", e.target.value)}
            />
            <Input
              label="Deductions"
              type="number"
              value={formData.deductions}
              onChange={(e) => handleChange("deductions", e.target.value)}
            />
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              color="green"
              onClick={handleSubmit}
              className="shadow-md hover:shadow-lg"
            >
              {isEdit ? "Update Payroll" : "Save Payroll"}
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
