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
import { createUseStyles, DefaultTheme } from "react-jss";
import { CurrentUserProps } from "../../types";
import { Link } from "react-router-dom";

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

const BookingError: React.FC<CurrentUserProps> = ({ currentUser, assignedTo, coachId }) => {
  const classes = useStyles();
  const hyphenatedCoachName = assignedTo?.toLowerCase().split(' ').join('-');
  const buttonPath = (assignedTo || coachId)
    ? `/coach/${hyphenatedCoachName}-${coachId}`
    : '/search';

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
                  Oops! There was a problem confirming your coaching session
                </Heading>
                <Text fontSize="2xl" className={classes.margin}>
                  We apologize about the inconvenience
                </Text>
                <Text fontSize="large" className={classes.margin}>
                  Please click the button below to return to the Coach's profile to try booking again
                </Text>
                <Center>
                  <Button as={Link} to={buttonPath}>
                    COACH PROFILE
                  </Button>
                </Center>
              </Box>
            </Stack>
          </Flex>
        </Container>
      </div>
    </div>
  );
};

export default BookingError;