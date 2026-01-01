import { type ApiResponse, client } from "@/shared";

export interface SignupRequest {
  email: string;
  password: string;
  marketingAgreed: boolean;
}

export interface SignupResponse {
  message: string;
}

export const signupAPI = async (data: SignupRequest) => {
  const response = await client.post<ApiResponse<SignupResponse>>("/api/auth/signup", data);
  return response.data;
};
