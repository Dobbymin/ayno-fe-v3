import { useState } from "react";

import { useGetArtifacts } from "./useGetArtifacts";

export const useMainPage = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [sort, setSort] = useState("createdAt,desc");

  const {
    data: artifactsData,
    isLoading,
    isError,
    refetch,
  } = useGetArtifacts({
    keyword: searchKeyword,
    page: currentPage,
    size: 12,
    sort,
  });

  const flows = artifactsData?.data?.content || [];
  const totalPages = artifactsData?.data?.totalPages || 0;

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
    setCurrentPage(0);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return {
    flows,
    loading: isLoading,
    error: isError ? "artifacts 불러오기 실패" : null,
    currentPage,
    totalPages,
    sort,
    setSort,
    searchKeyword,
    handleSearch,
    handlePageChange,
    refresh: refetch,
  };
};
