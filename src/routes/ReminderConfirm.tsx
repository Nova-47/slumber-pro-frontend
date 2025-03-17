import { useEffect } from "react";
import { kakaoTest } from "../api";
import { useNavigate } from "react-router-dom";
import { Heading, Spinner, Text, useToast, VStack } from "@chakra-ui/react";

export default function ReminderConfirm() {
  const toast = useToast();
  const navigate = useNavigate();
  const confirmReminder = async () => {
    const status = await kakaoTest();
    if (status === 200) {
      toast({
        status: "success",
        title: "성공!",
        description: "코드를 업데이트 할 시간이에요!",
        position: "bottom-right",
      });
      navigate("/");
    }
  };
  useEffect(() => {
    confirmReminder();
  }, []);
  return (
    <VStack justifyContent={"center"} mt={40}>
      <Heading>Processing The test..</Heading>
      <Text>Don't go anywhere, 꼼짝마!</Text>
      <Spinner size="lg" />
    </VStack>
  );
}
