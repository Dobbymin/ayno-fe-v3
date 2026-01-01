import type { AxiosRequestConfig } from "axios";

import { type ApiResponse, client } from "@/shared";

import type { User } from "../types";

export const getMyProfile = async (config?: AxiosRequestConfig): Promise<ApiResponse<User>> => {
  const response = await client.get<ApiResponse<User>>("/api/users/me/profile", config);
  return response.data;
};
