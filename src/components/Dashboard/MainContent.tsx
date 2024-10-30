import { Box } from "@chakra-ui/react";
import React from "react";
import HighlightedCoaches from "../FeaturedCoaches";
import { CoachType } from "../../types";
import { getCurrentFeatured } from "../../utils/dashboard";
import { FeaturedCertificatePrograms } from "./FeaturedCertificatePrograms";
import { ServicesForYou } from "./ServicesForYou";

interface MainContentProps {
  coaches: CoachType[];
}

const MainContent = ({ coaches }: MainContentProps) => {
  const featuredCoaches = getCurrentFeatured(coaches, 3);
  return (
    <Box
      bgColor="#061223"
      w="65vw"
      h="76vh"
      zIndex={2}
      mb="2em"
      borderRadius="2em"
      p="2em"
    >
      <ServicesForYou />
      <HighlightedCoaches title="Featured Coaches" coaches={featuredCoaches} />
      <FeaturedCertificatePrograms title="Featured Certificate Programs" />
    </Box>
  );
};

export default MainContent;
