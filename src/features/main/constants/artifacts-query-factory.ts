type ArtifactsListFilters = {
  keyword?: string;
  page?: number;
  size?: number;
  sort?: string;
};

export const artifactsQueryKeys = {
  all: ["artifacts"],
  list: (filters: ArtifactsListFilters) => [...artifactsQueryKeys.all, filters],
};
