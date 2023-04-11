import React from "react";
import {
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";

const RegisterAction: React.FC = () => {
  const navigate = useNavigate();

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
          <Button onClick={() => navigate("/sign-up")}>Sign Up</Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default RegisterAction;
