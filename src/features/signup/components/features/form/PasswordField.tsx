import { useFormContext } from "react-hook-form";

import { type SignupSchemaType } from "@/entities";
import { FormControl, FormField, FormItem, FormMessage, PasswordInput } from "@/shared";

export const PasswordField = () => {
  const form = useFormContext<SignupSchemaType>();

  return (
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <PasswordInput
              w="full"
              bg="white"
              h={12}
              rounded="8px"
              fontSize="15px"
              border="1px solid #E5E7EB"
              placeholder="비밀번호를 입력해주세요"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
