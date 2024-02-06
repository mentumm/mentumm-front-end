import { Box, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import React from 'react';

const TopAchievements = ({ achievements }) => {

  return (
    <Box>
      <Text fontSize='2xl' fontWeight='bold'>
        Top Achievements
      </Text>
      <UnorderedList>
        {achievements.map((achievement, i) => (
          <ListItem key={i} ml={2}>
            {achievement}
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  )
}

export default TopAchievements;
