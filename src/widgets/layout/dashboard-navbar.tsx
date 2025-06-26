
import { useLocation, Link } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenSidenav,
} from "@/context";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-2xl transition-all duration-300 ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 px-6 shadow-xl backdrop-blur-xl bg-white/90 border border-blue-gray-100/20"
          : "px-6 py-4"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-4 md:flex-row md:items-center">
        {/* Page Title */}
        <div className="capitalize">
          <Typography variant="h5" color="blue-gray" className="font-bold tracking-tight">
            Welcome back! 👋
          </Typography>
          <Typography variant="small" color="gray" className="font-normal">
            Manage your team efficiently
          </Typography>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Sidebar Toggle */}
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden z-50 transition-all duration-200 hover:bg-blue-gray-50"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-600" />
          </IconButton>

          {/* Profile Link */}
          <Link to="/dashboard/profile" className="flex items-center">
            <Button
              variant="gradient"
              color="blue"
              className="hidden xl:flex items-center gap-2 normal-case px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <UserCircleIcon className="h-5 w-5 text-white" />
              Profile
            </Button>
            <IconButton
              variant="text"
              color="blue"
              className="flex xl:hidden items-center justify-center transition-all duration-200 hover:bg-blue-50"
            >
              <UserCircleIcon className="h-6 w-6 text-blue-700" />
            </IconButton>
          </Link>

          {/* Notifications */}
          <Menu>
            <MenuHandler>
              <IconButton 
                variant="text" 
                color="blue-gray"
                className="transition-all duration-200 hover:bg-blue-gray-50"
              >
                <BellIcon className="h-6 w-6 text-blue-gray-600 hover:text-blue-700 transition" />
              </IconButton>
            </MenuHandler>
            <MenuList className="w-80 max-w-full border-0 shadow-2xl rounded-xl">
              <div className="p-4 border-b border-blue-gray-100">
                <Typography variant="h6" color="blue-gray">
                  Notifications
                </Typography>
              </div>
              {/* Sample notifications */}
              {[
                {
                  avatar: "https://demos.creative-tim.com/material-dashboard/assets/img/team-2.jpg",
                  title: "New message from John",
                  time: "13 minutes ago",
                },
                {
                  avatar: "https://demos.creative-tim.com/material-dashboard/assets/img/small-logos/logo-spotify.svg",
                  title: "Leave request submitted",
                  time: "1 day ago",
                },
                {
                  icon: CreditCardIcon,
                  title: "Payroll processed successfully",
                  time: "2 days ago",
                },
              ].map((notification, index) => (
                <MenuItem key={index} className="flex items-center gap-4 py-3 hover:bg-blue-gray-50 transition-colors">
                  {notification.avatar ? (
                    <Avatar
                      src={notification.avatar}
                      alt="notification"
                      size="sm"
                      className="ring-2 ring-blue-gray-100"
                    />
                  ) : (
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-blue-600 to-purple-700">
                      <notification.icon className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div className="flex-1">
                    <Typography
                      variant="small"
                      className="font-medium text-blue-gray-800"
                    >
                      {notification.title}
                    </Typography>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center gap-1 text-xs font-normal opacity-60"
                    >
                      <ClockIcon className="h-3 w-3" /> {notification.time}
                    </Typography>
                  </div>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </div>
      </div>
    </Navbar>
  );
}

export default DashboardNavbar;
