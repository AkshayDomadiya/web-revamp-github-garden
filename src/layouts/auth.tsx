
import { Routes, Route } from "react-router-dom";
import {
  ChartPieIcon,
  UserIcon,
  UserPlusIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import routes from "@/routes";

interface NavRoute {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function Auth() {
  const navbarRoutes: NavRoute[] = [
    {
      name: "dashboard",
      path: "/dashboard/home",
      icon: ChartPieIcon,
    },
    {
      name: "profile",
      path: "/dashboard/profile",
      icon: UserIcon,
    },
    {
      name: "sign up",
      path: "/auth/sign-up",
      icon: UserPlusIcon,
    },
    {
      name: "sign in",
      path: "/auth/sign-in",
      icon: ArrowRightOnRectangleIcon,
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      <Routes>
        {routes.map(
          ({ layout, pages }) =>
            layout === "auth" &&
            pages.map(({ path, element }, key) => (
              <Route key={key} path={path} element={element} />
            ))
        )}
      </Routes>
    </div>
  );
}

Auth.displayName = "/src/layouts/auth.tsx";
export default Auth;
