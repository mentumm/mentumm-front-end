import React from 'react';
import {
  Box,
} from '@chakra-ui/react';
import { CoachType } from '../../../types';

type TopAchievementsProps = {
  coach: CoachType,
}

const TopAchievements: React.FC<TopAchievementsProps> = ({ coach }) => {
  return (
    <Box>
      Achievements
    </Box>
  )
}

export default TopAchievements;
