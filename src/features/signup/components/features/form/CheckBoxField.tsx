import { Controller, useFormContext, useWatch } from "react-hook-form";
import { FiChevronRight } from "react-icons/fi";

import { Checkbox, Flex, Icon, Stack } from "@chakra-ui/react";
import type { z } from "zod";

import { signupSchema } from "@/entities";

type SignupFormValues = z.input<typeof signupSchema>;

export const CheckBoxField = () => {
  const form = useFormContext<SignupFormValues>();
  const { control, setValue, trigger, getValues } = form;

  const [over14, terms, privacy, marketingAgreed] = useWatch({
    control,
    name: ["over14", "terms", "privacy", "marketingAgreed"],
  });
  const values = [over14, terms, privacy, marketingAgreed].map(Boolean);
  const isAllChecked = values.every(Boolean);
  const isSomeChecked = values.some(Boolean);
  const allCheckedState: boolean | "indeterminate" = isAllChecked ? true : isSomeChecked ? "indeterminate" : false;

  const onClickAllCheck = () => {
    const [currentOver14, currentTerms, currentPrivacy, currentMarketingAgreed] = getValues([
      "over14",
      "terms",
      "privacy",
      "marketingAgreed",
    ]);
    const currentIsAllChecked = currentOver14 && currentTerms && currentPrivacy && currentMarketingAgreed;
    const newValue = !currentIsAllChecked;
    setValue("over14", newValue);
    setValue("terms", newValue);
    setValue("privacy", newValue);
    setValue("marketingAgreed", newValue);
    trigger(["over14", "terms", "privacy", "marketingAgreed"]);
  };

  return (
    <Stack gap={3} w="full" maxW="320px">
      <Flex
        align="center"
        borderBottom="1px solid"
        borderColor="gray.200"
        pb={3}
        onClick={onClickAllCheck}
        cursor="pointer"
      >
        <Checkbox.Root checked={allCheckedState} cursor="pointer">
          <Checkbox.HiddenInput />
          <Checkbox.Control rounded="sm">
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Label fontWeight="bold" color="black">
            전체 동의
          </Checkbox.Label>
        </Checkbox.Root>
      </Flex>

      <Flex align="center" justify="space-between">
        <Controller
          control={control}
          name="over14"
          render={({ field }) => (
            <Checkbox.Root
              checked={field.value}
              onCheckedChange={({ checked }) => field.onChange(checked)}
              cursor="pointer"
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control rounded="sm">
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label fontSize="sm" color="gray.500">
                [필수] 만 14세 이상입니다.
              </Checkbox.Label>
            </Checkbox.Root>
          )}
        />
      </Flex>

      <Flex align="center" justify="space-between">
        <Controller
          control={control}
          name="terms"
          render={({ field }) => (
            <Checkbox.Root
              checked={field.value}
              onCheckedChange={({ checked }) => field.onChange(checked)}
              cursor="pointer"
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control rounded="sm">
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label fontSize="sm" color="gray.500">
                [필수] AYNO 이용약관 동의
              </Checkbox.Label>
            </Checkbox.Root>
          )}
        />
        <Icon as={FiChevronRight} color="gray.400" fontSize="lg" />
      </Flex>

      <Flex align="center" justify="space-between">
        <Controller
          control={control}
          name="privacy"
          render={({ field }) => (
            <Checkbox.Root
              checked={field.value}
              onCheckedChange={({ checked }) => field.onChange(checked)}
              cursor="pointer"
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control rounded="sm">
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label fontSize="sm" color="gray.500">
                [필수] AYNO 개인정보 수집 및 이용 동의
              </Checkbox.Label>
            </Checkbox.Root>
          )}
        />
        <Icon as={FiChevronRight} color="gray.400" fontSize="lg" />
      </Flex>

      <Flex align="center" justify="space-between">
        <Controller
          control={control}
          name="marketingAgreed"
          render={({ field }) => (
            <Checkbox.Root
              checked={field.value}
              onCheckedChange={({ checked }) => field.onChange(checked)}
              cursor="pointer"
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control rounded="sm">
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label fontSize="sm" color="gray.500">
                [선택] 마케팅 목적의 개인정보 수집 및 이용 동의
              </Checkbox.Label>
            </Checkbox.Root>
          )}
        />
        <Icon as={FiChevronRight} color="gray.400" fontSize="lg" />
      </Flex>
    </Stack>
  );
};
