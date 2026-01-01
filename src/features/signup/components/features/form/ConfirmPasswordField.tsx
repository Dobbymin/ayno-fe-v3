import { useFormContext } from "react-hook-form";

import { type SignupSchemaType } from "@/entities";
import { FormControl, FormDescription, FormField, FormItem, FormMessage, PasswordInput } from "@/shared";

export const ConfirmPasswordField = () => {
  const form = useFormContext<SignupSchemaType>();

  return (
    <FormField
      control={form.control}
      name="confirmPassword"
      render={({ field, fieldState }) => (
        <FormItem>
          <FormControl>
            <PasswordInput
              w="full"
              bg="white"
              h={12}
              rounded="8px"
              fontSize="15px"
              border="1px solid #E5E7EB"
              placeholder="비밀번호를 다시 한번 입력해주세요"
              {...field}
            />
          </FormControl>
          {fieldState.error ? (
            <FormMessage />
          ) : (
            <FormDescription>
              영문 대소문자, 숫자, 특수문자를 3가지 이상으로 조합해 8자 이상 16자 이하로 입력해주세요.
            </FormDescription>
          )}
        </FormItem>
      )}
    />
  );
};
