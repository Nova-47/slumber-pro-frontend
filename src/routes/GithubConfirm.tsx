import { Heading, Spinner, Text, useToast, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { githubLogIn } from "../api";
import { useQueryClient } from "@tanstack/react-query";

export default function GithubConfirm() {
  const { search } = useLocation();
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const confirmLogin = async () => {
    const params = new URLSearchParams(search);
    const code = params.get("code");
    if (code) {
      const status = await githubLogIn(code);
      if (status === 200) {
        toast({
          status: "success",
          title: "어서와요!",
          description: "또 볼 수 있어서 기쁘네요!",
          position: "bottom-right",
        });
        queryClient.refetchQueries({ queryKey: ["me"] });
        navigate("/");
      }
    }
  };
  useEffect(() => {
    confirmLogin();
  }, []);
  return (
    <VStack justifyContent={"center"} mt={40}>
      <Heading>Processing log in..</Heading>
      <Text>Don't go anywhere, 꼼짝마!</Text>
      <Spinner size="lg" />
    </VStack>
  );
}
