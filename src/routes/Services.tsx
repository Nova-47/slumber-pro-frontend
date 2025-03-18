import {
  Box,
  Text,
  VStack,
  useColorModeValue,
  Container,
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  Select,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  Switch,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { reminderSubmit } from "../api";

export default function Reminder() {
  const bg = useColorModeValue("white", "gray.800");
  const color = useColorModeValue("black", "gray.300");
  const toast = useToast();

  const [reminderType, setReminderType] = useState("");
  const [userId, setUserId] = useState("");
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [isRepeat, setIsRepeat] = useState(false);

  const handleDateChange = (e: any) => {
    const newDate = new Date(e.target.value);
    const updatedTime = new Date(selectedTime);
    updatedTime.setFullYear(
      newDate.getFullYear(),
      newDate.getMonth(),
      newDate.getDate()
    );
    setSelectedTime(updatedTime);
  };

  const handleTimeSelect = (hour: any, minute: any) => {
    const newTime = new Date(selectedTime);
    newTime.setHours(hour);
    newTime.setMinutes(minute);
    newTime.setSeconds(0);
    setSelectedTime(newTime);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    const requestData = {
      kind: reminderType,
      method_id: userId || null,
      location,
      title,
      payload: content,
      reminder_time: selectedTime.toISOString(),
      repeat: isRepeat,
    };

    console.log("📌 리마인더 예약 요청 데이터:", requestData);

    try {
      const response = await reminderSubmit(requestData);
      console.log("✅ 서버 응답:", response);

      toast({
        status: "success",
        title: "리마인더 예약 성공!",
        description: "설정한 시간에 알림이 전송됩니다.",
        position: "bottom-right",
        duration: 2000,
      });

      setReminderType("");
      setUserId("");
      setLocation("");
      setTitle("");
      setContent("");
      setSelectedTime(new Date());
      setIsRepeat(false);
    } catch (error) {
      console.error("❌ API 요청 실패:", error);
      toast({
        status: "error",
        title: "리마인더 예약 실패",
        description: "잠시 후 다시 시도해주세요.",
        position: "bottom-right",
        duration: 2000,
      });
    }
  };

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = [0, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

  return (
    <Container maxW="xl">
      <Box
        mt={7}
        bg={bg}
        color={color}
        p={6}
        border="1px solid"
        borderColor="gray.300"
        borderRadius="lg"
        minH="auto"
      >
        <Box p={4} textAlign="center">
          <Text fontSize="2xl" fontWeight="bold">
            리마인더 작성
          </Text>
        </Box>

        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>리마인더 타입</FormLabel>
            <Select
              value={reminderType}
              onChange={(e) => setReminderType(e.target.value)}
              placeholder="타입을 선택해 주세요"
              size="lg"
            >
              <option value="kakao_talk">Kakaotalk</option>
              <option value="whatsapp">Whatsapp</option>
              <option value="sms">SMS</option>
              <option value="email">Email</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>아이디</FormLabel>
            <Input
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="ID를 입력해 주세요 (로그인 타입과 같을 경우 비워둬도 OK)"
              size="lg"
            />
          </FormControl>

          <FormControl>
            <FormLabel>지역</FormLabel>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="지역을 입력해 주세요 (시 단위)"
              size="lg"
            />
          </FormControl>

          <FormControl>
            <FormLabel>제목</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력해 주세요"
              size="lg"
            />
          </FormControl>

          <FormControl>
            <FormLabel>내용</FormLabel>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력해 주세요"
              size="lg"
              rows={6}
            />
          </FormControl>

          <FormControl>
            <FormLabel>리마인더 날짜</FormLabel>
            <Input
              type="date"
              value={selectedTime.toISOString().split("T")[0]}
              onChange={handleDateChange}
              size="lg"
            />
          </FormControl>

          <FormControl>
            <FormLabel>리마인더 도착 시간</FormLabel>
            <Box display="flex" gap={2}>
              <Menu>
                <MenuButton
                  as={Button}
                  leftIcon={<FaClock />}
                  variant="outline"
                >
                  {selectedTime.getHours().toString().padStart(2, "0")}:
                  {selectedTime.getMinutes().toString().padStart(2, "0")}
                </MenuButton>
                <MenuList maxH="200px" overflowY="auto">
                  {hours.map((hour) => (
                    <MenuItem
                      key={hour}
                      onClick={() =>
                        handleTimeSelect(hour, selectedTime.getMinutes())
                      }
                    >
                      {hour.toString().padStart(2, "0")}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>

              <Menu>
                <MenuButton as={Button} variant="outline">
                  {selectedTime.getMinutes().toString().padStart(2, "0")}
                </MenuButton>
                <MenuList>
                  {minutes.map((minute) => (
                    <MenuItem
                      key={minute}
                      onClick={() =>
                        handleTimeSelect(selectedTime.getHours(), minute)
                      }
                    >
                      {minute.toString().padStart(2, "0")}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Box>
          </FormControl>

          <FormControl>
            <FormLabel>반복 설정</FormLabel>
            <HStack>
              <Switch
                isChecked={isRepeat}
                onChange={() => setIsRepeat(!isRepeat)}
                size="lg"
                colorScheme="blue"
              />
              <Text>{isRepeat ? "반복 O" : "반복 X"}</Text>
            </HStack>
          </FormControl>

          <Button colorScheme="blue" size="lg" onClick={handleSubmit}>
            리마인더 예약
          </Button>
          <Link to={"./Reconfirm"}>
            <Button>Test</Button>
          </Link>
        </VStack>
      </Box>
    </Container>
  );
}
