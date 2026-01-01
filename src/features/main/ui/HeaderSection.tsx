import { Box, Flex, HStack, Heading, Text } from "@chakra-ui/react";

import { useMainPage } from "../hooks";

export const HeaderSection = () => {
  const { sort, setSort } = useMainPage();

  return (
    <Flex as="header" mt="60px" mb="40px" justify="space-between" align="center">
      <Heading as="h2" fontSize="24px" fontWeight="700" color="black">
        신규 플로우
      </Heading>
      <HStack gap="10px">
        <Box
          as="button"
          fontSize="16px"
          color={sort === "likeCount,desc" ? "black" : "gray.400"}
          fontWeight={sort === "likeCount,desc" ? "700" : "400"}
          cursor="pointer"
          _hover={{ color: "black" }}
          onClick={() => setSort("likeCount,desc")}
        >
          인기순
        </Box>
        <Text color="gray.200" fontSize="16px" mt="-2px">
          |
        </Text>
        <Box
          as="button"
          fontSize="16px"
          color={sort === "createdAt,desc" ? "black" : "gray.400"}
          fontWeight={sort === "createdAt,desc" ? "700" : "400"}
          cursor="pointer"
          _hover={{ color: "black" }}
          onClick={() => setSort("createdAt,desc")}
        >
          최신순
        </Box>
      </HStack>
    </Flex>
  );
};
