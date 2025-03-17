import {
  Box,
  Flex,
  Text,
  Image,
  Button,
  HStack,
  VStack,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";

export default function Home() {
  const cardBg = useColorModeValue("blue.100", "cyan.200");
  const cardTextColor = useColorModeValue("black", "black");
  const secondaryCardBg = useColorModeValue("gray.400", "#4a4a6a");
  const { colorMode } = useColorMode();

  return (
    <Box minH="100vh" fontFamily="sans-serif">
      {/* 메인 콘텐츠 섹션 */}
      <Flex
        direction={{ base: "column", md: "row" }}
        p={4}
        px={{ base: 4, md: "5vw" }} // 상대 단위로 여백 조정
        justifyContent="space-between"
      >
        {/* 메인 이미지와 텍스트 */}
        <Box
          flex="4.2"
          position="relative"
          bg={useColorModeValue("gray.200", "gray.200")}
          borderRadius="md"
          borderColor={"gray.800"}
          overflow="hidden"
          mx={{ base: 0, md: "5vw" }} // 상대 단위로 여백 조정
        >
          <Image
            src={
              colorMode === "light"
                ? "https://i.ibb.co/1t6ZbLKr/5291a351-b966-461e-a453-1cbd7d12c085-1.jpg/800x400"
                : "https://i.ibb.co/JwxKGtYD/photo-2025-03-17-21-08-37.jpg/800x400"
            }
            alt="Slumber Event"
            objectFit="cover"
            w="100%"
            h="100%"
          />
        </Box>

        {/* 사이드 섹션 */}
        <VStack
          flex={[1, 2]} // flex 비율 증가 (1 -> 2)
          mt={{ base: 4, md: 0 }}
          spacing={6} // 카드 간 간격 증가
          align="stretch"
          mx={{ base: 0, md: "5vw" }} // 메인 섹션과 동일한 여백
        >
          <Box
            bg={cardBg}
            p={6} // 패딩 증가
            borderRadius="md"
            w="100%"
            color={cardTextColor}
          >
            <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium">
              서비스 이용자 수
              <br />
            </Text>
            <Text
              textAlign="center"
              fontSize={{ base: "2xl", md: "5xl" }} // 폰트 크기 증가
              fontWeight="medium"
              mt={2}
            >
              0
            </Text>
          </Box>
          <Box
            bg={secondaryCardBg}
            p={6} // 패딩 증가
            borderRadius="md"
            w="100%"
            color="white"
          >
            <Text fontSize={{ base: "sm", md: "md" }}>대외성과, 기사</Text>
            <Text
              fontSize={{ base: "lg", md: "xl" }} // 폰트 크기 증가
              fontWeight="bold"
              mt={2}
            >
              2025 슬럼버 성과 보고서
              <br />
              슬럼버 #보고서 #성과보고서
            </Text>
          </Box>
          <Box
            bg={cardBg}
            p={6} // 패딩 증가
            borderRadius="md"
            w="100%"
            color={cardTextColor}
          >
            <HStack justify="space-between">
              <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold">
                Nova-47
              </Text>
              <Button
                size={{ base: "sm", md: "md" }} // 버튼 크기 증가
                variant="outline"
                colorScheme="blackAlpha"
                borderColor={useColorModeValue("black", "white")}
                color={useColorModeValue("black", "white")}
              >
                ►
              </Button>
            </HStack>
          </Box>
        </VStack>
      </Flex>

      {/* 하단 텍스트 */}
      <Box p={4} textAlign="center">
        <Text fontSize="lg">그간의 이야기들</Text>
      </Box>
      <VStack></VStack>
    </Box>
  );
}

/* <Img
src="https://i.ibb.co/1t6ZbLKr/5291a351-b966-461e-a453-1cbd7d12c085-1.jpg"
alt="Naruto vs Sasuke amazing"
aspectRatio={4 / 3}
width="100%"
height="621px"
p={[2, 4, 8, 12]}
/> */

{
  /* <Box bg={bg} color={color} minH="100vh" fontFamily="sans-serif">
<Flex
  as="header"
  p={4}
  justify="space-between"
  align="center"
  bg={headerBg} 
  boxShadow="md" 
>


  <HStack spacing={4}>
    <Text>소개</Text>
    <Text>기획자 서비스</Text>
    <Text>약속과 책임</Text>
    <Text>소식</Text>
    <Text>투자정보</Text>
  </HStack>
  <HStack spacing={2}>
    <IconButton
      aria-label="Search"
      icon={<FaSearch />}
      variant="ghost"
      _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
    />
    <IconButton
      aria-label="Language"
      icon={<FaGlobe />}
      variant="ghost"
      _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
    />
    <IconButton
      aria-label="Toggle Color Mode"
      icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
      variant="ghost"
      onClick={toggleColorMode}
      _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
    />
  </HStack>
</Flex> */
}
