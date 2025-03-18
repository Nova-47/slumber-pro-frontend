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
    if (status === 400) {
      toast({
        status: "error",
        title: "실패!",
        description: "다시 점검해봐야 할 것 같아요!",
        position: "bottom-right",
      });
      navigate("/");
    }
  };
  useEffect(() => {
    (async () => {
      confirmReminder();
    })();
  }, []);
  return (
    <VStack justifyContent={"center"} mt={40}>
      <Heading>Processing The test..</Heading>
      <Text>Don't go anywhere, 꼼짝마!</Text>
      <Spinner size="lg" />
    </VStack>
  );
}
