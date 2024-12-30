import { Box } from "@chakra-ui/react";
import React from "react";
import HighlightedCoaches from "../../../components/FeaturedCoaches";
import { CoachType, CurrentUser } from "../../../types";
import { getCurrentFeatured } from "../../../utils/dashboard";
import { FeaturedCertificatePrograms } from "../../../components/Dashboard/FeaturedCertificatePrograms";
import { ServicesForYou } from "./servicesForYou";

interface MainContentProps {
  coaches: CoachType[];
  currentUser: CurrentUser;
}

const MainContent = ({ coaches, currentUser }: MainContentProps) => {
  const featuredCoaches = getCurrentFeatured(coaches, 3);
  return (
    <Box
      bgColor="#061223"
      w="65vw"
      zIndex={2}
      mb="2em"
      borderRadius="2em"
      p="2em"
    >
      <ServicesForYou currentUser={currentUser} />
      <HighlightedCoaches title="Featured Coaches" coaches={featuredCoaches} />
      <FeaturedCertificatePrograms title="Certificate Programs" />
    </Box>
  );
};

export default MainContent;
