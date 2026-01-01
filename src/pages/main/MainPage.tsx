import styled from "@emotion/styled";

import { ContentSection, HeaderSection, HeroSection, PaginationSection } from "@/features";

const MainContainer = styled.div`
  max-width: 1410px; /* Fits 3 cards (430*3 + 40*2 + 40 padding) */
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 1410px) {
    max-width: 940px; /* Fits 2 cards (430*2 + 40 + 40 padding) */
  }

  @media (max-width: 940px) {
    max-width: 470px; /* Fits 1 card (430 + 40 padding) */
  }
`;

export default function MainPage() {
  return (
    <>
      <HeroSection />
      <MainContainer>
        <HeaderSection />
        <ContentSection />
        <PaginationSection />
      </MainContainer>
    </>
  );
}
