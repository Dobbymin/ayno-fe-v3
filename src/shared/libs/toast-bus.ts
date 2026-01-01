import type { Toast, ToastType } from "../types";

export const TOAST_EVENT_NAME = "app:toast" as const;

export type EmitToastInput = {
  id?: string;
  message: string;
  type: ToastType;
};

const createToastId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export const emitToast = (input: EmitToastInput): Toast => {
  const toast: Toast = {
    id: input.id ?? createToastId(),
    message: input.message,
    type: input.type,
  };

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent<Toast>(TOAST_EVENT_NAME, { detail: toast }));
  }

  return toast;
};
