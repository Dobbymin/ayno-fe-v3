import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { getMyProfile } from "@/entities";
import { ROUTE_PATHS } from "@/shared";

import { type LoginRequest, loginAPI } from "../apis";
import { useAuthContext } from "../context";

export const useAuth = () => {
  const {
    login: contextLogin,
    logout: contextLogout,
    user,
    isLoggedIn,
    isAdmin,
    isLoading: isInitializing,
  } = useAuthContext();
  const navigate = useNavigate();

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [failCount, setFailCount] = useState(0);
  const [lockoutTime, setLockoutTime] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    if (!lockoutTime) {
      setRemainingTime(0);
      return;
    }

    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.ceil((lockoutTime - now) / 1000);
      if (diff <= 0) {
        setRemainingTime(0);
      } else {
        setRemainingTime(diff);
      }
    };

    updateTimer(); // Initial call
    const timerId = setInterval(updateTimer, 1000);

    return () => clearInterval(timerId);
  }, [lockoutTime]);

  const login = async ({ username, password }: LoginRequest) => {
    if (!username || !password) {
      setError("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    if (remainingTime > 0) {
      return; // Prevent login if locked out (using remainingTime is safer for UI sync)
    }

    if (lockoutTime && Date.now() < lockoutTime) {
      setError("로그인 시도가 너무 많습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    setIsLoggingIn(true);
    setError(null);
    try {
      await loginAPI({ username, password });
      const response = await getMyProfile();
      if (response.data) {
        contextLogin(response.data);
        setFailCount(0); // Reset on success
        setLockoutTime(null);
        navigate(ROUTE_PATHS.HOME);
      } else {
        navigate(ROUTE_PATHS.HOME);
      }
    } catch (err: unknown) {
      console.error("Login failed:", err);
      const message =
        typeof err === "object" && err !== null
          ? ((err as { response?: { data?: { errorMessage?: unknown } } }).response?.data?.errorMessage as
              | string
              | undefined) || "아이디 또는 비밀번호가 일치하지 않습니다."
          : "아이디 또는 비밀번호가 일치하지 않습니다.";
      setError(message);

      const newFailCount = failCount + 1;
      setFailCount(newFailCount);
      if (newFailCount >= 5) {
        const lockout = Date.now() + 60 * 1000;
        setLockoutTime(lockout); // 1 minute lockout
        setFailCount(0); // Reset count after lockout
        setError("로그인 시도가 너무 많습니다. 잠시 후 다시 시도해주세요.");
      }

      throw err;
    } finally {
      setIsLoggingIn(false);
    }
  };

  const kakaoLogin = () => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
    window.location.href = `${API_URL}/oauth2/authorization/kakao`;
  };

  const googleLogin = () => {
    alert("구글 로그인 준비 중입니다.");
  };

  const logout = () => {
    contextLogout();
    navigate(ROUTE_PATHS.HOME);
  };

  return {
    user,
    isLoggedIn,
    isAdmin,
    login,
    logout,
    kakaoLogin,
    googleLogin,
    isLoggingIn,
    isInitializing,
    error,
    lockoutTime,
    remainingTime,
  };
};
