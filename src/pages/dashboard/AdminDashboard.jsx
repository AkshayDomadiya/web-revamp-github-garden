import React from "react";
import {
    Typography,
    Card,
    CardBody,
    Avatar,
    Chip,
    Button,
} from "@material-tailwind/react";
import {
    UserGroupIcon,
    BanknotesIcon,
    BuildingOffice2Icon,
} from "@heroicons/react/24/solid";
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

export default function AdminDashboard() {
    const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

    const summaryCards = [
        { title: "Employees", icon: UserGroupIcon, value: "154", color: "bg-blue-500" },
        { title: "Companies", icon: BuildingOffice2Icon, value: "12", color: "bg-green-500" },
        { title: "Payroll (₹)", icon: BanknotesIcon, value: "₹4.2M", color: "bg-yellow-500" },
    ];

    const exceptionCards = [
        { label: "Arrived Early", value: 17, color: "bg-orange-500" },
        { label: "Arrived Late", value: 2, color: "bg-red-500" },
        { label: "Left Early", value: 0, color: "bg-purple-500" },
        { label: "Left Late", value: 0, color: "bg-indigo-500" },
        { label: "No Show", value: 27, color: "bg-yellow-500" },
        { label: "Missing Punch", value: 0, color: "bg-pink-500" },
    ];

    const pieData = [
        { name: "Engineering", value: 60 },
        { name: "HR", value: 25 },
        { name: "Sales", value: 40 },
        { name: "Admin", value: 29 },
    ];

    const payrollPieData = [
        { name: "Basic Salary", value: 50 },
        { name: "HRA", value: 20 },
        { name: "Bonus", value: 15 },
        { name: "Deductions", value: 15 },
    ];

    const barData = [
        { day: "Mon", total: 390 },
        { day: "Tue", total: 400 },
        { day: "Wed", total: 380 },
        { day: "Thu", total: 390 },
        { day: "Fri", total: 370 },
    ];

    const employees = [
        { name: "Adrian Maranje", status: "WORKING", time: "8:45 AM" },
        { name: "Alexis Gonzalez", status: "WORKING", time: "9:00 AM" },
        { name: "Brianna Talley", status: "WORKING", time: "8:45 AM" },
    ];

    const approachingOvertime = [
        {
            name: "Christopher Casely",
            avatar: "https://i.pravatar.cc/40?img=14",
            hours: "30:20 (Weekly)",
            approaching: "9h 39m to OT1",
            status: "Working",
        },
    ];

    const timeOffRequests = [
        {
            name: "Kalina Jaime",
            avatar: "https://i.pravatar.cc/40?img=15",
            hours: "16 Hr(s)",
            date: "Nov 18 → Nov 19",
            type: "Vacation",
        },
        {
            name: "Natalia Krasnova",
            avatar: "https://i.pravatar.cc/40?img=16",
            hours: "8 Hr(s)",
            date: "Oct 8, 2021",
            type: "Floating Holiday",
        },
    ];

    return (
        <div className="p-6 space-y-10">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {summaryCards.map(({ title, icon, value, color }, i) => (
                    <Card key={i} className="p-4">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-full text-white ${color}`}>
                                {React.createElement(icon, { className: "h-6 w-6" })}
                            </div>
                            <div>
                                <Typography variant="h6">{title}</Typography>
                                <Typography variant="h4" className="font-bold">
                                    {value}
                                </Typography>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Payroll Pie Chart */}
                <Card className="p-4">
                    <Typography variant="h6" className="mb-2">
                        Payroll Breakdown
                    </Typography>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={payrollPieData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                dataKey="value"
                                label
                            >
                                {payrollPieData.map((_, i) => (
                                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Card>

                {/* Scheduled Hours Bar Chart */}
                <Card className="p-4">
                    <Typography variant="h6" className="mb-2">
                        Scheduled Hours
                    </Typography>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={barData}>
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="total" fill="#0ea5e9" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            </div>

            {/* Exception Cards + Employee Status in 1 row */}
            <div className="md:flex md:gap-6 space-y-6 md:space-y-0">
                {/* Exception Cards Scrollable */}
                <Card className="md:w-1/2 w-full overflow-x-auto p-4">
                    <Typography variant="h6" className="mb-4">Exceptions</Typography>
                    <div className="flex flex-wrap gap-4">
                        {exceptionCards.map(({ label, value, color }, i) => (
                            <div key={i} className={`w-[45%] min-w-[130px] p-4 rounded text-white ${color}`}>
                                <Typography variant="h6">{value}</Typography>
                                <Typography variant="small">{label}</Typography>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Employee Status Table */}
                <Card className="md:w-1/2 w-full p-4">
                    <Typography variant="h6" className="mb-4">Employee Status</Typography>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr>
                                    <th className="p-2">Name</th>
                                    <th className="p-2">Status</th>
                                    <th className="p-2">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((e, i) => (
                                    <tr key={i} className="border-b hover:bg-gray-100">
                                        <td className="p-2">{e.name}</td>
                                        <td className="p-2 text-green-600">{e.status}</td>
                                        <td className="p-2">{e.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>

            {/* Approaching Overtime */}
            <Card className="p-4">
                <Typography variant="h6" className="mb-4">Approaching Overtime</Typography>
                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th className="p-2">Name</th>
                            <th className="p-2">Worked Hours</th>
                            <th className="p-2">Approaching</th>
                            <th className="p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {approachingOvertime.map((e, i) => (
                            <tr key={i} className="border-b hover:bg-gray-50">
                                <td className="p-2 flex items-center gap-2">
                                    <Avatar src={e.avatar} size="sm" />
                                    {e.name}
                                </td>
                                <td className="p-2">{e.hours}</td>
                                <td className="p-2">{e.approaching}</td>
                                <td className="p-2 text-green-600">{e.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>

            {/* Time Off Requests */}
            <Card className="p-4">
                <Typography variant="h6" className="mb-4">Time Off Requests</Typography>
                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th className="p-2">Name</th>
                            <th className="p-2">Type</th>
                            <th className="p-2">Duration</th>
                            <th className="p-2">Date</th>
                            <th className="p-2 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timeOffRequests.map((e, i) => (
                            <tr key={i} className="border-b hover:bg-gray-50">
                                <td className="p-2 flex items-center gap-2">
                                    <Avatar src={e.avatar} size="sm" />
                                    {e.name}
                                </td>
                                <td className="p-2">{e.type}</td>
                                <td className="p-2">{e.hours}</td>
                                <td className="p-2">{e.date}</td>
                                <td className="p-2 text-right">
                                    <Button size="sm" color="green" className="mr-2">Approve</Button>
                                    <Button size="sm" color="red">Deny</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}
