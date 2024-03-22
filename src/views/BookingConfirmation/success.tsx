import React from "react";
import {
  Button,
  Container,
  Flex,
  Heading,
  ListItem,
  OrderedList,
  Stack,
  Text,
} from "@chakra-ui/react";
import { CurrentUserProps } from "../../types";
import { Link } from "react-router-dom";

const BookingSuccess: React.FC<CurrentUserProps> = ({ currentUser }) => {
  return (
    <Flex w="100%">
      <Flex
        w="100%"
        direction="column"
        justify="center"
        align="center"
        color="white"
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
              <Flex
                direction="column"
                align="center"
                maxW="750px"
                position="relative"
              >
                <Heading as="h1" size="xl" mb={8} textAlign="center">
                  {`${
                    currentUser ? currentUser.first_name : null
                  }, your coaching
                  session with mentumm is booked!`}
                </Heading>
                <OrderedList fontSize="large" mb={8}>
                  <ListItem>{`Check your email (and spam) for a confirmation from your coach`}</ListItem>
                  <ListItem>{`Add the coaching session to your calendar by clicking the link at the bottom of the email`}</ListItem>
                  <ListItem>{`If you need to reschedule, you can click "Reschedule" on that email. Enjoy your coaching session and make it as valuable as possible!`}</ListItem>
                </OrderedList>
                <Text fontSize="large" mb={8} textAlign="center">
                  {`We look forward to seeing you soon!`}
                </Text>
                <Button variant="onTeal" as={Link} to="/home" w="fit-content">
                  BACK TO DASHBOARD
                </Button>
              </Flex>
            </Stack>
          </Flex>
        </Container>
      </Flex>
    </Flex>
  );
};

export default BookingSuccess;
