import { z } from "zod";

export const signupSchema = z.object({
  email: z
    .string()
    .min(1, { message: "이메일을 입력해주세요." })
    .email({
      message: "올바른 이메일 형식이 아닙니다.",
    })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: "올바른 이메일 형식이 아닙니다.",
    }),
  password: z
    .string()
    .min(8, {
      message: "영문 대소문자, 숫자, 특수문자를 3가지 이상으로 조합해 8자 이상 16자 이하로 입력해주세요.",
    })
    .max(16, {
      message: "영문 대소문자, 숫자, 특수문자를 3가지 이상으로 조합해 8자 이상 16자 이하로 입력해주세요.",
    })
    .refine(
      (value) => {
        let count = 0;
        if (/[a-z]/.test(value)) count++;
        if (/[A-Z]/.test(value)) count++;
        if (/[0-9]/.test(value)) count++;
        if (/[^a-zA-Z0-9]/.test(value)) count++;
        return count >= 3;
      },
      {
        message: "영문 대소문자, 숫자, 특수문자를 3가지 이상으로 조합해 8자 이상 16자 이하로 입력해주세요.",
      },
    ),
  confirmPassword: z.string().min(8, {
    message: "영문 대소문자, 숫자, 특수문자를 3가지 이상으로 조합해 8자 이상 16자 이하로 입력해주세요.",
  }),
  over14: z.boolean().refine((val) => val === true, {
    message: "만 14세 이상 동의는 필수입니다.",
  }),
  terms: z.boolean().refine((val) => val === true, {
    message: "이용약관 동의는 필수입니다.",
  }),
  privacy: z.boolean().refine((val) => val === true, {
    message: "개인정보 수집 및 이용 동의는 필수입니다.",
  }),
  marketingAgreed: z.boolean().default(false),
});

export type SignupSchemaType = z.infer<typeof signupSchema>;

export type SignupFormValues = z.input<typeof signupSchema>;
