import { HttpResponse, http } from "msw";

import { BASE_URL } from "@/shared";

import { ARTIFACTS_MOCK_DATA } from "../data";

export const artifactsHandlers = [
  http.get(`${BASE_URL}/api/artifacts`, () => {
    return HttpResponse.json({
      success: true,
      data: {
        content: ARTIFACTS_MOCK_DATA,
        totalPages: 10,
        totalElements: 120,
        size: 12,
        number: 0,
      },
      error: null,
    });
  }),
];
