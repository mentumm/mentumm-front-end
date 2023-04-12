import { Box, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { createUseStyles, DefaultTheme } from "react-jss";

const useStyles = createUseStyles((theme: DefaultTheme) => ({
  root: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "var(--chakra-colors-brand-300)",
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
          &copy; {new Date().getFullYear()} mentumm. All rights reserved.
        </Text>
      </HStack>
    </Box>
  );
};

export default Footer;
