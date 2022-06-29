import { Box, Container, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { createUseStyles, DefaultTheme } from "react-jss";

const useStyles = createUseStyles((theme: DefaultTheme) => ({
  root: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "#2cbdbe",
    width: "100%",
  },
}));

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Container as="footer" role="contentinfo" py={{ base: "6", md: "25" }}>
        <Stack spacing={{ base: "4", md: "5" }} alignItems="flex-start">
          <Text fontSize="sm" color="white">
            &copy; {new Date().getFullYear()} Mentumm. All rights reserved.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
