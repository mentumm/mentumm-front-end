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
  const handleSignUp = () => {
    navigate("/sign-up");
  };

  return (
    <Container maxW="md">
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="left">
            <Heading size="lg" textAlign="left">
              New Members
            </Heading>
            <HStack spacing="1" justify="center">
              <Text>
                By creating an Account on our service, you agree to subscribe to
                newsletters, marketing or promotional materials.
              </Text>
            </HStack>
          </Stack>
        </Stack>
        <Stack spacing="6">
          <Button
            colorScheme="brand"
            variant="solid"
            onClick={() => handleSignUp()}
          >
            Sign Up
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default RegisterAction;
