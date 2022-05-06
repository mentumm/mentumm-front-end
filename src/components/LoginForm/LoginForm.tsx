import React from "react";
import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";

const LoginForm: React.FC = () => {
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
            <FormControl id="email">
              <FormLabel srOnly>Email address</FormLabel>
              <Input
                name="email"
                type="email"
                placeholder="Email"
                roundedBottom="0"
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel srOnly>Password</FormLabel>
              <Input
                name="password"
                type="password"
                placeholder="Password"
                roundedTop="0"
              />
            </FormControl>
          </Stack>
          <HStack justify="space-between">
            <Checkbox defaultIsChecked>Remember me</Checkbox>
            <Button variant="link" colorScheme="blue" size="sm">
              Forgot password
            </Button>
          </HStack>
          <Stack spacing="4">
            <Button colorScheme="blue" variant="solid">
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default LoginForm;
