import { Navigate, Outlet } from "react-router";

import { Spinner } from "@chakra-ui/react";

import { useAuth } from "@/entities";
import { ROUTE_PATHS } from "@/shared";

const PrivateRoute = () => {
  const { isLoggedIn, isInitializing } = useAuth();

  if (isInitializing) {
    return <Spinner />;
  }

  if (!isLoggedIn) {
    return <Navigate to={ROUTE_PATHS.LOGIN} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
