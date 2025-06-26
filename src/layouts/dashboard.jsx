
import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  // Get user role from localStorage
  const user = (() => {
    try {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  })();
  
  const userRole = user?.role || "user";

  // Filter routes based on user role
  const getFilteredRoutes = (routes) => {
    return routes.map(section => ({
      ...section,
      pages: section.pages.filter(page => 
        page.roles && page.roles.includes(userRole)
      )
    }));
  };

  const filteredRoutes = getFilteredRoutes(routes);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-zinc-100">
      <Sidenav
        routes={filteredRoutes}
        brandName="Employee Clock"
      />
      <div className="p-4 xl:ml-80 transition-all duration-300">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10 hover:shadow-xl transition-all duration-300 animate-bounce-slow"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5 animate-spin-slow" />
        </IconButton>
        <Routes>
          {filteredRoutes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
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

Dashboard.displayName = "/src/layouts/dashboard.jsx";
export default Dashboard;
