import { useQuery } from "@tanstack/react-query";

import { getArtifactsAPI } from "../apis";
import { artifactsQueryKeys } from "../constants/artifacts-query-factory";

type UseGetArtifactsParams = {
  keyword?: string;
  page?: number;
  size?: number;
  sort?: string;
};

export const useGetArtifacts = ({ keyword, page = 0, size = 12, sort = "createdAt,desc" }: UseGetArtifactsParams) => {
  return useQuery({
    queryKey: artifactsQueryKeys.list({ keyword, page, size, sort }),
    queryFn: () => getArtifactsAPI(keyword, page, size, sort),
  });
};
