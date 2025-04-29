import { useEffect, useState } from "react";
import { getReminders } from "../api";
import {
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Reminder {
  pk: number;
  title: string;
  reminder_time: string;
  kind: string;
  location: string;
}

export default function MyReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReminders() {
      try {
        const data = await getReminders();
        setReminders(data);
      } catch (error) {
        console.error("리마인더 가져오기 실패:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchReminders();
  }, []);

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

  if (reminders.length === 0) {
    return (
      <Flex justify="center" align="center" minHeight="80vh">
        <Text fontSize="lg">등록된 리마인더가 없습니다.</Text>
      </Flex>
    );
  }

  return (
    <Box p={6}>
      <Heading mb={6}>내 리마인더</Heading>
      <VStack spacing={4} align="stretch">
        {reminders.map((reminder) => (
          <Box
            key={reminder.pk}
            borderWidth="1px"
            borderRadius="md"
            p={4}
            boxShadow="sm"
          >
            <Text mb={2}>
              <Text as="strong">제목:</Text> {reminder.title}
            </Text>
            <Text mb={2}>
              <Text as="strong">예약 시간:</Text>{" "}
              {new Date(reminder.reminder_time).toLocaleString()}
            </Text>
            <Text mb={2}>
              <Text as="strong">알림 방법:</Text> {reminder.kind}
            </Text>
            <Text mb={4}>
              <Text as="strong">위치:</Text> {reminder.location}
            </Text>
            <Button
              as={Link}
              to={`/profile/my-reminders/${reminder.pk}`}
              colorScheme="blue"
              size="sm"
            >
              조회하기
            </Button>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
