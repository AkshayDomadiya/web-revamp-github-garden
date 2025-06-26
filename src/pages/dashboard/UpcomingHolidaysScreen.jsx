
import React, { useState } from "react";
import { 
  Card, 
  CardHeader, 
  CardBody, 
  Typography, 
  Avatar,
  Button,
  Input,
  IconButton,
  Chip
} from "@material-tailwind/react";
import { 
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  MapPinIcon,
  ClockIcon
} from "@heroicons/react/24/solid";

function getInitials(name) {
  if (!name) return "";
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

const holidays = [
  {
    id: 1,
    name: "New Year's Day",
    date: "2025-01-01",
    description: "Celebration of the New Year - Fresh starts and new beginnings",
    imageUrl: "",
    type: "National",
    daysLeft: 5,
    location: "All Offices"
  },
  {
    id: 2,
    name: "Independence Day",
    date: "2025-08-15",
    description: "National Independence Day - Celebrating freedom and unity",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_India.svg",
    type: "National",
    daysLeft: 231,
    location: "All Offices"
  },
  {
    id: 3,
    name: "Christmas Day",
    date: "2025-12-25",
    description: "Christmas celebration - Season of joy and giving",
    imageUrl: "",
    type: "Religious",
    daysLeft: 363,
    location: "All Offices"
  },
  {
    id: 4,
    name: "Company Anniversary",
    date: "2025-06-15",
    description: "Celebrating 10 years of excellence and growth",
    imageUrl: "",
    type: "Company",
    daysLeft: 170,
    location: "Headquarters"
  }
];

export default function UpcomingHolidaysScreen() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHolidays = holidays.filter(holiday =>
    holiday.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    holiday.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeColor = (type) => {
    switch (type) {
      case 'National': return 'bg-blue-500';
      case 'Religious': return 'bg-purple-500';
      case 'Company': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeChipColor = (type) => {
    switch (type) {
      case 'National': return 'blue';
      case 'Religious': return 'purple';
      case 'Company': return 'green';
      default: return 'gray';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <Typography variant="h3" className="font-bold text-gray-900 mb-2 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center">
                <CalendarDaysIcon className="w-6 h-6 text-white" />
              </div>
              Upcoming Holidays
            </Typography>
            <Typography className="text-gray-600">
              Plan ahead with our holiday calendar and company events
            </Typography>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search holidays..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
                containerProps={{ className: "min-w-[250px]" }}
              />
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="h4" className="font-bold">
                  {holidays.length}
                </Typography>
                <Typography className="opacity-90">Total Holidays</Typography>
              </div>
              <CalendarDaysIcon className="w-12 h-12 opacity-80" />
            </div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="h4" className="font-bold">
                  {holidays.filter(h => h.daysLeft <= 30).length}
                </Typography>
                <Typography className="opacity-90">This Month</Typography>
              </div>
              <ClockIcon className="w-12 h-12 opacity-80" />
            </div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="h4" className="font-bold">
                  {holidays.filter(h => h.type === 'National').length}
                </Typography>
                <Typography className="opacity-90">National</Typography>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                🎌
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="h4" className="font-bold">
                  {holidays.filter(h => h.type === 'Company').length}
                </Typography>
                <Typography className="opacity-90">Company Events</Typography>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                🏢
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Holidays Grid */}
      {filteredHolidays.length === 0 ? (
        <Card className="shadow-lg">
          <CardBody className="text-center py-12">
            <CalendarDaysIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <Typography variant="h6" color="gray" className="mb-2">
              No holidays found
            </Typography>
            <Typography color="gray">
              Try adjusting your search criteria
            </Typography>
          </CardBody>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredHolidays.map((holiday) => (
            <Card
              key={holiday.id}
              className="shadow-xl hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden"
            >
              <CardHeader
                floated={false}
                className={`m-0 h-32 ${getTypeColor(holiday.type)} bg-gradient-to-r relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-between p-6 text-white">
                  <div className="flex items-center gap-4">
                    {holiday.imageUrl && holiday.imageUrl.trim() !== "" ? (
                      <Avatar
                        size="lg"
                        src={holiday.imageUrl}
                        alt={holiday.name}
                        className="ring-2 ring-white/50 shadow-lg"
                      />
                    ) : (
                      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-2xl font-bold ring-2 ring-white/50">
                        {getInitials(holiday.name)}
                      </div>
                    )}
                    <div>
                      <Typography variant="h6" className="font-bold mb-1">
                        {holiday.name}
                      </Typography>
                      <Typography variant="small" className="opacity-90">
                        {holiday.date}
                      </Typography>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 mb-2">
                      <Typography variant="small" className="font-bold">
                        {holiday.daysLeft}
                      </Typography>
                      <Typography variant="small" className="text-xs opacity-90">
                        days left
                      </Typography>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardBody className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Chip
                    value={holiday.type}
                    color={getTypeChipColor(holiday.type)}
                    className="font-medium"
                  />
                  <div className="flex items-center gap-1 text-gray-500">
                    <MapPinIcon className="w-4 h-4" />
                    <Typography variant="small">
                      {holiday.location}
                    </Typography>
                  </div>
                </div>
                
                <Typography className="text-gray-700 mb-4 leading-relaxed">
                  {holiday.description}
                </Typography>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-4 h-4 text-gray-400" />
                    <Typography variant="small" className="text-gray-600">
                      {new Date(holiday.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </Typography>
                  </div>
                  <Button
                    size="sm"
                    variant="text"
                    className="text-indigo-600 hover:bg-indigo-50"
                  >
                    Add to Calendar
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
