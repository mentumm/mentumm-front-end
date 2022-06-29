import {
  Box,
  ButtonGroup,
  Container,
  HStack,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { createUseStyles, DefaultTheme } from "react-jss";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

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
      <HStack
        color="white"
        as="footer"
        role="contentinfo"
        py={{ base: "6", md: "25" }}
      >
        <Text fontSize="sm" color="subtle" px="12px">
          &copy; {new Date().getFullYear()} Mentumm. All rights reserved.
        </Text>
      </HStack>
    </Box>
  );
};

export default Footer;
