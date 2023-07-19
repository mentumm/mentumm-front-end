import {
  Box,
  Flex,
  Heading,
  Spacer,
  Icon,
  UnorderedList,
  ListItem,
  SimpleGrid
} from '@chakra-ui/react';
import React from 'react';
import { CoachType } from '../../../types';
import { FaSkiing } from 'react-icons/fa';

type HobbiesProps = {
  coach: CoachType
}

const Hobbies: React.FC<HobbiesProps> = ({ coach }) => {
  const hobbiesArray = JSON.parse(coach.hobbies);
  return (
    <Box
      width="50%"
      px={8}
      py={8}
      shadow='base'
    >
      <Flex>
        <Heading size="md">
          Favorite Hobbies
        </Heading>
        <Spacer />
        <Icon as={FaSkiing} boxSize='2em' color='gray.300' />
      </Flex>
      <SimpleGrid columns={2} spacing={2} mt={4}>
        {hobbiesArray.map((hobby: string, i: number) => (
          <Box key={i}>
            <UnorderedList>
              <ListItem>{hobby}</ListItem>
            </UnorderedList>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default Hobbies;
