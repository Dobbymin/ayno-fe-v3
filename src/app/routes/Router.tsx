import { BrowserRouter, Route, Routes } from "react-router";

import {
  AdminLoginPage,
  AdminPage,
  ArtifactsPage,
  DetailPage,
  InterestsPage,
  JobsPage,
  LoginPage,
  MainPage,
  ReportsPage,
  SignupPage,
  ToolsPage,
  UserPage,
  WritePage,
} from "@/pages";
import { ROUTE_PATHS } from "@/shared";

import { PrivateAdminRoute } from "./components";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTE_PATHS.HOME} element={<MainPage />} />
        <Route path={ROUTE_PATHS.LOGIN} element={<LoginPage />} />
        <Route path={ROUTE_PATHS.SIGNUP} element={<SignupPage />} />
        <Route path={ROUTE_PATHS.WRITE} element={<WritePage />} />
        <Route path={ROUTE_PATHS.ARTIFACT_DETAIL} element={<DetailPage />} />
        <Route path={ROUTE_PATHS.ADMIN_LOGIN} element={<AdminLoginPage />} />

        {/* Admin Routes */}
        <Route element={<PrivateAdminRoute />}>
          <Route path={ROUTE_PATHS.ADMIN} element={<AdminPage />} />
          <Route path={ROUTE_PATHS.ADMIN_ARTIFACTS} element={<ArtifactsPage />} />
          <Route path={ROUTE_PATHS.ADMIN_INTERESTS} element={<InterestsPage />} />
          <Route path={ROUTE_PATHS.ADMIN_JOBS} element={<JobsPage />} />
          <Route path={ROUTE_PATHS.ADMIN_REPORTS} element={<ReportsPage />} />
          <Route path={ROUTE_PATHS.ADMIN_TOOLS} element={<ToolsPage />} />
          <Route path={ROUTE_PATHS.ADMIN_USER} element={<UserPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
