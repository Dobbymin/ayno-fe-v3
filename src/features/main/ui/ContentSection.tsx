import { useNavigate } from "react-router";

import { Spinner } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

import { ROUTE_PATHS } from "@/shared";

import { FlowCard } from "../components";
import { useMainPage } from "../hooks";

export const ContentSection = () => {
  const navigate = useNavigate();

  const { flows, loading, error, currentPage, searchKeyword, sort } = useMainPage();

  return (
    <ContentWrapper>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div>{error}</div>
      ) : flows.length === 0 ? (
        <EmptyStateContainer>
          <EmptyStateMessage>아직 등록된 글이 없습니다.</EmptyStateMessage>
          <p>첫 번째 글의 주인공이 되어보세요!</p>
        </EmptyStateContainer>
      ) : (
        <Grid key={`${sort}-${currentPage}-${searchKeyword}`}>
          {flows.map((flow) => (
            <FlowCard
              key={flow.artifactId}
              image={flow.thumbnailUrl}
              title={flow.artifactTitle}
              author={flow.nickname}
              authorImage={flow.profileImageUrl}
              likes={flow.likeCount}
              views={flow.viewCount.toLocaleString()}
              onClick={() => navigate(ROUTE_PATHS.ARTIFACT_DETAIL.replace(":id", flow.artifactId.toString()))}
            />
          ))}
        </Grid>
      )}
    </ContentWrapper>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 430px);
  justify-content: start; /* Align grid with title */
  gap: 40px;
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    justify-content: center;
  }
`;

const ContentWrapper = styled.div`
  min-height: 600px; /* Ensure content area doesn't collapse during loading */
  display: flex;
  flex-direction: column;
`;
const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  width: 100%;
  color: #888;
  gap: 16px;
`;

const EmptyStateMessage = styled.p`
  font-size: 18px;
  font-weight: 500;
`;
