import { useQuery } from "@tanstack/react-query";

import { getAdminProfileAPI } from "../apis";

export const useGetAdminProfile = () => {
  return useQuery({
    queryKey: ["admin-profile"],
    queryFn: getAdminProfileAPI,
  });
};
