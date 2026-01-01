export type AdminRole = "ADMIN" | "OPERATOR";

export type AdminStatus = "ACTIVE" | "SUSPENDED" | "DELETED";

export type AdminUser = {
  adminId: number;
  adminName: string;
  role: AdminRole;
  status: AdminStatus;
};

export type AdminLoginResponse = {
  accessToken: string;
  refreshToken: string;
  admin: AdminUser;
};
