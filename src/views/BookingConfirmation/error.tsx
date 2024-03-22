import React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  Center,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const BookingError: React.FC = () => {
  return (
    <Flex w="100%" color="white">
      <Flex
        w="100%"
        direction="column"
        justify="center"
        align="center"
        textAlign="center"
      >
        <Container maxW="100%">
          <Flex
            dir="row"
            alignItems="center"
            justifyContent="center"
            gap={{ base: "0", md: "12" }}
            direction={{ base: "column-reverse", md: "row" }}
          >
            <Stack
              align={["center", "center", "flex-start", "flex-start"]}
              alignItems="center"
            >
              <Box maxW="750px" position="relative">
                <Heading as="h1" size="xl" mb={8}>
                  Oops! There was a problem confirming your coaching session
                </Heading>
                <Text fontSize="2xl" mb={8}>
                  We apologize about the inconvenience
                </Text>
                <Text fontSize="large" mb={8}>
                  Please click the button below to return to the Coach's profile
                  to try booking again
                </Text>
                <Center>
                  <Button variant="onTeal" as={Link} to="/home">
                    BACK TO DASHBOARD
                  </Button>
                </Center>
              </Box>
            </Stack>
          </Flex>
        </Container>
      </Flex>
    </Flex>
  );
};

export default BookingError;
