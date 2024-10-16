import { Box } from "@chakra-ui/react";
import React from "react";
import PastCoachingSessions from "../PastCoachingSessions";
import UpcomingCoachingSessions from "../UpcomingCoachingSessions";
import SideContentHeader from "./SideContentHeader";

const SideContent = ({ currentUser, setCurrentUser }) => {
  return (
    <Box
      w="336px"
      bgColor="#061223"
      zIndex="2"
      borderRadius="1em"
      my="2em"
      px="2em"
    >
      <SideContentHeader
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <UpcomingCoachingSessions id={currentUser?.id} />
      <PastCoachingSessions currentUser={currentUser} />
    </Box>
  );
};

export default SideContent;
