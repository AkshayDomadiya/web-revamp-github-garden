import {
  Card,
  CardBody,
  Typography,
  Button,
  Alert,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
  Avatar,
} from "@material-tailwind/react";
import { useState } from "react";

function getInitials(name) {
  if (!name) return "";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function PendingLeavesScreen() {
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      employeeName: "Alice Johnson",
      profileUrl: "https://randomuser.me/api/portraits/women/44.jpg",
      leaveType: "Vacation",
      fromDate: "2025-06-01",
      toDate: "2025-06-10",
      reason: "Family vacation",
      status: "Pending",
    },
    {
      id: 2,
      employeeName: "Bob Smith",
      profileUrl: "",
      leaveType: "Sick",
      fromDate: "2025-05-20",
      toDate: "2025-05-22",
      reason: "Flu recovery",
      status: "Pending",
    },
  ]);

  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedRejectId, setSelectedRejectId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "", visible: false });

  const openRejectModal = (id) => {
    setSelectedRejectId(id);
    setRejectionReason("");
    setRejectModalOpen(true);
  };

  const closeRejectModal = () => {
    setRejectModalOpen(false);
    setSelectedRejectId(null);
    setRejectionReason("");
  };

  const onApprove = (id) => {
    setLeaveRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "Approved" } : req))
    );
    setAlert({
      type: "green",
      message: "Leave request approved.",
      visible: true,
    });
    setTimeout(() => setAlert({ type: "", message: "", visible: false }), 3000);
  };

  const onReject = (id, reason) => {
    setLeaveRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? { ...req, status: "Rejected", rejectionReason: reason }
          : req
      )
    );
    setAlert({
      type: "red",
      message: `Leave request has been rejected.`,
      visible: true,
    });
  };

  const handleRejectSubmit = () => {
    onReject(selectedRejectId, rejectionReason);
    closeRejectModal();
    setTimeout(() => setAlert({ type: "", message: "", visible: false }), 3000);
  };

  const pendingLeaves = leaveRequests.filter((req) => req.status === "Pending");

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen flex flex-col gap-6">
      <Typography
        variant="h4"
        className="text-center text-gray-800 font-bold text-2xl sm:text-3xl"
      >
        Pending Leave Requests
      </Typography>

      {alert.visible && (
        <Alert
          color={alert.type}
          className="mb-4 max-w-3xl mx-auto"
          onClose={() => setAlert({ type: "", message: "", visible: false })}
        >
          {alert.message}
        </Alert>
      )}

      {pendingLeaves.length === 0 ? (
        <Typography className="text-center text-gray-600">
          No pending leave requests.
        </Typography>
      ) : (
        pendingLeaves.map((req) => (
          <Card
            key={req.id}
            className="w-full shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6 bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 flex flex-col sm:flex-row sm:items-center gap-4">
              {req.profileUrl && req.profileUrl.trim() !== "" ? (
                <Avatar
                  size="lg"
                  src={req.profileUrl}
                  alt={req.employeeName}
                  className="ring-2 ring-white shadow-md"
                />
              ) : (
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-yellow-700 text-white text-lg font-bold ring-2 ring-white shadow-md">
                  {getInitials(req.employeeName)}
                </div>
              )}
              <div className="text-center sm:text-left">
                <Typography
                  variant="h5"
                  className="text-gray-900 font-semibold text-lg sm:text-xl"
                >
                  {req.employeeName}
                </Typography>
                <Typography className="text-sm text-gray-700">
                  {req.leaveType}
                </Typography>
              </div>
            </div>

            <CardBody className="p-6">
              <div className="text-gray-700 text-sm sm:text-base mb-2">
                <strong>From:</strong> {req.fromDate}
              </div>
              <div className="text-gray-700 text-sm sm:text-base mb-2">
                <strong>To:</strong> {req.toDate}
              </div>
              <div className="text-gray-700 text-sm sm:text-base mb-2">
                <strong>Reason:</strong> {req.reason}
              </div>
              <div className="text-yellow-700 font-medium mb-4">
                Status: {req.status}
              </div>

              <div className="flex gap-3">
                <Button color="green" onClick={() => onApprove(req.id)}>
                  Approve
                </Button>
                <Button color="red" onClick={() => openRejectModal(req.id)}>
                  Reject
                </Button>
              </div>
            </CardBody>
          </Card>
        ))
      )}

      <Dialog open={rejectModalOpen} handler={closeRejectModal} size="md">
        <DialogHeader className="text-red-600 font-bold text-lg">
          Reject Leave Request
        </DialogHeader>
        <DialogBody divider>
          <Typography className="mb-4 text-gray-700">
            You can optionally provide a reason for rejecting this leave request:
          </Typography>
          <Textarea
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            label="Rejection Reason (optional)"
            color="red"
            size="lg"
            rows={4}
            placeholder="Enter rejection reason here (optional)..."
          />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="blue-gray"
            onClick={closeRejectModal}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button color="red" onClick={handleRejectSubmit}>
            Submit Reject
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
