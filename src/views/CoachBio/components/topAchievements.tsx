import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Icon,
  ListItem,
  Spacer,
  UnorderedList,
} from '@chakra-ui/react';
import { CoachType } from '../../../types';

type TopAchievementsProps = {
  coach: CoachType,
}

const TopAchievements: React.FC<TopAchievementsProps> = ({ coach }) => {
  const achievementArray = JSON.parse(coach.achievements);
  // console.log(achievementArray)
  return (
    <Box
      width="100%">
      <Flex>
        <Heading size="md">
          Top Achievements
        </Heading>
        <Spacer />
        <Icon />
      </Flex>
      <UnorderedList
        mt={4}
        spacing={2}
      >
        {achievementArray.map((achievement: string) => (
          <ListItem>
            {achievement}
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  )
}

export default TopAchievements;
