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
import { FaAward } from 'react-icons/fa';

type TopAchievementsProps = {
  coach: CoachType,
}

const TopAchievements: React.FC<TopAchievementsProps> = ({ coach }) => {
  const achievementArray = JSON.parse(coach.achievements);

  return (
    <Box
      width="100%"
      shadow='base'
      px={8}
      py={8}
    >
      <Flex>
        <Heading size="md">
          Top Achievements
        </Heading>
        <Spacer />
        <Icon as={FaAward} boxSize='2em' color="gray.300" />
      </Flex>
      <UnorderedList
        mt={4}
        spacing={2}
      >
        {achievementArray.map((achievement: string, i: number) => (
          <ListItem
            key={i}
          >
            {achievement}
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  )
}

export default TopAchievements;
