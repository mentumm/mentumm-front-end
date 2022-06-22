import React, { useState } from "react";
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { UserLoginProps } from "../../types";
import axios from "axios";
import { useCookies } from "react-cookie";

const NODE_API = process.env.REACT_APP_NODE_API;

const RegisterForm: React.FC<UserLoginProps> = (props) => {
  const { setCurrentUser } = props;
  const [email, setEmail] = useState<string>(null);
  const [password, setPassword] = useState<string>(null);
  const [userName, setUserName] = useState<string>(null);
  const [inviteCode, setInviteCode] = useState<string>(null);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [userNameError, setUserNameError] = useState<boolean>(false);
  const [inviteCodeError, setInviteCodeError] = useState<boolean>(false);
  const [, setCookie] = useCookies(["growth_10"]);

  const validateEmail = () => {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(e.target.value === "");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(e.target.value === "");
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
    setUserNameError(e.target.value === "");
  };

  const handleInviteCodeChange = (e) => {
    setInviteCode(e.target.value);
    setInviteCodeError(e.target.value === "");
  };

  const login = async () => {
    setEmailError(!email || email === "" || !validateEmail());
    setPasswordError(!password || password === "");
    setInviteCodeError(!inviteCode || inviteCode === "");
    setUserNameError(!userName || userName === "");

    if (
      !email ||
      email === "" ||
      password === "" ||
      !password ||
      userName === "" ||
      !userName ||
      inviteCode === "" ||
      !inviteCode
    ) {
      return;
    }

    try {
      const createUser = await axios.post(`${NODE_API}/v1/user/register`, {
        email: email,
        password: password,
        invite_code: inviteCode,
        name: userName,
      });

      if (!createUser) {
        console.log("something went wrong");
        throw Error("Unable to login");
      }

      switch (createUser.data.message) {
        case "User email address is already being used":
          setEmailError(true);
          return;
        case "Invitation Code not found!":
          setInviteCodeError(true);
          return;
        case "Invalid Invite Code!":
          setInviteCodeError(true);
          return;
      }

      setCurrentUser(createUser.data[0]);
      setCookie("growth_10", createUser.data[0], {
        path: "/",
        secure: true,
        expires: new Date(Date.now() + 3600 * 1000 * 48),
        sameSite: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxW="md" py={{ base: "8", md: "8" }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="left">
            <Heading size="lg" textAlign="left">
              New Member Registration
            </Heading>
            <HStack spacing="1" justify="left">
              <Text>Create your account to get started!</Text>
            </HStack>
          </Stack>
        </Stack>
        <Stack spacing="6">
          <Stack spacing="-px">
            <FormControl id="fullName" isInvalid={userNameError}>
              <FormLabel srOnly>Full Name</FormLabel>
              <Input
                name="name"
                placeholder="Your Name"
                roundedBottom="0"
                onChange={handleUserNameChange}
              />
              {!userNameError ? null : (
                <FormErrorMessage style={{ marginBottom: "6px" }}>
                  Your name is required.
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="email" isInvalid={emailError}>
              <FormLabel srOnly>Email address</FormLabel>
              <Input
                name="email"
                type="email"
                placeholder="Email"
                roundedBottom="0"
                roundedTop="0"
                onChange={handleEmailChange}
              />
              {!emailError ? null : (
                <FormErrorMessage style={{ marginBottom: "6px" }}>
                  Something went wrong with your email address.
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="password" isInvalid={passwordError}>
              <FormLabel srOnly>Password</FormLabel>
              <Input
                name="password"
                type="password"
                placeholder="Password"
                roundedTop="0"
                roundedBottom="0"
                onChange={handlePasswordChange}
              />
              {!passwordError ? null : (
                <FormErrorMessage>Password is required.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="invite-code" isInvalid={inviteCodeError}>
              <FormLabel srOnly>Invitation Code</FormLabel>
              <Input
                name="invite"
                placeholder="Invitation Code"
                roundedTop="0"
                onChange={handleInviteCodeChange}
              />
              {!inviteCodeError ? null : (
                <FormErrorMessage style={{ marginBottom: "6px" }}>
                  Something went wrong with your invitation code.
                </FormErrorMessage>
              )}
            </FormControl>
          </Stack>

          <Stack spacing="4">
            <Button colorScheme="brand" variant="solid" onClick={() => login()}>
              Register
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default RegisterForm;
