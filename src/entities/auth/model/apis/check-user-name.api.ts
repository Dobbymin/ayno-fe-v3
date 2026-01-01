import { type ApiResponse, client } from "@/shared";

export interface CheckUsernameResponse {
  available: boolean;
}

export const checkUsernameAPI = async (username: string) => {
  const response = await client.post<ApiResponse<CheckUsernameResponse>>(
    `/api/auth/check/username?username=${username}`,
  );
  return response.data;
};
