
import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { useMaterialTailwindController, setOpenSidenav, setOpenConfigurator } from "@/context";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/auth/sign-in");
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all duration-300 px-0 py-1 shadow-lg backdrop-blur-2xl bg-white/80 border border-white/20 hover:shadow-2xl ${
        fixedNavbar ? "sticky top-4 z-40" : "px-4"
      }`}
      fullWidth
      blurred={false}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center px-6 py-2">
        <div className="capitalize flex items-center gap-4">
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden hover:bg-blue-50 rounded-full transition-all duration-300 hover:scale-110"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
          
          <div className="animate-fade-in">
            <Breadcrumbs className="bg-transparent p-0 transition-all duration-300">
              <Link to={`/${layout}`}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal opacity-50 transition-all duration-300 hover:opacity-100 hover:text-blue-500"
                >
                  {layout}
                </Typography>
              </Link>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold"
              >
                {page}
              </Typography>
            </Breadcrumbs>
            <Typography variant="h6" color="blue-gray" className="animate-fade-in-up">
              {page || "Dashboard"}
            </Typography>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative flex w-full gap-2 md:w-max">
            <Input
              type="search"
              placeholder="Search..."
              containerProps={{
                className: "min-w-[200px] transition-all duration-300 hover:shadow-lg",
              }}
              className="!border-t-blue-gray-300 pl-9 placeholder:text-blue-gray-300 focus:!border-blue-500"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <div className="!absolute left-3 top-[13px]">
              <MagnifyingGlassIcon className="h-4 w-4 text-blue-gray-300" />
            </div>
          </div>

          {/* Time Display */}
          <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg animate-pulse">
            <ClockIcon className="h-4 w-4 text-blue-500" />
            <Typography variant="small" className="font-medium text-blue-gray-700">
              {currentTime.toLocaleTimeString()}
            </Typography>
          </div>

          {/* Notifications */}
          <IconButton variant="text" color="blue-gray" className="hover:bg-blue-50 transition-all duration-300 hover:scale-110 relative">
            <BellIcon className="h-5 w-5" />
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></div>
          </IconButton>

          {/* Settings */}
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setOpenConfigurator(dispatch, true)}
            className="hover:bg-blue-50 transition-all duration-300 hover:scale-110"
          >
            <Cog6ToothIcon className="h-5 w-5" />
          </IconButton>

          {/* User Menu */}
          <Menu placement="bottom-end">
            <MenuHandler>
              <Button
                variant="text"
                color="blue-gray"
                className="flex items-center gap-2 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto hover:bg-blue-50 transition-all duration-300 hover:scale-105"
              >
                <Avatar
                  variant="circular"
                  size="sm"
                  alt="User"
                  className="border border-gray-900 p-0.5 hover:scale-110 transition-transform duration-300"
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                />
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium hidden lg:block"
                >
                  {user.name || "User"}
                </Typography>
              </Button>
            </MenuHandler>
            <MenuList className="p-1 animate-scale-in bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-2xl">
              <MenuItem className="flex items-center gap-2 rounded hover:bg-blue-50 transition-all duration-300">
                <UserCircleIcon className="h-4 w-4" strokeWidth={2} />
                <Typography as="span" variant="small" className="font-normal">
                  My Profile
                </Typography>
              </MenuItem>
              <MenuItem className="flex items-center gap-2 rounded hover:bg-blue-50 transition-all duration-300">
                <Cog6ToothIcon className="h-4 w-4" strokeWidth={2} />
                <Typography as="span" variant="small" className="font-normal">
                  Edit Profile
                </Typography>
              </MenuItem>
              <hr className="my-2 border-blue-gray-50" />
              <MenuItem 
                className="flex items-center gap-2 rounded hover:bg-red-50 transition-all duration-300"
                onClick={handleLogout}
              >
                <PowerIcon className="h-4 w-4 text-red-500" strokeWidth={2} />
                <Typography as="span" variant="small" className="font-normal text-red-500">
                  Sign Out
                </Typography>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.tsx";
export default DashboardNavbar;
