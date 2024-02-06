import {
  Box,
  Text,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import React from 'react';

const Hobbies = ({ hobbies }) => {
  return (
    <Box>
      <Text fontSize='2xl' fontWeight='bold'>
        Favorite Hobbies
      </Text>
      <UnorderedList>
        {hobbies.map((achievement, i) => (
          <ListItem key={i} ml={2}>
            {achievement}
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  )
}

export default Hobbies;
