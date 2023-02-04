import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Button,
  Stack,
  OrderedList,
  ListItem,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { createUseStyles, DefaultTheme } from "react-jss";
import { Link } from "react-router-dom";
import { mixpanelIdentify } from "../../helpers";
import { CurrentUserProps } from "../../types";
import welcome from "../CoachSearch/welcome.png";

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
  image: {
    position: "relative",
    width: "75%",
    margin: "0 auto",
  },
  margin: {
    marginBottom: "16px",
  },
  list: {
    paddingLeft: 24,
    fontSize: 24,
    "& > li": {
      marginBottom: 16,
    },
    "& > li::marker": {
      fontWeight: "bold",
    },
  },
}));

const GetStarted: React.FC<CurrentUserProps> = ({ currentUser }) => {
  const classes = useStyles();

  useEffect(() => {
    if (currentUser) {
      mixpanelIdentify(String(currentUser.id));
    }
  }, [currentUser]);

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
              <Box maxW="750px" position="relative" mt={16} pt={2}>
                <Heading as="h2" size="xl" className={classes.margin}>
                  Welcome to mentumm,{" "}
                  {currentUser ? `${currentUser.first_name}!` : null}
                </Heading>
                <Heading
                  as="h1"
                  size="lg"
                  className={classes.margin}
                  fontWeight="normal"
                >
                  On-Demand Coaching, For You 😎
                </Heading>
                <OrderedList className={classes.list}>
                  <ListItem>
                    <strong>Pick a topic</strong> you want to get better in
                  </ListItem>
                  <ListItem>
                    <strong>Choose the coach</strong> you want to work with
                  </ListItem>
                  <ListItem>
                    <strong>Book a session</strong> that fits your schedule
                  </ListItem>
                </OrderedList>
                <Button
                  as={Link}
                  to="/search"
                  background="#2cbdbe"
                  color="#fff"
                  _hover={{ bg: "#3CA8AB" }}
                  mt={2}
                >
                  GET STARTED
                </Button>
              </Box>
            </Stack>
            <Stack>
              <Box maxW="md" width="448px">
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

export default GetStarted;
