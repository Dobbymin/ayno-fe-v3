import { useNavigate } from "react-router";

import { Center, EmptyState, Flex, Grid, Spinner, Text, VStack } from "@chakra-ui/react";

import { DYNAMIC_ROUTE_PATHS } from "@/shared";

import { FlowCard } from "../components";
import { useMainPage } from "../hooks";

export const ContentSection = () => {
  const navigate = useNavigate();

  const { flows, loading, error, currentPage, searchKeyword, sort } = useMainPage();

  return (
    <Flex direction="column" minH="600px">
      {loading ? (
        <Center py={20}>
          <Spinner size="xl" />
        </Center>
      ) : error ? (
        <Center py={20}>
          <Text color="red.500">{error}</Text>
        </Center>
      ) : flows.length === 0 ? (
        <EmptyState.Root py={20}>
          <EmptyState.Content>
            <VStack gap={4} textAlign="center">
              <EmptyState.Title fontSize="18px" fontWeight="500" color="gray.500">
                아직 등록된 글이 없습니다.
              </EmptyState.Title>
              <EmptyState.Description color="gray.400">첫 번째 글의 주인공이 되어보세요!</EmptyState.Description>
            </VStack>
          </EmptyState.Content>
        </EmptyState.Root>
      ) : (
        <Grid
          key={`${sort}-${currentPage}-${searchKeyword}`}
          templateColumns={{ base: "1fr", sm: "repeat(auto-fit, 430px)" }}
          justifyContent={{ base: "center", sm: "start" }}
          gap={10}
          animation="fadeIn 0.5s ease-out"
          css={{
            "@keyframes fadeIn": {
              from: { opacity: 0, transform: "translateY(20px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          {flows.map((flow) => (
            <FlowCard
              key={flow.artifactId}
              image={flow.thumbnailUrl}
              title={flow.artifactTitle}
              author={flow.nickname}
              authorImage={flow.profileImageUrl}
              likes={flow.likeCount}
              views={flow.viewCount.toLocaleString()}
              onClick={() => navigate(DYNAMIC_ROUTE_PATHS.ARTIFACT_DETAIL(flow.artifactId))}
            />
          ))}
        </Grid>
      )}
    </Flex>
  );
};
