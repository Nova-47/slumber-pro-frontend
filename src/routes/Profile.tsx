import { useEffect, useState } from "react";
import { getMe, updateMe } from "../api";
import { IPrivateUser } from "../types";
import {
  Flex,
  Text,
  Input,
  Button,
  VStack,
  FormControl,
  FormLabel,
  chakra,
  Spinner,
  Heading,
} from "@chakra-ui/react";

export default function Profile() {
  const [user, setUser] = useState<IPrivateUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getMe();
        setUser(userData);
        setFormData({
          name: userData.name || "",
          email: userData.email || "",
        });
      } catch (error) {
        console.error("유저 정보 가져오기 실패:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedUser = await updateMe(formData);
      setUser(updatedUser);
      alert("수정되었습니다.");
    } catch (error) {
      console.error("유저 정보 수정 실패:", error);
    }
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" minHeight="80vh">
        <VStack spacing={4}>
          <Heading size="md">불러오는 중입니다!</Heading>
          <Text>어디 가지 마세요!</Text>
          <Spinner size="lg" />
        </VStack>
      </Flex>
    );
  }

  if (!user) {
    return (
      <Flex justify="center" align="center" minHeight="80vh">
        <Text fontSize="lg">유저 정보를 불러올 수 없습니다.</Text>
      </Flex>
    );
  }

  return (
    <Flex justify="center" align="center" minHeight="80vh">
      <VStack spacing={6} width="300px" align="stretch">
        <Heading size="lg" textAlign="center">
          프로필 수정
        </Heading>
        <chakra.form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>이름:</FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>이메일:</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" mt={4}>
              저장하기
            </Button>
          </VStack>
        </chakra.form>
      </VStack>
    </Flex>
  );
}
