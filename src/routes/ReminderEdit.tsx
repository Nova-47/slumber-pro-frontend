import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getReminder, updateReminder } from "../api";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Spinner,
  Text,
  VStack,
  Switch,
  Select,
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

export default function ReminderEdit() {
  const { id } = useParams<{ id: string }>();
  const [reminder, setReminder] = useState<ReminderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    payload: "",
    kind: "",
    repeat: false,
  });
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    async function fetchReminder() {
      try {
        if (id) {
          const data = await getReminder(Number(id));
          setReminder(data);
          setFormData({
            title: data.title,
            payload: data.payload,
            kind: data.kind,
            repeat: data.repeat,
          });
        }
      } catch (error) {
        console.error("리마인더 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchReminder();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: target.checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    try {
      await updateReminder(Number(id), formData);
      toast({
        title: "수정 완료",
        description: "리마인더가 수정되었습니다.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
      navigate("/profile/my-reminders");
    } catch (error) {
      console.error("리마인더 수정 실패:", error);
      toast({
        title: "수정 실패",
        description: "리마인더를 수정할 수 없습니다.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" minHeight="80vh">
        <Spinner size="lg" />
      </Flex>
    );
  }

  if (!reminder) {
    return (
      <Flex justify="center" align="center" minHeight="80vh">
        <Text>리마인더를 불러올 수 없습니다.</Text>
      </Flex>
    );
  }

  return (
    <Box p={6}>
      <Heading mb={6}>리마인더 수정하기</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>제목</FormLabel>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>메시지 내용</FormLabel>
            <Input
              name="payload"
              value={formData.payload}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>알림 방법</FormLabel>
            <Select
              name="kind"
              value={formData.kind}
              onChange={handleChange}
              required
            >
              <option value="kakao_talk">Kakao Talk</option>
              <option value="whatsapp">Whatsapp</option>
              <option value="sms">SMS</option>
              <option value="email">Email</option>
            </Select>
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <FormLabel mb="0">반복 여부</FormLabel>
            <Switch
              name="repeat"
              isChecked={formData.repeat}
              onChange={handleChange}
            />
          </FormControl>
        </VStack>
        <Button mt={6} colorScheme="blue" type="submit">
          저장하기
        </Button>
      </form>
    </Box>
  );
}
