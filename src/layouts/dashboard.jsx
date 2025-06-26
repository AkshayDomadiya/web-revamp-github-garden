import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import allRoutes from "@/routes"; // renamed to avoid collision
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  // Get user role from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "guest";

  // Filter routes based on role
  const routes = getRoutesByRole(allRoutes, role);

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element }, key) => (
                <Route key={key} exact path={path} element={element} />
              ))
          )}
        </Routes>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

// Helper: filter routes by role
const getRoutesByRole = (routes, role) => {
  return routes.map((section) => {
    const filteredPages = section.pages.filter((page) =>
      page.roles?.includes(role)
    );
    return { ...section, pages: filteredPages };
  });
};

Dashboard.displayName = "/src/layout/dashboard.jsx";
export default Dashboard;
