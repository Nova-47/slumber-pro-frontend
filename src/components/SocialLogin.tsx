import {
  Box,
  Button,
  Divider,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FaComment, FaGithub } from "react-icons/fa";

const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
const kakaoParams = {
  client_id: KAKAO_CLIENT_ID,
  redirect_uri: "http://127.0.0.1:5173/social/kakao",
  response_type: "code",
};
const params = new URLSearchParams(kakaoParams).toString();
console.log(params);
export default function SocialLogin() {
  return (
    <Box mb={4}>
      <HStack my={8}>
        <Divider />
        <Text
          textTransform={"uppercase"}
          color={"gray.500"}
          fontSize={"xs"}
          as={"b"}
        >
          Or
        </Text>
        <Divider />
      </HStack>
      <VStack>
        <Button
          as={"a"}
          href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=read:user,user:email`}
          leftIcon={<FaGithub />}
          w={"100%"}
          bg={useColorModeValue("gray.700", "blue.700")}
          color={useColorModeValue("gray.200", "white")}
          _hover={{ bg: useColorModeValue("gray.800", "blue.800") }}
        >
          Continue with Github
        </Button>
        <Button
          as="a"
          href={`https://kauth.kakao.com/oauth/authorize?${params}`}
          leftIcon={<FaComment />}
          w={"100%"}
          colorScheme="yellow"
        >
          Continue with Kakao
        </Button>
      </VStack>
    </Box>
  );
}
