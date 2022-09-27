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
  Link,
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
  const [userFirstName, setUserFirstName] = useState<string>(null);
  const [userLastName, setUserLastName] = useState<string>(null);
  const [inviteCode, setInviteCode] = useState<string>(null);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [userFirstNameError, setUserFirstNameError] = useState<boolean>(false);
  const [userLastNameError, setUserLastNameError] = useState<boolean>(false);
  const [inviteCodeError, setInviteCodeError] = useState<boolean>(false);
  const [, setCookie] = useCookies(["growth_10"]);
  const [checkedTerms, setCheckedTerms] = useState<boolean>(false);

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

  const handleUserFirstNameChange = (e) => {
    setUserFirstName(e.target.value);
    setUserFirstNameError(e.target.value === "");
  };

  const handleUserLastNameChange = (e) => {
    setUserLastName(e.target.value);
    setUserLastNameError(e.target.value === "");
  };

  const handleInviteCodeChange = (e) => {
    setInviteCode(e.target.value);
    setInviteCodeError(e.target.value === "");
  };

  const login = async () => {
    setEmailError(!email || email === "" || !validateEmail());
    setPasswordError(!password || password === "");
    setInviteCodeError(!inviteCode || inviteCode === "");
    setUserFirstNameError(!userFirstName || userFirstName === "");
    setUserLastNameError(!userLastName || userLastName === "");

    if (
      !email ||
      email === "" ||
      password === "" ||
      !password ||
      userFirstName === "" ||
      !userFirstName ||
      userLastName === "" ||
      !userLastName ||
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
        first_name: userFirstName,
        last_name: userLastName,
      });

      if (!createUser) {
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
    <Container maxW="md">
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
            <FormControl id="firstName" isInvalid={userFirstNameError}>
              <FormLabel srOnly>First Name</FormLabel>
              <Input
                name="first_name"
                placeholder="First Name"
                roundedBottom="0"
                onChange={handleUserFirstNameChange}
              />
              {!userFirstNameError ? null : (
                <FormErrorMessage style={{ marginBottom: "6px" }}>
                  Your first name is required.
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="lastName" isInvalid={userLastNameError}>
              <FormLabel srOnly>Last Name</FormLabel>
              <Input
                name="last_name"
                placeholder="Last Name"
                roundedBottom="0"
                roundedTop="0"
                onChange={handleUserLastNameChange}
              />
              {!userLastNameError ? null : (
                <FormErrorMessage style={{ marginBottom: "6px" }}>
                  Your last name is required.
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
            <Button
              colorScheme="brand"
              variant="solid"
              onClick={() => login()}
              disabled={!checkedTerms}
            >
              Register
            </Button>
            <HStack>
              <Checkbox
                colorScheme="brand"
                isRequired
                onChange={() => setCheckedTerms(!checkedTerms)}
              />
              <Text>
                I acknowledge mentumm's{" "}
                <Link
                  color="#3168b2"
                  href="https://mentumm.com/coaching-terms-and-conditions/"
                  isExternal
                >
                  Terms and Conditions
                </Link>
              </Text>
            </HStack>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default RegisterForm;
