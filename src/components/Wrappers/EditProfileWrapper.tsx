import React from "react";
import { Box, Container, Heading } from "@chakra-ui/react";
import PageWrapper from "./PageWrapper";

export const EditProfileWrapper = ({ children }) => {
  return (
    <PageWrapper>
      <Container maxW="container.lg">
        <Box>
          <Heading as="h1" size="lg">
            My Profile
          </Heading>
        </Box>
        <Box>{children}</Box>
      </Container>
    </PageWrapper>
  );
};
