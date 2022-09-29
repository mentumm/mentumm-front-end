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
//import axios from "axios";
import React from "react";
import { createUseStyles, DefaultTheme } from "react-jss";
//import { useSearchParams } from "react-router-dom";
//import { mixpanelEvent, mixpanelIdentify } from "../../helpers";
import { CurrentUserProps } from "../../types";
import welcome from "./thank-you.png";
import { Link } from "react-router-dom";


//const NODE_API = process.env.REACT_APP_NODE_API;

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
  /*
  const [coachBooked, setCoachBooked] = useState<boolean>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (currentUser) {
      mixpanelIdentify(String(currentUser.id));
    }
  }, [currentUser]);

  useEffect(() => {
    const event_type_uuid = searchParams.get("event_type_uuid");
    const event_type_name = searchParams.get("event_type_name");
    const event_start_time = searchParams.get("event_start_time");
    const event_end_time = searchParams.get("event_end_time");
    const invitee_uuid = searchParams.get("invitee_uuid");
    const invitee_full_name = searchParams.get("invitee_full_name");
    const invitee_email = searchParams.get("invitee_email");
    const utmSource = searchParams.get("utm_source");

    const bookCoach = async () => {
      try {
        const bookedCoach = await axios.post(`${NODE_API}/v1/user/book-coach`, {
          user_id: currentUser.id,
          coach_id: utmSource,
          event_end_time,
          event_start_time,
          event_type_name,
          event_type_uuid,
          invitee_email,
          invitee_full_name,
          invitee_uuid,
        });

        if (bookedCoach) {
          setCoachBooked(true);
        }
      } catch (error) {
        throw new Error("Could not load Coach Tags!");
      }
    };

    if (!coachBooked && invitee_email) {
      bookCoach();
    }
  }, [searchParams, coachBooked, currentUser]);
*/
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
          >
            <Stack
              align={["center", "center", "flex-start", "flex-start"]}
              alignItems="center"
            >
              <Box maxW="750px" position="relative">
                <Heading as="h1" size="xl" className={classes.margin}>
                  {currentUser ? currentUser.first_name : null}, your coaching session with mentumm is booked!
                </Heading>
                <Text fontSize="2xl" className={classes.margin}>
                Check your email (and junk) for a confirmation from your coach.
                </Text>
                <Text fontSize="large" className={classes.margin}>
                  Add the session to your calendar by clicking the link at the bottom of the email or click Reschedule if you need to modify your session.
                </Text>
                <Text fontSize="large" className={classes.margin}>
                We look forward to seeing you soon! &#128522;
                </Text>
                <Button as={Link} to="/search" background="#2cbdbe" color="#fff" _hover={{ bg: '#3CA8AB' }}>BACK TO HOME</Button>
              </Box>
            </Stack>
            <Stack>
              <Box maxW="md">
                <Image
                  src={welcome}
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
