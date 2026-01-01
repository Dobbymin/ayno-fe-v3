import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

import { ButtonGroup, Center, Pagination as ChakraPagination, IconButton } from "@chakra-ui/react";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  if (totalPages <= 1) return null;

  return (
    <Center pb={5} my="60px">
      <ChakraPagination.Root
        count={totalPages}
        pageSize={1}
        page={currentPage + 1}
        onPageChange={(e) => onPageChange(e.page - 1)}
      >
        <ButtonGroup variant="ghost" size="sm" gap={2}>
          <ChakraPagination.PrevTrigger asChild>
            <IconButton variant="ghost" color="gray.400">
              <HiChevronLeft />
            </IconButton>
          </ChakraPagination.PrevTrigger>

          <ChakraPagination.Items
            render={(page) => (
              <IconButton
                key={page.value}
                variant={page.value === currentPage + 1 ? "outline" : "ghost"}
                color={page.value === currentPage + 1 ? "black" : "gray.600"}
                bg={page.value === currentPage + 1 ? "gray.100" : "transparent"}
                borderRadius="full"
                w="30px"
                h="30px"
              >
                {page.value}
              </IconButton>
            )}
          />

          <ChakraPagination.NextTrigger asChild>
            <IconButton rounded="full" variant="ghost" color="gray.400">
              <HiChevronRight />
            </IconButton>
          </ChakraPagination.NextTrigger>
        </ButtonGroup>
      </ChakraPagination.Root>
    </Center>
  );
};
