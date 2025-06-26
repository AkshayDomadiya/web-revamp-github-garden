
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";

interface SidenavProps {
  brandImg?: string;
  brandName?: string;
  routes: any[];
}

export function Sidenav({ brandImg = "/img/logo-ct.png", brandName = "Employee Clock", routes }: SidenavProps) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 backdrop-blur-xl",
    white: "bg-white/95 backdrop-blur-xl shadow-2xl border border-gray-200/50",
    transparent: "bg-white/10 backdrop-blur-2xl border border-white/20",
  };

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-2xl transition-all duration-500 ease-in-out xl:translate-x-0 shadow-2xl animate-slide-in-right`}
    >
      <div className="relative border-b border-white/10 pb-4">
        <Link to="/dashboard/home" className="flex items-center justify-center py-8 px-8 text-center hover-scale">
          <Typography
            variant="h5"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
            className="font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse"
          >
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-4 top-4 grid rounded-full xl:hidden hover:bg-white/10 transition-all duration-300"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      
      <div className="m-4 custom-scrollbar max-h-[calc(100vh-200px)] overflow-y-auto">
        {routes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-6 flex flex-col gap-2">
            {title && (
              <li className="mx-3.5 mt-6 mb-3">
                <Typography
                  variant="small"
                  color={sidenavType === "dark" ? "white" : "blue-gray"}
                  className="font-black uppercase opacity-75 tracking-wider"
                >
                  {title}
                </Typography>
              </li>
            )}
            {pages.map(({ icon, name, path }) => (
              <li key={name} className="group">
                <NavLink to={`/${layout}${path}`}>
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "gradient" : "text"}
                      color={
                        isActive
                          ? sidenavColor
                          : sidenavType === "dark"
                          ? "white"
                          : "blue-gray"
                      }
                      className={`flex items-center gap-4 px-4 py-3 capitalize rounded-xl transition-all duration-300 hover:bg-white/10 hover:scale-105 group-hover:shadow-lg ${
                        isActive ? "shadow-xl scale-105" : ""
                      }`}
                      fullWidth
                    >
                      <div className="transition-transform duration-300 group-hover:scale-110">
                        {icon}
                      </div>
                      <Typography
                        color="inherit"
                        className="font-medium capitalize tracking-wide"
                      >
                        {name}
                      </Typography>
                    </Button>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </aside>
  );
}

Sidenav.displayName = "/src/widgets/layout/sidenav.tsx";
export default Sidenav;
