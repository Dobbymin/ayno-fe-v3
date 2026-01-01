import { type ApiResponse, type PageResponse, client } from "@/shared";

import type { Artifact } from "../types";

export const getArtifactsAPI = async (keyword?: string, page = 0, size = 12, sort = "createdAt,desc") => {
  const response = await client.get<ApiResponse<PageResponse<Artifact>>>("/api/artifacts", {
    params: {
      q: keyword || undefined,
      page,
      size,
      sort,
    },
  });
  return response.data;
};
