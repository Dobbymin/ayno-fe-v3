import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router";

import { Box, Flex, Image, Input, InputGroup, Text } from "@chakra-ui/react";

import { useAuth } from "@/entities";
import { ROUTE_PATHS } from "@/shared";
import logo from "@/shared/_assets/logo_hero.svg";
import writeIcon from "@/shared/_assets/write.png";

import { useMainPage } from "../hooks";

export const HeroSection = () => {
  const navigate = useNavigate();

  const { isLoggedIn } = useAuth();

  const { handleSearch } = useMainPage();

  const [keyword, setKeyword] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(keyword);
    }
  };

  const onClickWrite = () => {
    if (isLoggedIn) {
      navigate(ROUTE_PATHS.WRITE);
    } else {
      navigate(ROUTE_PATHS.LOGIN);
    }
  };

  return (
    <Box as="section" textAlign="center" py="80px" px="20px" bg="transparent">
      <Flex justify="center">
        <Link to={ROUTE_PATHS.HOME}>
          <Image w={40} h="auto" mb={5} src={logo} alt="AYNO" />
        </Link>
      </Flex>
      <Text as="h2" mb={8} fontSize="3xl" fontWeight="extrabold" color="black">
        AI활용 과정을 공유하세요
      </Text>
      <Flex justify="center" align="center" gap="15px" maxW="800px" mx="auto">
        <Box flex={1} maxW="600px">
          <InputGroup
            w="full"
            startElement={
              <Box
                as="span"
                color="gray.400"
                fontSize="24px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                onClick={() => handleSearch(keyword)}
                ml={2}
              >
                <FiSearch />
              </Box>
            }
          >
            <Input
              h="60px"
              ps="60px"
              pe="20px"
              rounded="full"
              border="none"
              boxShadow="0 4px 15px rgba(0, 0, 0, 0.1)"
              fontSize="md"
              bg="white"
              placeholder="AYNO에서 검색..."
              _placeholder={{ color: "gray.400" }}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </InputGroup>
        </Box>
        <Box
          as="button"
          aria-label="Write"
          onClick={onClickWrite}
          w="60px"
          h="60px"
          rounded="full"
          bg="white"
          boxShadow="0 4px 15px rgba(0, 0, 0, 0.1)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          transition="transform 0.2s"
          _hover={{ transform: "scale(1.05)" }}
        >
          <Image src={writeIcon} alt="글쓰기" w="39px" h="39px" fit="contain" />
        </Box>
      </Flex>
    </Box>
  );
};
