
import React from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { type RouteSection } from "@/routes";

interface SidenavProps {
  brandImg?: string;
  brandName?: string;
  routes: RouteSection[];
}

export function Sidenav({ brandImg, brandName, routes }: SidenavProps) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-900 to-blue-900",
    white: "bg-white shadow-xl",
    transparent: "bg-white/10 backdrop-blur-lg",
  };

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-2xl transition-all duration-300 xl:translate-x-0 border border-blue-gray-100/20 shadow-2xl`}
    >
      <div className="relative">
        <Link to="/dashboard/home" className="flex items-center justify-center py-8 px-8">
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
            className="font-bold text-center"
          >
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      
      <div className="m-4 overflow-y-auto max-h-[calc(100vh-200px)]">
        {routes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mx-3.5 mt-4 mb-2">
                <Typography
                  variant="small"
                  color={sidenavType === "dark" ? "white" : "blue-gray"}
                  className="font-black uppercase opacity-75 tracking-wide"
                >
                  {title}
                </Typography>
              </li>
            )}
            {pages
              .filter(page => page.name && page.icon) // Only show routes with name and icon
              .map(({ icon, name, path }) => (
                <li key={name}>
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
                        className={`flex items-center gap-4 px-4 py-3 capitalize transition-all duration-200 ${
                          isActive 
                            ? "shadow-lg scale-105" 
                            : "hover:bg-white/10 hover:scale-102"
                        }`}
                        fullWidth
                      >
                        {icon}
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
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

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "Employee Clock",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidenav.tsx";
export default Sidenav;
