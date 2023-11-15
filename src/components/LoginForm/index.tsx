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
import { CurrentUser, UserLoginProps } from "../../types";
import axios from "axios";
import { useCookies } from "react-cookie";
import { mixpanelEvent, mixpanelIdentify, mixpanelPeople } from "../../helpers";
import { Link } from "react-router-dom";

const NODE_API = process.env.REACT_APP_NODE_API;

const LoginForm: React.FC<UserLoginProps> = (props) => {
  const { setCurrentUser } = props;
  const [email, setEmail] = useState<string>(null);
  const [password, setPassword] = useState<string>(null);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [, setCookie] = useCookies(["growth_10_03142023", "growth_10_token"]);

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

  const parseAchievements = (achievements: string) => {
    if (achievements) {
      return JSON.parse(achievements);
    }
    return ["", "", ""];
  };

  const parseHobbies = (hobbies: string) => {
    if (hobbies) {
      return JSON.parse(hobbies);
    }
    return ["", "", "", "", "", "", ""];
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
      // TODO: Add basic API Key auth handling
      const loginUser = await axios.post(`${NODE_API}/v1/user/login`, {
        email: userEmail,
        password: userPassword,
      });

      if (!loginUser) {
        throw Error("Unable to login");
      }

      if (loginUser.data.message === "Username or Password does not match") {
        setEmailError(true);
        setPasswordError(true);
        return;
      }
      const user: CurrentUser = loginUser.data;
      await handleAPICreds(email, password);

      const achievements = parseAchievements(user.achievements);
      const hobbies = parseHobbies(user.hobbies);
      const updatedUser = {
        ...user,
        achievements1: achievements[0],
        achievements2: achievements[1],
        achievements3: achievements[2],
        hobbies1: hobbies[0],
        hobbies2: hobbies[1],
        hobbies3: hobbies[2],
        hobbies4: hobbies[3],
        hobbies5: hobbies[4],
        hobbies6: hobbies[5],
      };

      setCurrentUser(updatedUser);
      setCookie("growth_10_03142023", updatedUser, {
        path: "/",
        secure: true,
        expires: new Date(Date.now() + 3600 * 1000 * 48),
        sameSite: true,
      });
      mixpanelIdentify(String(user.id)); // sets user id
      mixpanelPeople(updatedUser); // sets user profile
      mixpanelEvent("User Logged In", {
        "User ID": user.id,
        "First Name": user.first_name,
        "Last Name": user.last_name,
        "Employer ID": user.employer_id,
        Email: user.email,
        Role: user.role,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAPICreds = async (email: string, password: string) => {
    try {
      const token = await axios.post(`${NODE_API}/v1/token/generate`, {
        email,
        password,
      });

      if (!token || !token.data) {
        throw new Error(`[Could not get API Token]: ${token.statusText}`);
      }
      setCookie("growth_10_token", token.data, {
        path: "/",
        secure: true,
        expires: new Date(Date.now() + 3600 * 1000 * 48),
        sameSite: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit: React.FormEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <Container
      as="form"
      onSubmit={onSubmit}
      maxW="md"
      mt="10em"
      zIndex="1"
    >
      <Stack spacing="8">
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
            <Checkbox defaultChecked>Remember me</Checkbox>
            <Link to="/forgot-password">
              <Button variant="link" size="sm">
                Forgot password
              </Button>
            </Link>
          </HStack>
          <Stack spacing="4">
            <Button type="submit" onClick={() => login(email, password)}>
              Sign In
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default LoginForm;
