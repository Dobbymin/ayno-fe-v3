export type ApiResponse<T> = {
  data: T;
  status: string;
  serverDateTime: string;
  errorCode: string;
  errorMessage: string;
};
