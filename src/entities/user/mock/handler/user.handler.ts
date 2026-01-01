import { HttpResponse, http } from "msw";

import { type ApiResponse, BASE_URL } from "@/shared";

import type { User } from "../../model";
import { USER_MOCK_DATA } from "../data";

export const userHandlers = [
  http.get(`${BASE_URL}/api/users/me/profile`, () => {
    const response: ApiResponse<User> = {
      data: USER_MOCK_DATA,
      status: "SUCCESS",
      serverDateTime: new Date().toISOString(),
      errorCode: "",
      errorMessage: "",
    };
    return HttpResponse.json(response);
  }),
];
