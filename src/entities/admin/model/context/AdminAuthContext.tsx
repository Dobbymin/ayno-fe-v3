import { type ReactNode, createContext, useCallback, useContext } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { adminLoginAPI } from "../apis";
import { ADMIN_QUERY_KEYS } from "../constants";
import { useGetAdminProfile } from "../hooks";
import type { AdminUser } from "../types";

type AdminAuthContextType = {
  adminUser: AdminUser | null;
  isAdminLoggedIn: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  checkAdminAuth: () => Promise<void>;
};

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const AdminAuthProvider = ({ children }: Props) => {
  const queryClient = useQueryClient();
  const { data: adminProfileData, isPending, isFetching, refetch } = useGetAdminProfile();

  const loginMutation = useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) => adminLoginAPI(username, password),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.admin.profile });
    },
  });

  const adminUser: AdminUser | null = adminProfileData?.data ?? null;
  const isLoading = isPending || isFetching || loginMutation.isPending;

  const checkAdminAuth = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const login = useCallback(
    async (username: string, password: string) => {
      await loginMutation.mutateAsync({ username, password });
      await refetch();
    },
    [loginMutation, refetch],
  );

  const logout = useCallback(() => {
    queryClient.removeQueries({ queryKey: ADMIN_QUERY_KEYS.admin.profile });
  }, [queryClient]);

  return (
    <AdminAuthContext.Provider
      value={{ adminUser, isAdminLoggedIn: !!adminUser, isLoading, login, logout, checkAdminAuth }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuthContext = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuthContext must be used within an AdminAuthProvider");
  }
  return context;
};
