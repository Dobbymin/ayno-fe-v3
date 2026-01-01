import { Pagination } from "../components";
import { useMainPage } from "../hooks";

export const PaginationSection = () => {
  const { flows, loading, error, currentPage, totalPages, handlePageChange } = useMainPage();
  return (
    <>
      {!loading && !error && flows.length > 0 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </>
  );
};
