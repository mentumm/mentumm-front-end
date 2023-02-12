import { Heading, Box, AspectRatio, Image } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../../../components/LoginWrapper";
import PageWrapper from "../../../components/PageWrapper";

export const EditProfile = () => {
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);
  return (
    <PageWrapper>
      <Box>
        <Heading as="h1" size="lg">
          My Profile
        </Heading>
      </Box>
      <Box></Box>
    </PageWrapper>
  );
};
