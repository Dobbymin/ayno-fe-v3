import { Navigate, Outlet } from "react-router";

import { Spinner } from "@chakra-ui/react";

import { AdminAuthProvider, useAdminAuthContext } from "@/entities";
import { ROUTE_PATHS } from "@/shared";

const PrivateAdminRouteInner = () => {
  const { isAdminLoggedIn, isLoading } = useAdminAuthContext();

  if (isLoading) {
    return <Spinner />;
  }

  if (!isAdminLoggedIn) {
    return <Navigate to={ROUTE_PATHS.ADMIN_LOGIN} replace />;
  }

  return <Outlet />;
};

export const PrivateAdminRoute = () => {
  return (
    <AdminAuthProvider>
      <PrivateAdminRouteInner />
    </AdminAuthProvider>
  );
};

export default PrivateAdminRoute;
