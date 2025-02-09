import { Box, Container, Text } from '@chakra-ui/react';
import React from 'react';

const About = ({ bio }) => {
  return (
    <Box>
      <Text fontSize='2xl' fontWeight='bold'>
        About
      </Text>
      <Container pl={0} pr='2em' mb={2} >
        <Text>
          {bio}
        </Text>
      </Container>
    </Box>
  )
}

export default About;