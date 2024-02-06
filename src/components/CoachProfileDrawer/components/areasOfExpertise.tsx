import { Box, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import React from 'react';

export default function AreasOfExpertise({ expertise }) {
  return (
    <Box ml={2}>
      <Text fontSize='2xl' fontWeight='bold'>
        Areas of Expertise
      </Text>
      <UnorderedList mb={2}>
        {expertise.map((tag) => (
          <ListItem key={tag.id} ml={2} >
            {tag.name}
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  )
}