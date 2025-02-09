import { Box, BoxProps, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";

export const Card = (props: BoxProps) => (
  <Box
    bg={useColorModeValue("white", "gray.700")}
    mx="auto"
    p={2}
    rounded={{ sm: "lg" }}
    shadow={{ md: "base" }}
    {...props}
  />
);
