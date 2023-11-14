import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  Hide,
  Image,
  Show,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router";
import LoginForm from "../../components/LoginForm";
import RegisterAction from "../../components/RegisterAction";
import { UserLoginProps } from "../../types";
import logo from "../../assets/mentumm-logo.svg";

const Login: React.FC<UserLoginProps> = (props) => {
  const navigate = useNavigate();

  return (
    <Box position="relative" w="100%" textAlign="center">
      <Box display="inline-block" width="100%" >
        <Container
          paddingTop={{ base: "4", md: "8" }}
          paddingBottom={{ base: "2", md: "6" }}
        >
          <Center>
            <Heading as="h2" fontWeight="normal">
              Welcome to <Text fontWeight="bold">mentumm</Text>
            </Heading>
          </Center>
        </Container>
      </Box>
      <Flex position="relative" flexDirection="row" >
        <LoginForm
          currentUser={props.currentUser}
          setCurrentUser={props.setCurrentUser}
        />
        {/* <RegisterAction /> */}
      </Flex>
    </Box>
  );
};

export default Login;
