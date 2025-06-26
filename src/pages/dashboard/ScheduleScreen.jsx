import React, { useState } from 'react';
import {
  Typography,
  Button,
  Card,
  CardBody,
  Input,
  Textarea,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option,
} from '@material-tailwind/react';
import {
  PlusIcon,
  CalendarDaysIcon,
  ClockIcon,
  UserGroupIcon,
  ListBulletIcon
} from '@heroicons/react/24/solid';

export function ScheduleScreen() {
  const [view, setView] = useState('week');
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
  });

  const [scheduleMatrix, setScheduleMatrix] = useState([
    {
      time: '08:00 AM',
      events: [
        { id: 1, title: 'Team Meeting', day: 0, description: 'Weekly sync-up meeting with the team.' },
        { id: 2, title: 'Design Review', day: 1, description: 'Review UI/UX designs for the new feature.' },
      ]
    },
    {
      time: '09:00 AM',
      events: [
        { id: 3, title: 'Product Demo', day: 2, description: 'Demo to showcase new product capabilities.' },
      ]
    },
    {
      time: '03:00 PM',
      events: [
        { id: 4, title: 'Client Call', day: 4, description: 'Call with the client to discuss feedback.' },
      ]
    },
  ]);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setSelectedDay(event.day);
  };

  const renderEventDetails = () => {
    if (!selectedEvent) return null;
    return (
      <div className="mt-6 bg-white rounded-xl shadow p-4 border">
        <Typography variant="h6" className="text-gray-800 mb-2">Event Details</Typography>
        <Typography className="text-sm text-gray-700 mb-1"><strong>Title:</strong> {selectedEvent.title}</Typography>
        <Typography className="text-sm text-gray-700 mb-1"><strong>Day:</strong> {daysOfWeek[selectedDay]}</Typography>
        <Typography className="text-sm text-gray-700"><strong>Description:</strong> {selectedEvent.description}</Typography>
      </div>
    );
  };

  const handleAddEvent = () => {
    const eventDate = new Date(newEvent.date);
    const day = eventDate.getDay(); // 0 = Sun, 1 = Mon, ...
    const time = newEvent.time;

    const newEventData = {
      id: Date.now(),
      title: newEvent.title,
      day: day,
      description: newEvent.description,
    };

    const updatedMatrix = [...scheduleMatrix];
    const slot = updatedMatrix.find((s) => s.time === time);

    if (slot) {
      slot.events.push(newEventData);
    } else {
      updatedMatrix.push({ time: time, events: [newEventData] });
    }

    setScheduleMatrix(updatedMatrix);
    setNewEvent({ title: '', description: '', date: '', time: '' });
    setOpenAddDialog(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Add Schedule Button */}
      <div className="flex justify-between mb-4">
        {/* <Typography variant="h4" className="text-gray-800">Schedule</Typography> */}
        {/* <Button
          color="green"
          className="flex items-center gap-2"
          onClick={() => setOpenAddDialog(true)}
        >
          <PlusIcon className="w-5 h-5" />
          Add Schedule
        </Button> */}
      </div>

      {/* View Switcher */}
      <div className="bg-white shadow rounded-xl p-4">
        <div className="flex justify-between items-center mb-4">
          {/* View Toggle Buttons */}
          <div className="flex gap-2">
            {['day', 'week', 'month', 'list'].map((type) => (
              <Button
                key={type}
                variant={view === type ? 'filled' : 'outlined'}
                size="sm"
                className="flex items-center gap-1 capitalize"
                onClick={() => setView(type)}
              >
                {type === 'day' && <ClockIcon className="w-4 h-4" />}
                {type === 'week' && <CalendarDaysIcon className="w-4 h-4" />}
                {type === 'month' && <UserGroupIcon className="w-4 h-4" />}
                {type === 'list' && <ListBulletIcon className="w-4 h-4" />}
                {type}
              </Button>
            ))}
          </div>

          {/* Add Schedule Button */}
          <Button
            color="green"
            className="flex items-center gap-2"
            onClick={() => setOpenAddDialog(true)}
          >
            <PlusIcon className="w-5 h-5" />
            Add Schedule
          </Button>
        </div>

        {/* Week View */}
        {view === 'week' && (
          <div className="overflow-x-auto">
            <div className="grid grid-cols-8 border-t border-l">
              <div className="bg-gray-50 border-b border-r text-center font-medium py-2">Time</div>
              {daysOfWeek.map((day) => (
                <div key={day} className="bg-gray-50 border-b border-r text-center font-medium py-2">
                  {day}
                </div>
              ))}
              {scheduleMatrix.map((slot, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  <div className="border-b border-r text-sm px-2 py-4 bg-gray-50 text-center whitespace-nowrap">
                    {slot.time}
                  </div>
                  {Array.from({ length: 7 }).map((_, dayIndex) => {
                    const event = slot.events.find((e) => e.day === dayIndex);
                    return (
                      <div
                        key={dayIndex}
                        className="border-b border-r px-2 py-4 h-20 relative"
                      >
                        {event && (
                          <Card
                            className="absolute top-1 left-1 right-1 bg-green-100 border-l-4 border-green-600 shadow-md cursor-pointer"
                            onClick={() => handleEventClick(event)}
                          >
                            <CardBody className="p-2">
                              <Typography className="text-sm font-medium text-green-800">
                                {event.title}
                              </Typography>
                            </CardBody>
                          </Card>
                        )}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Day View */}
        {view === 'day' && (
          <div className="overflow-x-auto">
            <div className="grid grid-cols-2 border-t border-l">
              <div className="bg-gray-50 border-b border-r text-center font-medium py-2">Time</div>
              <div className="bg-gray-50 border-b border-r text-center font-medium py-2">Today</div>
              {scheduleMatrix.map((slot, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  <div className="border-b border-r text-sm px-2 py-4 bg-gray-50 text-center whitespace-nowrap">
                    {slot.time}
                  </div>
                  <div className="border-b border-r px-2 py-4 h-20 relative">
                    {slot.events.find((e) => e.day === 1) && (
                      <Card
                        className="absolute top-1 left-1 right-1 bg-blue-100 border-l-4 border-blue-600 shadow-md cursor-pointer"
                        onClick={() => handleEventClick(slot.events.find((e) => e.day === 1))}
                      >
                        <CardBody className="p-2">
                          <Typography className="text-sm font-medium text-blue-800">
                            {slot.events.find((e) => e.day === 1).title}
                          </Typography>
                        </CardBody>
                      </Card>
                    )}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Month View */}
        {view === 'month' && (
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 30 }).map((_, index) => (
              <div key={index} className="border h-32 p-2 bg-white shadow-sm rounded-md">
                <Typography variant="small" className="text-gray-700 mb-1">
                  {index + 1}
                </Typography>
                {(index === 1 || index === 7 || index === 14) && (
                  <Card className="bg-purple-100 border-l-4 border-purple-600 shadow-sm">
                    <CardBody className="p-1">
                      <Typography className="text-xs text-purple-800">Meeting</Typography>
                    </CardBody>
                  </Card>
                )}
              </div>
            ))}
          </div>
        )}

        {/* List View */}
        {view === 'list' && (
          <div className="space-y-4">
            {scheduleMatrix.flatMap((slot) => slot.events).map((event, idx) => (
              <Card key={idx} className="border-l-4 border-indigo-600 bg-indigo-50 cursor-pointer" onClick={() => handleEventClick(event)}>
                <CardBody>
                  <Typography className="text-base font-semibold text-indigo-800">
                    {event.title}
                  </Typography>
                  <Typography className="text-sm text-indigo-700">Time: {scheduleMatrix.find(s => s.events.includes(event))?.time}</Typography>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Selected Event Details */}
      {renderEventDetails()}

      {/* Add Schedule Dialog */}
      <Dialog open={openAddDialog} handler={setOpenAddDialog}>
        <DialogHeader>Add New Schedule</DialogHeader>
        <DialogBody className="space-y-4">
          <Input
            label="Title"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          />
          <Textarea
            label="Description"
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
          />
          <div>
            <Typography variant="small" className="text-gray-600 mb-1">Date</Typography>
            <input
              type="date"
              className="w-full border rounded px-3 py-2"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            />
          </div>
          <div>
            <Typography variant="small" className="text-gray-600 mb-1">Time</Typography>
            <input
              type="time"
              className="w-full border rounded px-3 py-2"
              value={newEvent.time}
              onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={() => setOpenAddDialog(false)} className="mr-2">
            Cancel
          </Button>
          <Button color="green" onClick={handleAddEvent}>
            Add
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default ScheduleScreen;
