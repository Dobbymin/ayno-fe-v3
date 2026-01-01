import { userHandlers } from "@/entities";
import { artifactsHandlers } from "@/features";

export const handlers = [...artifactsHandlers, ...userHandlers];
