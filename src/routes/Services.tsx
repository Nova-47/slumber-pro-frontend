// Reminder.tsx
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
import { reminderSubmit } from "../api";
import ReactSelect from "react-select";

const locationOptions = [
  { value: "서울특별시", label: "서울특별시" },
  { value: "서울특별시종로구", label: "서울특별시종로구" },
  { value: "서울특별시중구", label: "서울특별시중구" },
  { value: "서울특별시용산구", label: "서울특별시용산구" },
  { value: "서울특별시성동구", label: "서울특별시성동구" },
  { value: "서울특별시광진구", label: "서울특별시광진구" },
  { value: "서울특별시동대문구", label: "서울특별시동대문구" },
  { value: "서울특별시중랑구", label: "서울특별시중랑구" },
  { value: "서울특별시성북구", label: "서울특별시성북구" },
  { value: "서울특별시강북구", label: "서울특별시강북구" },
  { value: "서울특별시도봉구", label: "서울특별시도봉구" },
  { value: "서울특별시노원구", label: "서울특별시노원구" },
  { value: "서울특별시은평구", label: "서울특별시은평구" },
  { value: "서울특별시서대문구", label: "서울특별시서대문구" },
  { value: "서울특별시마포구", label: "서울특별시마포구" },
  { value: "서울특별시양천구", label: "서울특별시양천구" },
  { value: "서울특별시강서구", label: "서울특별시강서구" },
  { value: "서울특별시구로구", label: "서울특별시구로구" },
  { value: "서울특별시금천구", label: "서울특별시금천구" },
  { value: "서울특별시영등포구", label: "서울특별시영등포구" },
  { value: "서울특별시동작구", label: "서울특별시동작구" },
  { value: "서울특별시관악구", label: "서울특별시관악구" },
  { value: "서울특별시서초구", label: "서울특별시서초구" },
  { value: "서울특별시강남구", label: "서울특별시강남구" },
  { value: "서울특별시송파구", label: "서울특별시송파구" },
  { value: "서울특별시강동구", label: "서울특별시강동구" },
  { value: "부산광역시", label: "부산광역시" },
  { value: "부산광역시서구", label: "부산광역시서구" },
  { value: "부산광역시동구", label: "부산광역시동구" },
  { value: "부산광역시영도구", label: "부산광역시영도구" },
  { value: "부산광역시부산진구", label: "부산광역시부산진구" },
  { value: "부산광역시동래구", label: "부산광역시동래구" },
  { value: "부산광역시남구", label: "부산광역시남구" },
  { value: "부산광역시북구", label: "부산광역시북구" },
  { value: "부산광역시해운대구", label: "부산광역시해운대구" },
  { value: "부산광역시사하구", label: "부산광역시사하구" },
  { value: "부산광역시금정구", label: "부산광역시금정구" },
  { value: "부산광역시연제구", label: "부산광역시연제구" },
  { value: "부산광역시수영구", label: "부산광역시수영구" },
  { value: "부산광역시사상구", label: "부산광역시사상구" },
  { value: "부산광역시기장군", label: "부산광역시기장군" },
  { value: "대구광역시", label: "대구광역시" },
  { value: "대구광역시수성구", label: "대구광역시수성구" },
  { value: "대구광역시달서구", label: "대구광역시달서구" },
  { value: "대구광역시달성군", label: "대구광역시달성군" },
  { value: "대구광역시군위군", label: "대구광역시군위군" },
  { value: "인천광역시", label: "인천광역시" },
  { value: "인천광역시미추홀구", label: "인천광역시미추홀구" },
  { value: "인천광역시연수구", label: "인천광역시연수구" },
  { value: "인천광역시남동구", label: "인천광역시남동구" },
  { value: "인천광역시부평구", label: "인천광역시부평구" },
  { value: "인천광역시계양구", label: "인천광역시계양구" },
  { value: "인천광역시강화군", label: "인천광역시강화군" },
  { value: "인천광역시옹진군", label: "인천광역시옹진군" },
  { value: "광주광역시", label: "광주광역시" },
  { value: "광주광역시광산구", label: "광주광역시광산구" },
  { value: "대전광역시", label: "대전광역시" },
  { value: "대전광역시유성구", label: "대전광역시유성구" },
  { value: "대전광역시대덕구", label: "대전광역시대덕구" },
  { value: "울산광역시", label: "울산광역시" },
  { value: "울산광역시울주군", label: "울산광역시울주군" },
  { value: "세종특별자치시", label: "세종특별자치시" },
  { value: "수원시", label: "수원시" },
  { value: "수원시장안구", label: "수원시장안구" },
  { value: "수원시권선구", label: "수원시권선구" },
  { value: "수원시팔달구", label: "수원시팔달구" },
  { value: "수원시영통구", label: "수원시영통구" },
  { value: "성남시", label: "성남시" },
  { value: "성남시수정구", label: "성남시수정구" },
  { value: "성남시중원구", label: "성남시중원구" },
  { value: "성남시분당구", label: "성남시분당구" },
  { value: "의정부시", label: "의정부시" },
  { value: "안양시", label: "안양시" },
  { value: "안양시만안구", label: "안양시만안구" },
  { value: "안양시동안구", label: "안양시동안구" },
  { value: "부천시", label: "부천시" },
  { value: "부천시원미구", label: "부천시원미구" },
  { value: "부천시소사구", label: "부천시소사구" },
  { value: "부천시오정구", label: "부천시오정구" },
  { value: "광명시", label: "광명시" },
  { value: "평택시", label: "평택시" },
  { value: "동두천시", label: "동두천시" },
  { value: "안산시", label: "안산시" },
  { value: "안산시상록구", label: "안산시상록구" },
  { value: "안산시단원구", label: "안산시단원구" },
  { value: "고양시", label: "고양시" },
  { value: "고양시덕양구", label: "고양시덕양구" },
  { value: "고양시일산동구", label: "고양시일산동구" },
  { value: "고양시일산서구", label: "고양시일산서구" },
  { value: "과천시", label: "과천시" },
  { value: "구리시", label: "구리시" },
  { value: "남양주시", label: "남양주시" },
  { value: "오산시", label: "오산시" },
  { value: "시흥시", label: "시흥시" },
  { value: "군포시", label: "군포시" },
  { value: "의왕시", label: "의왕시" },
  { value: "하남시", label: "하남시" },
  { value: "용인시", label: "용인시" },
  { value: "용인시처인구", label: "용인시처인구" },
  { value: "용인시기흥구", label: "용인시기흥구" },
  { value: "용인시수지구", label: "용인시수지구" },
  { value: "파주시", label: "파주시" },
  { value: "이천시", label: "이천시" },
  { value: "안성시", label: "안성시" },
  { value: "김포시", label: "김포시" },
  { value: "화성시", label: "화성시" },
  { value: "경기도광주시", label: "경기도광주시" },
  { value: "양주시", label: "양주시" },
  { value: "포천시", label: "포천시" },
  { value: "여주시", label: "여주시" },
  { value: "연천군", label: "연천군" },
  { value: "가평군", label: "가평군" },
  { value: "양평군", label: "양평군" },
  { value: "청주시", label: "청주시" },
  { value: "청주시상당구", label: "청주시상당구" },
  { value: "청주시서원구", label: "청주시서원구" },
  { value: "청주시흥덕구", label: "청주시흥덕구" },
  { value: "청주시청원구", label: "청주시청원구" },
  { value: "충주시", label: "충주시" },
  { value: "제천시", label: "제천시" },
  { value: "보은군", label: "보은군" },
  { value: "옥천군", label: "옥천군" },
  { value: "영동군", label: "영동군" },
  { value: "증평군", label: "증평군" },
  { value: "진천군", label: "진천군" },
  { value: "괴산군", label: "괴산군" },
  { value: "음성군", label: "음성군" },
  { value: "단양군", label: "단양군" },
  { value: "천안시", label: "천안시" },
  { value: "천안시동남구", label: "천안시동남구" },
  { value: "천안시서북구", label: "천안시서북구" },
  { value: "공주시", label: "공주시" },
  { value: "보령시", label: "보령시" },
  { value: "아산시", label: "아산시" },
  { value: "서산시", label: "서산시" },
  { value: "논산시", label: "논산시" },
  { value: "계룡시", label: "계룡시" },
  { value: "당진시", label: "당진시" },
  { value: "금산군", label: "금산군" },
  { value: "부여군", label: "부여군" },
  { value: "서천군", label: "서천군" },
  { value: "청양군", label: "청양군" },
  { value: "홍성군", label: "홍성군" },
  { value: "예산군", label: "예산군" },
  { value: "태안군", label: "태안군" },
  { value: "목포시", label: "목포시" },
  { value: "여수시", label: "여수시" },
  { value: "순천시", label: "순천시" },
  { value: "나주시", label: "나주시" },
  { value: "광양시", label: "광양시" },
  { value: "담양군", label: "담양군" },
  { value: "곡성군", label: "곡성군" },
  { value: "구례군", label: "구례군" },
  { value: "고흥군", label: "고흥군" },
  { value: "보성군", label: "보성군" },
  { value: "화순군", label: "화순군" },
  { value: "장흥군", label: "장흥군" },
  { value: "강진군", label: "강진군" },
  { value: "해남군", label: "해남군" },
  { value: "영암군", label: "영암군" },
  { value: "무안군", label: "무안군" },
  { value: "함평군", label: "함평군" },
  { value: "영광군", label: "영광군" },
  { value: "장성군", label: "장성군" },
  { value: "완도군", label: "완도군" },
  { value: "진도군", label: "진도군" },
  { value: "신안군", label: "신안군" },
  { value: "포항시", label: "포항시" },
  { value: "포항시남구", label: "포항시남구" },
  { value: "포항시북구", label: "포항시북구" },
  { value: "경주시", label: "경주시" },
  { value: "김천시", label: "김천시" },
  { value: "안동시", label: "안동시" },
  { value: "구미시", label: "구미시" },
  { value: "영주시", label: "영주시" },
  { value: "영천시", label: "영천시" },
  { value: "상주시", label: "상주시" },
  { value: "문경시", label: "문경시" },
  { value: "경산시", label: "경산시" },
  { value: "의성군", label: "의성군" },
  { value: "청송군", label: "청송군" },
  { value: "영양군", label: "영양군" },
  { value: "영덕군", label: "영덕군" },
  { value: "청도군", label: "청도군" },
  { value: "고령군", label: "고령군" },
  { value: "성주군", label: "성주군" },
  { value: "칠곡군", label: "칠곡군" },
  { value: "예천군", label: "예천군" },
  { value: "봉화군", label: "봉화군" },
  { value: "울진군", label: "울진군" },
  { value: "울릉군", label: "울릉군" },
  { value: "창원시", label: "창원시" },
  { value: "창원시의창구", label: "창원시의창구" },
  { value: "창원시성산구", label: "창원시성산구" },
  { value: "창원시마산합포구", label: "창원시마산합포구" },
  { value: "창원시마산회원구", label: "창원시마산회원구" },
  { value: "창원시진해구", label: "창원시진해구" },
  { value: "진주시", label: "진주시" },
  { value: "통영시", label: "통영시" },
  { value: "사천시", label: "사천시" },
  { value: "김해시", label: "김해시" },
  { value: "밀양시", label: "밀양시" },
  { value: "거제시", label: "거제시" },
  { value: "양산시", label: "양산시" },
  { value: "의령군", label: "의령군" },
  { value: "함안군", label: "함안군" },
  { value: "창녕군", label: "창녕군" },
  { value: "고성군", label: "고성군" },
  { value: "남해군", label: "남해군" },
  { value: "하동군", label: "하동군" },
  { value: "산청군", label: "산청군" },
  { value: "함양군", label: "함양군" },
  { value: "거창군", label: "거창군" },
  { value: "합천군", label: "합천군" },
  { value: "제주시", label: "제주시" },
  { value: "서귀포시", label: "서귀포시" },
  { value: "춘천시", label: "춘천시" },
  { value: "원주시", label: "원주시" },
  { value: "강릉시", label: "강릉시" },
  { value: "동해시", label: "동해시" },
  { value: "태백시", label: "태백시" },
  { value: "속초시", label: "속초시" },
  { value: "삼척시", label: "삼척시" },
  { value: "홍천군", label: "홍천군" },
  { value: "횡성군", label: "횡성군" },
  { value: "영월군", label: "영월군" },
  { value: "평창군", label: "평창군" },
  { value: "정선군", label: "정선군" },
  { value: "철원군", label: "철원군" },
  { value: "화천군", label: "화천군" },
  { value: "양구군", label: "양구군" },
  { value: "인제군", label: "인제군" },
  { value: "양양군", label: "양양군" },
  { value: "전주시", label: "전주시" },
  { value: "전주시완산구", label: "전주시완산구" },
  { value: "전주시덕진구", label: "전주시덕진구" },
  { value: "군산시", label: "군산시" },
  { value: "익산시", label: "익산시" },
  { value: "정읍시", label: "정읍시" },
  { value: "남원시", label: "남원시" },
  { value: "김제시", label: "김제시" },
  { value: "완주군", label: "완주군" },
  { value: "진안군", label: "진안군" },
  { value: "무주군", label: "무주군" },
  { value: "장수군", label: "장수군" },
  { value: "임실군", label: "임실군" },
  { value: "순창군", label: "순창군" },
  { value: "고창군", label: "고창군" },
  { value: "부안군", label: "부안군" },
];

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

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [year, month, day] = e.target.value.split("-").map(Number);
    const updatedTime = new Date(selectedTime);
    updatedTime.setFullYear(year, month - 1, day);
    setSelectedTime(updatedTime);
  };

  const handleTimeSelect = (hour: number, minute: number) => {
    const updatedTime = new Date(selectedTime);
    updatedTime.setHours(hour);
    updatedTime.setMinutes(minute);
    updatedTime.setSeconds(0);
    setSelectedTime(updatedTime);
  };

  const getKSTTimestamp = (date: Date) => {
    // UTC + 9시간 (밀리초 기준) → 초 단위로 변환
    return Math.floor(date.getTime() / 1000);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    const requestData = {
      kind: reminderType,
      method_id: userId,
      location,
      title,
      payload: content,
      reminder_time: getKSTTimestamp(selectedTime), //  KST 기준 timestamp
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

      // 입력 초기화
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
  const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

  const formatDateToLocalString = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

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
            <FormLabel>지역</FormLabel>
            <ReactSelect
              options={locationOptions}
              value={
                locationOptions.find((option) => option.value === location) ||
                null
              }
              onChange={(option) => setLocation(option?.value || "")}
              placeholder="지역을 검색하고 선택해 주세요"
              isClearable
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
            <FormLabel>날짜</FormLabel>
            <Input
              type="date"
              value={formatDateToLocalString(selectedTime)}
              onChange={handleDateChange}
              size="lg"
            />
          </FormControl>

          <FormControl>
            <FormLabel>시간</FormLabel>
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
        </VStack>
      </Box>
    </Container>
  );
}
