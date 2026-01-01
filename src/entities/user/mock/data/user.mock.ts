import type { User } from "../../model";

export const USER_MOCK_DATA: User = {
  userId: 1,
  username: "testuser@example.com",
  nickname: "테스트유저",
  profileImageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=test",
  jobRoleName: "프론트엔드 개발자",
  interests: ["React", "TypeScript", "AI"],
  gender: "MALE",
  ageBand: "20-29",
  aiUsageDepth: "INTERMEDIATE",
  role: "USER",
};
