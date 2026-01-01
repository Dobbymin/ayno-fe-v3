import styled from "@emotion/styled";

import { useMainPage } from "../hooks";

export const HeaderSection = () => {
  const { sort, setSort } = useMainPage();

  return (
    <SectionHeader>
      <StyledSectionTitle>신규 플로우</StyledSectionTitle>
      <SortContainer>
        <SortButton active={sort === "likeCount,desc"} onClick={() => setSort("likeCount,desc")}>
          인기순
        </SortButton>
        <Separator>|</Separator>
        <SortButton active={sort === "createdAt,desc"} onClick={() => setSort("createdAt,desc")}>
          최신순
        </SortButton>
      </SortContainer>
    </SectionHeader>
  );
};

const SectionHeader = styled.div`
  margin-top: 60px;
  margin-bottom: 40px; /* Increased spacing */
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledSectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #000;
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  color: #888;
`;

const SortButton = styled.button<{ active: boolean }>`
  font-size: 16px;
  color: ${({ active }) => (active ? "#000" : "#888")};
  font-weight: ${({ active }) => (active ? "700" : "400")};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: #000;
  }
`;

const Separator = styled.span`
  color: #ddd;
  font-size: 16px;
  transform: translateY(-1px); /* Visual correction for vertical alignment */
`;
