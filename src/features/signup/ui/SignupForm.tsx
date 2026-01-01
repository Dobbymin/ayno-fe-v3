import { type SubmitHandler, useForm } from "react-hook-form";

import { Button, Flex } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type { z } from "zod";

import { signupAPI, signupSchema } from "@/entities";
import { Form } from "@/shared";

import { CheckBoxField, ConfirmPasswordField, EmailField, PasswordField } from "../components";

type SignupFormValues = z.input<typeof signupSchema>;

export const SignupForm = () => {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      over14: false,
      terms: false,
      privacy: false,
      marketingAgreed: false,
    },
    mode: "onChange",
  });

  const { mutate: signupMutate, isPending } = useMutation({
    mutationFn: signupAPI,
  });

  const onSubmit: SubmitHandler<SignupFormValues> = (data) => {
    signupMutate({
      email: data.email,
      password: data.password,
      marketingAgreed: data.marketingAgreed ?? false,
    });
  };

  return (
    <Form {...form}>
      <Flex w="full" maxW="320px" as="form" flexDir="column" gap={6} onSubmit={(e) => e.preventDefault()}>
        <EmailField />
        <PasswordField />
        <ConfirmPasswordField />
        <CheckBoxField />
        <Button
          w="full"
          h={12}
          fontSize="md"
          rounded="8px"
          fontWeight="bold"
          border="none"
          type="submit"
          transition="opacity 0.2s"
          _disabled={{ opacity: 0.4, cursor: "not-allowed" }}
          onClick={form.handleSubmit(onSubmit)}
          disabled={!form.formState.isValid || isPending}
        >
          회원가입
        </Button>
      </Flex>
    </Form>
  );
};
