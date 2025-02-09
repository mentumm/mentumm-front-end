import {
  Box,
  Text,
  UnorderedList,
  ListItem,

} from '@chakra-ui/react';
import React from 'react';

const DrawerList = ({ heading, items }) => {
  return (
    <Box>
      <Text fontSize='2xl' fontWeight='bold'>
        {heading}
      </Text>
      <UnorderedList>
        {items && items.map((item, i) => {
          const isString = typeof item === 'string';
          return (
            <ListItem key={i} ml={2}>
              {isString ? item : item.name}
            </ListItem>
          )
        })}
      </UnorderedList>
    </Box>
  )
}

export default DrawerList;
