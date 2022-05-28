import React, { useState } from "react";
import {
  Button,
  Checkbox,
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
import { CurrentUserLoginProps } from "../../types";
import axios from "axios";
import { useCookies } from "react-cookie";

const NODE_API = process.env.REACT_APP_NODE_API;

const LoginForm: React.FC<CurrentUserLoginProps> = (props) => {
  const { setCurrentUser } = props;
  const [email, setEmail] = useState<string>(null);
  const [password, setPassword] = useState<string>(null);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
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

  const login = async (userEmail: string, userPassword: string) => {
    setEmailError(!email || email === "" || !validateEmail());
    setPasswordError(!password || password === "");

    if (
      !userEmail ||
      userEmail === "" ||
      userPassword === "" ||
      !userPassword
    ) {
      return;
    }

    try {
      const loginUser = await axios.post(`${NODE_API}/v1/user/login`, {
        email: userEmail,
        password: userPassword,
      });

      if (!loginUser) {
        console.log("something went wrong");
        throw Error("Unable to login");
      }

      if (loginUser.data.message === "Username or Password does not match") {
        setEmailError(true);
        setPasswordError(true);
        return;
      }

      setCurrentUser(loginUser.data);
      setCookie("growth_10", loginUser.data, {
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
    <Container maxW="md" py={{ base: "12", md: "24" }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="left">
            <Heading size="lg" textAlign="left">
              Registered Members
            </Heading>
            <HStack spacing="1" justify="center">
              <Text>
                Harmonious colour themes have built up as the collection has
                evolved
              </Text>
            </HStack>
          </Stack>
        </Stack>
        <Stack spacing="6">
          <Stack spacing="-px">
            <FormControl id="email" isInvalid={emailError}>
              <FormLabel srOnly>Email address</FormLabel>
              <Input
                name="email"
                type="email"
                placeholder="Email"
                roundedBottom="0"
                onChange={handleEmailChange}
              />
              {!emailError ? null : (
                <FormErrorMessage style={{ marginBottom: "6px" }}>
                  Email is required.
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
                onChange={handlePasswordChange}
              />
              {!passwordError ? null : (
                <FormErrorMessage>Password is required.</FormErrorMessage>
              )}
            </FormControl>
          </Stack>
          <HStack justify="space-between">
            <Checkbox defaultIsChecked>Remember me</Checkbox>
            <Button variant="link" colorScheme="blue" size="sm">
              Forgot password
            </Button>
          </HStack>
          <Stack spacing="4">
            <Button
              colorScheme="blue"
              variant="solid"
              onClick={() => login(email, password)}
            >
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default LoginForm;
