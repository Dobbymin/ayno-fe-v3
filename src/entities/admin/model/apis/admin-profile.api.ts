import { type ApiResponse, client } from "@/shared";

import type { AdminUser } from "../types";

export const getAdminProfileAPI = async () => {
  const response = await client.get<ApiResponse<AdminUser>>("/api/admin/profile");
  return response.data;
};
