export const ROUTE_PATHS = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  WRITE: "/write",
  ARTIFACT_DETAIL: "/artifact/:id",

  ADMIN: "/admin",
  ADMIN_LOGIN: "/admin/login",
  ADMIN_ARTIFACTS: "/admin/artifacts",
  ADMIN_INTERESTS: "/admin/interests",
  ADMIN_JOBS: "/admin/jobs",
  ADMIN_REPORTS: "/admin/reports",
  ADMIN_TOOLS: "/admin/tools",
  ADMIN_USER: "/admin/user",
};

export const DYNAMIC_ROUTE_PATHS = {
  ARTIFACT_DETAIL: (id: string) => `/artifact/${id}`,
};
