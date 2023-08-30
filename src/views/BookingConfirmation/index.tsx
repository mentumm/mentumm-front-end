import React, { useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { createUseStyles, DefaultTheme } from "react-jss";
import { CurrentUserProps } from "../../types";
import ThankYouImage from "./thank-you.png";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { mixpanelEvent } from "../../helpers";

const useStyles = createUseStyles((theme: DefaultTheme) => ({
  root: {
    display: "flex",
    width: "100%",
  },
  column: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  margin: {
    marginBottom: "16px",
  },
}));

const BookingConfirmation: React.FC<CurrentUserProps> = ({ currentUser }) => {
  const classes = useStyles();
  const [searchParams] = useSearchParams();
  const assignedTo = searchParams.get("assigned_to");
  const eventTypeUUID = searchParams.get("event_type_uuid");
  const eventTypeName = searchParams.get("event_type_name");
  const eventStartTime = searchParams.get("event_start_time");
  const eventEndTime = searchParams.get("event_end_time");
  const inviteeUUID = searchParams.get("invitee_uuid");
  const inviteeFullName = searchParams.get("invitee_full_name");
  const inviteeEmail = searchParams.get("invitee_email");
  const inviteeAnswer = searchParams.get("answer_1");
  const utmSource = searchParams.get("utm_source");

  useEffect(() => {
    mixpanelEvent("Coaching Session Booked", {
      Coach: assignedTo,
      "User Name": inviteeFullName,
      "User Email": inviteeEmail,
      "Event Type": eventTypeName,
      "Event Start Time": eventStartTime,
      "Event End Time": eventEndTime,
      "Invitee UUID": inviteeUUID,
      "Invitee Booking Comments": inviteeAnswer,
      "UTM Source": utmSource,
      "Event UUID": eventTypeUUID,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.column}>
        <Container maxW="100%">
          <Flex
            dir="row"
            alignItems="center"
            justifyContent="center"
            gap={{ base: "0", md: "12" }}
            direction={{ base: "column-reverse", md: "row" }}
            minH="calc(100vh - 200px)"
          >
            <Stack
              align={["center", "center", "flex-start", "flex-start"]}
              alignItems="center"
            >
              <Box maxW="750px" position="relative">
                <Heading as="h1" size="xl" className={classes.margin}>
                  {currentUser ? currentUser.first_name : null}, your coaching
                  session with mentumm is booked!
                </Heading>
                <Text fontSize="2xl" className={classes.margin}>
                  Check your email (and junk) for a confirmation from your
                  coach.
                </Text>
                <Text fontSize="large" className={classes.margin}>
                  Add the session to your calendar by clicking the link at the
                  bottom of the email or click Reschedule if you need to modify
                  your session.
                </Text>
                <Text fontSize="large" className={classes.margin}>
                  We look forward to seeing you soon! &#128522;
                </Text>
                <Button as={Link} to="/home">
                  BACK TO HOME
                </Button>
              </Box>
            </Stack>
            <Stack>
              <Box maxW="md">
                <Image
                  src={ThankYouImage}
                  alt="Person Searching for a Coach"
                  maxW={{ base: "100%", md: "85%", lg: "100%" }}
                  objectFit="cover"
                />
              </Box>
            </Stack>
          </Flex>
        </Container>
      </div>
    </div>
  );
};

export default BookingConfirmation;
