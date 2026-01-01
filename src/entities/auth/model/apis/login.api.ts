import { type ApiResponse, client } from "@/shared";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
}

export const loginAPI = async (data: LoginRequest) => {
  const response = await client.post<ApiResponse<LoginResponse>>("/api/auth/login", data);
  return response.data;
};
