import { type ApiResponse, client } from "@/shared";

import type { JobRole } from "../types";

export const getJobRolesAPI = async () => {
  const response = await client.get<ApiResponse<JobRole[]>>("/api/jobs");
  return response.data.data;
};

export const addJobRoleAPI = async (jobRoleLabel: string) => {
  const response = await client.post<ApiResponse<JobRole>>("/api/admin/jobs", { jobRoleLabel });
  return response.data;
};

export const deleteJobRoleAPI = async (jobRoleId: number) => {
  const response = await client.delete<ApiResponse<void>>(`/api/admin/jobs/${jobRoleId}`);
  return response.data;
};
