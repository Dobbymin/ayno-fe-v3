import "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    suppressErrorToast?: boolean;
  }

  export interface InternalAxiosRequestConfig {
    suppressErrorToast?: boolean;
  }
}
