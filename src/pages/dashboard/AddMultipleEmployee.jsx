import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Input,
    Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

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

const emptyRow = fields.reduce((acc, field) => {
    acc[field.key] = "";
    return acc;
}, {});

export default function AddMultipleEmployee() {
    const [rows, setRows] = useState(Array(10).fill({ ...emptyRow }));
    const navigate = useNavigate();

    const handleInputChange = (index, field, value) => {
        const newRows = [...rows];
        newRows[index] = { ...newRows[index], [field]: value };
        setRows(newRows);
    };

    const handleSubmit = () => {
        const filledRows = rows.filter((row) =>
            fields.some((field) => row[field.key].trim() !== "")
        );

        if (filledRows.length === 0) {
            alert("Please fill at least one employee before submitting.");
            return;
        }

        const trimmedRows = filledRows.map((row) => {
            const trimmed = {};
            fields.forEach((field) => {
                trimmed[field.key] = row[field.key].trim();
            });
            return trimmed;
        });

        console.log("Submitting employees:", trimmedRows);
    };

    return (
        <div className="mt-12 mb-8 px-4">
            <Card className="shadow-lg rounded-xl">
                <CardHeader
                    variant="gradient"
                    color="gray"
                    className="p-6 flex justify-between items-center"
                >
                    <Typography variant="h6" color="white">
                        Add Multiple Employees
                    </Typography>
                    <Button
                        onClick={() => navigate(-1)}
                        size="sm"
                        color="white"
                        className="flex items-center gap-2 text-gray-900 shadow-md hover:shadow-lg"
                    >
                        <ArrowLeftIcon className="h-4 w-4" />
                        Back
                    </Button>
                </CardHeader>

                <CardBody className="p-4">
                    {/* Desktop Table */}
                    <div className="hidden lg:block overflow-x-auto">
                        <table className="w-full table-auto text-left border rounded-md overflow-hidden">
                            <thead>
                                <tr className="bg-blue-gray-50">
                                    {fields.map((field) => (
                                        <th
                                            key={field.key}
                                            className="p-3 text-sm font-semibold text-blue-gray-700 border"
                                        >
                                            {field.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, rowIndex) => (
                                    <tr key={rowIndex} className="">
                                        {fields.map((field) => (
                                            <td key={field.key} className="p-2 border">
                                                <Input
                                                    size="md"
                                                    value={row[field.key]}
                                                    onChange={(e) =>
                                                        handleInputChange(rowIndex, field.key, e.target.value)
                                                    }
                                                    placeholder={field.label}
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile View: Card for each row */}
                    <div className="lg:hidden space-y-6">
                        {rows.map((row, rowIndex) => (
                            <Card key={rowIndex} className="p-4 border border-blue-gray-100 shadow-md">
                                <Typography variant="small" className="font-bold mb-2">
                                    Employee {rowIndex + 1}
                                </Typography>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {fields.map((field) => (
                                        <div key={field.key}>
                                            <Input
                                                label={field.label}
                                                value={row[field.key]}
                                                onChange={(e) =>
                                                    handleInputChange(rowIndex, field.key, e.target.value)
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button
                            color="green"
                            onClick={handleSubmit}
                            className="shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                        >
                            Save Employees
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
