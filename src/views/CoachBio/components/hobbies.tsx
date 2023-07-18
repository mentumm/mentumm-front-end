import {
  Box,
} from '@chakra-ui/react';
import React from 'react';
import { CoachType } from '../../../types';

type HobbiesProps = {
  coach: CoachType
}

const Hobbies: React.FC<HobbiesProps> = ({ coach }) => {
  return (
    <Box>
      Hobbies
    </Box>
  )
}

export default Hobbies;
