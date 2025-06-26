import { useLocation, Link } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
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
  const [layout, page] = pathname.split("/").filter((el) => el !== "");

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all duration-300 ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 px-4 shadow-lg backdrop-blur-xl bg-opacity-90"
          : "px-4 py-2"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-4 md:flex-row md:items-center">
        {/* Breadcrumb and Title */}
        <div className="capitalize">
          <Typography variant="h5" color="blue-gray" className="font-bold">
            {/* {page} */}
          </Typography>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Sidebar Toggle */}
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden z-50"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-600" />
          </IconButton>

          {/* Profile Link: Full button on xl, icon only on smaller screens */}
          <Link to="/dashboard/profile" className="flex items-center">
            <Button
              variant="gradient"
              color="blue"
              className="hidden xl:flex items-center gap-2 normal-case px-4 py-2"
            >
              <UserCircleIcon className="h-5 w-5 text-white" />
              Profile
            </Button>
            <IconButton
              variant="text"
              color="blue"
              className="flex xl:hidden items-center justify-center"
            >
              <UserCircleIcon className="h-6 w-6 text-blue-700" />
            </IconButton>
          </Link>

          {/* Notifications */}
          <Menu>
            <MenuHandler>
              <IconButton variant="text" color="blue-gray">
                <BellIcon className="h-6 w-6 text-blue-gray-600 hover:text-blue-700 transition" />
              </IconButton>
            </MenuHandler>
            <MenuList className="w-80 max-w-full border-0 shadow-xl">
              {/* Example notifications */}
              <MenuItem className="flex items-center gap-4">
                <Avatar
                  src="https://demos.creative-tim.com/material-dashboard/assets/img/team-2.jpg"
                  alt="message"
                  size="sm"
                />
                <div>
                  <Typography
                    variant="small"
                    className="font-medium text-blue-gray-800"
                  >
                    New message from Laur
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3 w-3" /> 13 minutes ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4">
                <Avatar
                  src="https://demos.creative-tim.com/material-dashboard/assets/img/small-logos/logo-spotify.svg"
                  alt="spotify"
                  size="sm"
                />
                <div>
                  <Typography variant="small" className="font-medium text-blue-gray-800">
                    New album by Travis Scott
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3 w-3" /> 1 day ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-blue-600 to-purple-700">
                  <CreditCardIcon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <Typography variant="small" className="font-medium text-blue-gray-800">
                    Payment successfully completed
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3 w-3" /> 2 days ago
                  </Typography>
                </div>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </Navbar>
  );
}

export default DashboardNavbar;
