import { Box } from '@chakra-ui/react';
import React from 'react';
import HighlightedCoaches from '../../../components/HighlightedCoaches';
import { CoachType } from '../../../types';
import { getCurrentFeatured } from '../utils';
import { FeaturedCertificatePrograms } from './featuredCertificatePrograms';
import { ServicesForYou } from './servicesForYou';

interface MainContentProps {
  coaches: CoachType[]
}

const MainContent = ({
  coaches
}: MainContentProps) => {
  const featuredCoaches = getCurrentFeatured(coaches, 2);
  return (
    <Box
      bgColor='#061223'
      w='65vw'
      h='76vh'
      zIndex={20}
      mb='2em'
      borderRadius='2em'
      p='2em'
    >
      <ServicesForYou />
      {/* <HighlightedCoaches title='Featured Coaches' coaches={featuredCoaches} /> */}
      {/* <FeaturedCertificatePrograms /> */}
    </Box>
  )
}

export default MainContent;