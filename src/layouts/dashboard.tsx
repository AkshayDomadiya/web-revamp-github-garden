
import { Routes, Route } from "react-router-dom";
import { IconButton } from "@material-tailwind/react";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import allRoutes, { type RouteSection, type UserRole } from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";

interface User {
  role: UserRole;
  [key: string]: any;
}

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  // Get user role from localStorage with type safety
  const user: User | null = (() => {
    try {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  })();
  
  const role: UserRole = user?.role || "user";

  // Filter routes based on role
  const routes = getRoutesByRole(allRoutes, role);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 animate-fade-in">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80 transition-all duration-300">
        <DashboardNavbar />
        <div className="mt-6 animate-fade-in-up">
          <Routes>
            {routes.map(
              ({ layout, pages }) =>
                layout === "dashboard" &&
                pages.map(({ path, element }, key) => (
                  <Route key={key} path={path} element={element} />
                ))
            )}
          </Routes>
        </div>
        <div className="text-blue-gray-600 mt-8">
          <Footer />
        </div>
      </div>
    </div>
  );
}

// Helper: filter routes by role with proper typing
const getRoutesByRole = (routes: RouteSection[], role: UserRole): RouteSection[] => {
  return routes.map((section) => {
    const filteredPages = section.pages.filter((page) =>
      page.roles?.includes(role)
    );
    return { ...section, pages: filteredPages };
  });
};

Dashboard.displayName = "/src/layouts/dashboard.tsx";
export default Dashboard;
