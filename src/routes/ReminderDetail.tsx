import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getReminder, deleteReminder } from "../api"; // 삭제 API 추가
import {
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  Text,
  VStack,
  Badge,
  HStack,
  useToast,
} from "@chakra-ui/react";

interface ReminderDetail {
  pk: number;
  method_id: string;
  title: string;
  payload: string;
  location: string;
  kind: string;
  reminder_time: string;
  repeat: boolean;
}

export default function ReminderDetail() {
  const { id } = useParams<{ id: string }>();
  const [reminder, setReminder] = useState<ReminderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    async function fetchReminder() {
      try {
        if (id) {
          const data = await getReminder(Number(id));
          setReminder(data);
        }
      } catch (error) {
        console.error("리마인더 가져오기 실패:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchReminder();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      if (id) {
        await deleteReminder(Number(id));
        toast({
          title: "삭제 성공",
          description: "리마인더가 삭제되었습니다.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom-right",
        });
        navigate("/profile/my-reminders");
      }
    } catch (error) {
      console.error("리마인더 삭제 실패:", error);
      toast({
        title: "삭제 실패",
        description: "리마인더를 삭제하는데 실패했습니다.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  const handleUpdate = () => {
    navigate(`/profile/my-reminders/${id}/edit`);
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" minHeight="80vh">
        <VStack spacing={4}>
          <Heading size="md">로딩 중입니다!</Heading>
          <Text>어디 가지 마세요!</Text>
          <Spinner size="lg" />
        </VStack>
      </Flex>
    );
  }

  if (!reminder) {
    return (
      <Flex justify="center" align="center" minHeight="80vh">
        <Text fontSize="lg">리마인더를 불러올 수 없습니다.</Text>
      </Flex>
    );
  }

  return (
    <Box p={6}>
      <Heading mb={6}>리마인더 상세 정보</Heading>
      <VStack spacing={4} align="stretch">
        <Text>
          <Text as="strong">제목:</Text> {reminder.title}
        </Text>
        <Text>
          <Text as="strong">메시지 내용:</Text> {reminder.payload}
        </Text>
        <Text>
          <Text as="strong">보내는 방법:</Text>{" "}
          <Badge colorScheme="purple">{reminder.kind}</Badge>
        </Text>
        <Text>
          <Text as="strong">Method ID:</Text> {reminder.method_id}
        </Text>
        <Text>
          <Text as="strong">예약 시간:</Text>{" "}
          {new Date(reminder.reminder_time).toLocaleString()}
        </Text>
        <Text>
          <Text as="strong">반복 여부:</Text>{" "}
          {reminder.repeat ? "반복" : "반복 없음"}
        </Text>
        <Text>
          <Text as="strong">위치 (격자 좌표):</Text> {reminder.location}
        </Text>
      </VStack>

      <HStack spacing={4} mt={8}>
        <Button colorScheme="red" onClick={handleDelete}>
          삭제하기
        </Button>
        <Button colorScheme="blue" onClick={handleUpdate}>
          수정하기
        </Button>
      </HStack>
    </Box>
  );
}
