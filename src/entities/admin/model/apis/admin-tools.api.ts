import { type ApiResponse, type PageResponse, client } from "@/shared";

import type { Tool } from "../types";

export const getToolAPI = async () => {
  const response = await client.get<ApiResponse<PageResponse<Tool>>>("/api/tools", {
    params: { size: 100 },
  });
  return response.data.data.content;
};

export const addToolAPI = async (data: Omit<Tool, "toolId">) => {
  const response = await client.post<ApiResponse<Tool>>("/api/admin/tools", data);
  return response.data;
};

export const deleteToolAPI = async (toolId: number) => {
  const response = await client.delete<ApiResponse<void>>(`/api/admin/tools/${toolId}`);
  return response.data;
};
