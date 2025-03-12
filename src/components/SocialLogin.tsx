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
          leftIcon={<FaGithub />}
          w={"100%"}
          bg={useColorModeValue("gray.700", "blue.700")}
          color={useColorModeValue("gray.200", "white")}
          _hover={{ bg: useColorModeValue("gray.800", "blue.800") }}
        >
          Continue with Github
        </Button>
        <Button leftIcon={<FaComment />} w={"100%"} colorScheme="yellow">
          Continue with Kakao
        </Button>
      </VStack>
    </Box>
  );
}
