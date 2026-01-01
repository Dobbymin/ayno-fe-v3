import { type ApiResponse, client } from "@/shared";

import type { AdminUser } from "../types";

export const adminLoginAPI = async (username: string, password: string) => {
  const response = await client.post<ApiResponse<{ admin: AdminUser }>>("/api/admin/auth/login", {
    username,
    password,
  });
  return response.data;
};
