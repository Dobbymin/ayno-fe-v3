import { type ApiResponse, client } from "@/shared";

import type { Interest } from "../types";

export const getInterestsAPI = async () => {
  const response = await client.get<ApiResponse<Interest[]>>("/api/interests");
  return response.data.data;
};

export const addInterestAPI = async (label: string) => {
  const response = await client.post<ApiResponse<Interest>>("/api/admin/interests", { label });
  return response.data;
};

export const deleteInterestAPI = async (interestId: number) => {
  const response = await client.delete<ApiResponse<void>>(`/api/admin/interests/${interestId}`);
  return response.data;
};
