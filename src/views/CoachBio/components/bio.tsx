import React from 'react';
import {
  Box,
  Heading,
  Text,
} from '@chakra-ui/react'
import { CoachType } from '../../../types';

type BioProps = {
  coach: CoachType,
}

const Bio: React.FC<BioProps> = ({ coach }) => {
  const heading = `About ${coach.first_name}`;

  return (
    <Box>
      <Heading
        size="md"
      >
        {heading}
      </Heading>
      <Text
        mt={4}
        color="black"
      >
        {coach.bio}
      </Text>
    </Box>
  )
}

export default Bio;