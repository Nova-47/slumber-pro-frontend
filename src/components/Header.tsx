import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  IconButton,
  Text,
  useColorMode,
  useDisclosure,
  useColorModeValue,
  Stack,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from "@chakra-ui/react";
import { FaMoon, FaRegBell, FaSun } from "react-icons/fa";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import { Link } from "react-router-dom";
import ServiceMenu from "./ServiceMenu";
import useUser from "../lib/useUser";
import { logOut } from "../api";
import { useQueryClient } from "@tanstack/react-query";

export default function Header() {
  const { userLoading, isLoggedIn, user } = useUser();
  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();
  const {
    isOpen: isSignUpOpen,
    onClose: onSignUpClose,
    onOpen: onSignUpOpen,
  } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const cardTextColor = useColorModeValue("black", "white");
  const toast = useToast();
  const queryClient = useQueryClient();
  const onLogOut = async () => {
    const toastId = toast({
      title: "로그아웃 중...",
      description: "벌써 가신다니 슬프네요... 😢",
      status: "loading",
      position: "bottom-right",
    });
    await logOut();
    queryClient.refetchQueries({ queryKey: ["me"] });
    setTimeout(() => {
      toast.update(toastId, {
        status: "success",
        title: "다 됐어요!",
        description: "다음에 다시 만나요!",
      });
    }, 400);
  };

  return (
    <Flex
      direction={{ base: "column", md: "row" }} //
      justifyContent="space-between"
      alignItems="center"
      color="gray.200"
      py={10}
      px={5}
      borderBottom="1px"
    >
      {/* Slumber를 약간 오른쪽으로 이동 */}
      <Stack
        direction={{ base: "column", md: "row" }}
        p={4}
        px={{ base: 4, md: 20 }}
        justifyContent="space-between"
        spacing={{ sm: 4, md: 0 }}
        alignItems={"center"}
      >
        <Box display="flex" alignItems="center" color="blue.400">
          <Link to={"/"}>
            <FaRegBell size="40px" /> {/* FaRegBell과 Slumber 사이 간격 */}
          </Link>
          <Box ml={4}>
            {" "}
            {/* Slumber를 오른쪽으로 약간 이동 (8단위, 약 2rem) */}
            <Text color={"blue.400"} fontSize="2xl" fontWeight="bold">
              Slumber
            </Text>
          </Box>
        </Box>
      </Stack>

      {/* 메뉴 항목들 중앙 유지 */}
      <Box
        display={{ base: "none", md: "flex" }}
        justifyContent="center"
        color={cardTextColor}
      >
        <HStack spacing={9}>
          <Text>*</Text>
          <Text>소개</Text>
          <Divider orientation="vertical" height="20px" />
          <ServiceMenu />
          <Divider orientation="vertical" height="20px" />
          <Text>소식</Text>
          <Text>*</Text>
        </HStack>
      </Box>

      {/* 오른쪽 버튼들 */}
      <Stack
        direction={{ base: "column", md: "row" }}
        p={4}
        px={{ base: 4, md: 20 }}
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack spacing={2}>
          <IconButton
            onClick={toggleColorMode}
            variant="outline"
            aria-label="Toggle dark mode"
            icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
          />
          {!userLoading ? (
            !isLoggedIn ? (
              <>
                <Button onClick={onLoginOpen} color="blue.400">
                  Log in
                </Button>
                <Button onClick={onSignUpOpen} color="cyan.600">
                  Sign up
                </Button>
              </>
            ) : (
              <Menu>
                <MenuButton>
                  <Avatar name={user.name} src={user.avatar} size={"md"} />
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={onLogOut}
                    color={colorMode === "light" ? "gray.700" : "gray.100"}
                  >
                    Log out
                  </MenuItem>
                </MenuList>
              </Menu>
            )
          ) : null}
        </HStack>
      </Stack>

      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </Flex>
  );
}

/* import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  IconButton,
  Text,
  useColorMode,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { FaMoon, FaRegBell, FaSun } from "react-icons/fa";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

export default function Header() {
  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();
  const {
    isOpen: isSignUpOpen,
    onClose: onSignUpClose,
    onOpen: onSignUpOpen,
  } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const cardTextColor = useColorModeValue("black", "white");

  return (
    <Stack
      spacing={4}
      py={5}
      px={5}
      borderBottom="1px"
      alignItems="center"
      direction={{ base: "column", md: "row" }} 
      color="gray.200"
    >

      <Box display="flex" alignItems="center" color="blue.400">
        <FaRegBell size="40px" />
        <Box ml={4}>
          <Text color="blue.400" fontSize="2xl" fontWeight="bold">
            Slumber
          </Text>
        </Box>
      </Box>


      <Box
        display={{ base: "none", md: "flex" }}
        justifyContent="center"
        color={cardTextColor}
      >
        <HStack spacing={9}>
          <Text>*</Text>
          <Text>소개</Text>
          <Divider orientation="vertical" height="20px" />
          <Text>서비스</Text>
          <Divider orientation="vertical" height="20px" />
          <Text>소식</Text>
          <Text>*</Text>
        </HStack>
      </Box>


      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={2}
        alignItems="center"
      >
        <IconButton
          onClick={toggleColorMode}
          variant="outline"
          aria-label="Toggle dark mode"
          icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
        />
        <Button onClick={onLoginOpen} color="blue.400">
          Log in
        </Button>
        <Button onClick={onSignUpOpen} color="cyan.600">
          Sign up
        </Button>
      </Stack>


      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </Stack>
  );
} */

/*   <Stack
  justifyContent={"space-between"}
  alignItems={"center"}
  py={5}
  px={40}
  direction={{
    sm: "column",
    md: "row",
  }}
  spacing={{
    sm: 4,
    md: 0,
  }}
  borderBottomWidth={1}
> */
