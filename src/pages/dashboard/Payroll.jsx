import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const payrollData = [
  {
    id: 1,
    name: "John Doe",
    basic: 30000,
    hra: 8000,
    allowances: 5000,
    deductions: 2000,
  },
  {
    id: 2,
    name: "Jane Smith",
    basic: 35000,
    hra: 10000,
    allowances: 7000,
    deductions: 2500,
  },
];

export default function Payroll() {
  const navigate = useNavigate();

  const calculateNetPay = (item) => {
    return item.basic + item.hra + item.allowances - item.deductions;
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
            Employee Payroll
          </Typography>
          <Button
            onClick={() => navigate("/dashboard/employee/payroll/add")}
            size="sm"
            color="white"
            className="text-gray-900 shadow-md hover:shadow-lg"
          >
            + Add Payroll
          </Button>
        </CardHeader>

        <CardBody className="overflow-x-auto">
          <table className="w-full table-auto min-w-[800px] text-left">
            <thead>
              <tr className="bg-blue-gray-50">
                <th className="p-3 text-sm font-semibold text-blue-gray-700">Employee Name</th>
                <th className="p-3 text-sm font-semibold text-blue-gray-700">Basic</th>
                <th className="p-3 text-sm font-semibold text-blue-gray-700">HRA</th>
                <th className="p-3 text-sm font-semibold text-blue-gray-700">Allowances</th>
                <th className="p-3 text-sm font-semibold text-blue-gray-700">Deductions</th>
                <th className="p-3 text-sm font-semibold text-blue-gray-700">Net Pay</th>
                <th className="p-3 text-sm font-semibold text-blue-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payrollData.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">₹{item.basic.toLocaleString()}</td>
                  <td className="p-3">₹{item.hra.toLocaleString()}</td>
                  <td className="p-3">₹{item.allowances.toLocaleString()}</td>
                  <td className="p-3">₹{item.deductions.toLocaleString()}</td>
                  <td className="p-3 font-semibold text-green-600">
                    ₹{calculateNetPay(item).toLocaleString()}
                  </td>
                  <td className="p-3">
                    <Button
                      onClick={() =>
                        navigate("/dashboard/employee/payroll/add", {
                          state: { mode: "edit", data: item },
                        })
                      }
                      size="sm"
                      color="blue"
                      className="text-white"
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
