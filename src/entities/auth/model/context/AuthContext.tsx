import { createContext, useCallback, useContext, useState } from "react";

import { type User, useGetMyProfile } from "@/entities";

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const { data: profileData, isLoading: isProfileLoading, refetch } = useGetMyProfile();

  // Sync user state with profileData when it changes
  const [prevProfileData, setPrevProfileData] = useState(profileData);
  if (profileData !== prevProfileData) {
    setPrevProfileData(profileData);
    setUser(profileData?.data ?? null);
  }

  const checkAuth = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const login = useCallback((userData: User) => {
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    // TODO: Call logout API to clear cookies if needed
  }, []);

  return (
    <AuthContext
      value={{
        user,
        isLoggedIn: !!user,
        isAdmin: user?.role === "ADMIN",
        isLoading: isProfileLoading,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
