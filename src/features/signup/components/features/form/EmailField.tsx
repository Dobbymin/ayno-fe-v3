import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FiCheck } from "react-icons/fi";

import { Box, Button, Icon, Input } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";

import { type SignupSchemaType, checkUsernameAPI } from "@/entities";
import { FormControl, FormField, FormItem, FormMessage } from "@/shared";

export const EmailField = () => {
  const form = useFormContext<SignupSchemaType>();
  const [isEmailChecked, setIsEmailChecked] = useState(false);

  const { mutate: checkEmailMutate, isPending } = useMutation({
    mutationFn: checkUsernameAPI,
    onSuccess: (data) => {
      if (data.data.available) {
        setIsEmailChecked(true);
        form.clearErrors("email");
      } else {
        setIsEmailChecked(false);
        form.setError("email", { message: "이미 사용 중인 이메일입니다." });
      }
    },
    onError: () => {
      setIsEmailChecked(false);
      form.setError("email", { message: "이메일 확인 중 오류가 발생했습니다." });
    },
  });

  const checkEmail = () => {
    const email = form.getValues("email");
    if (!email) return;

    form.trigger("email").then((isValid) => {
      if (isValid) {
        checkEmailMutate(email);
      }
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue("email", e.target.value);

    if (isEmailChecked) setIsEmailChecked(false);
  };

  return (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Box w="full" position="relative">
              <Input
                bg="white"
                w="full"
                h={12}
                rounded="8px"
                fontSize="15px"
                border="1px solid #E5E7EB"
                placeholder="이메일을 입력해주세요"
                {...field}
                onChange={onChange}
                pr="90px"
              />
              <Button
                position="absolute"
                right={0}
                top="50%"
                transform="translateY(-50%)"
                height={8}
                fontSize="13px"
                onClick={checkEmail}
                disabled={!field.value || isEmailChecked || isPending}
                loading={isPending}
                variant="ghost"
                color={isEmailChecked ? "green.500" : "gray.500"}
                _hover={{ bg: "transparent", color: isEmailChecked ? "green.600" : "gray.700" }}
                _disabled={{ opacity: isEmailChecked ? 1 : 0.4, cursor: isEmailChecked ? "default" : "not-allowed" }}
              >
                {isEmailChecked ? (
                  <>
                    <Icon as={FiCheck} mr={1} />
                    확인완료
                  </>
                ) : (
                  "중복확인"
                )}
              </Button>
            </Box>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
