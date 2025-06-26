import {
  Card,
  CardBody,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Chip,
  Avatar,
} from "@material-tailwind/react";
import {
  ClipboardDocumentListIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";

const leaveTabs = [
  {
    label: "Requested",
    value: "requested",
    icon: ClipboardDocumentListIcon,
    color: "text-blue-600",
  },
  {
    label: "Pending",
    value: "pending",
    icon: ClockIcon,
    color: "text-yellow-600",
  },
  {
    label: "Approved",
    value: "approved",
    icon: CheckCircleIcon,
    color: "text-green-600",
  },
  {
    label: "Denied",
    value: "denied",
    icon: XCircleIcon,
    color: "text-red-600",
  },
];

// Fake leave data with images
const leaveData = [
  {
    id: 1,
    employee: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
    type: "Sick Leave",
    from: "2025-05-20",
    to: "2025-05-22",
    status: "requested",
  },
  {
    id: 2,
    employee: "Jane Smith",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    type: "Vacation",
    from: "2025-05-18",
    to: "2025-05-25",
    status: "approved",
  },
  {
    id: 3,
    employee: "Michael Lee",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    type: "Personal Leave",
    from: "2025-05-19",
    to: "2025-05-19",
    status: "pending",
  },
  {
    id: 4,
    employee: "Emily Brown",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    type: "Emergency Leave",
    from: "2025-05-15",
    to: "2025-05-16",
    status: "denied",
  },
  {
    id: 5,
    employee: "David Kim",
    avatar: "https://randomuser.me/api/portraits/men/91.jpg",
    type: "Sick Leave",
    from: "2025-05-21",
    to: "2025-05-21",
    status: "requested",
  },
];

export default function LeaveSummaryScreen() {
  const [activeTab, setActiveTab] = useState("requested");

  const filteredData = leaveData.filter((entry) => entry.status === activeTab);

  return (
    <div className="mt-12 px-4 sm:px-6 lg:px-8">
      <Typography variant="h4" className="mb-6 font-semibold text-blue-gray-800">
        Leave Summary
      </Typography>

      <Card className="mb-10 border border-blue-gray-100 shadow-lg">
        <Tabs value={activeTab} className="bg-gray-50 rounded-t-xl p-4">
          <TabsHeader
            className="flex gap-2 flex-wrap sm:flex-nowrap bg-white rounded-lg p-2 shadow-inner"
            indicatorProps={{
              className: "hidden", // We'll style active tab ourselves
            }}
          >
            {leaveTabs.map(({ label, value, icon: Icon, color }) => {
              const isActive = activeTab === value;

              return (
                <Tab
                  key={value}
                  value={value}
                  onClick={() => setActiveTab(value)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 
                    ${isActive ? "bg-blue-100 text-blue-700 shadow-md" : "text-blue-gray-600 hover:bg-blue-gray-50"}`}
                >
                  <Icon className={`h-5 w-5 ${color}`} />
                  <span>{label}</span>
                </Tab>
              );
            })}
          </TabsHeader>
        </Tabs>

        <CardBody className="p-6">
          {filteredData.length === 0 ? (
            <Typography variant="paragraph" className="text-blue-gray-500 italic">
              No {activeTab} leaves found.
            </Typography>
          ) : (
            <ul className="space-y-4">
              {filteredData.map((leave) => (
                <li
                  key={leave.id}
                  className="p-4 flex items-center gap-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
                >
                  <Avatar src={leave.avatar} alt={leave.employee} size="md" />
                  <div className="flex-1">
                    <Typography variant="h6" className="text-blue-gray-800">
                      {leave.employee}
                    </Typography>
                    <div className="flex items-center gap-3 mt-1">
                      <Chip
                        size="sm"
                        color={
                          leave.type.toLowerCase().includes("sick")
                            ? "green"
                            : leave.type.toLowerCase().includes("vacation")
                            ? "blue"
                            : "amber"
                        }
                        value={leave.type}
                        className="text-xs capitalize"
                      />
                      <Typography
                        variant="small"
                        className="text-xs text-blue-gray-500"
                      >
                        {leave.from} → {leave.to}
                      </Typography>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
