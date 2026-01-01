import { Flex, Image } from "@chakra-ui/react";

import { SignupForm } from "@/features";
import logo from "@/shared/_assets/logo_hero.svg";

const SignupPage = () => {
  return (
    <Flex direction="column" align="center" justify="center" p="0 20px" minH="calc(100vh - 60px)">
      <Image w="150px" mb={8} src={logo} alt="AYNO" />
      <SignupForm />
    </Flex>
  );
};

export default SignupPage;
