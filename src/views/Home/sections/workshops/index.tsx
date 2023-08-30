import { Box, Container, Center, Heading, HStack, Button, } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React from 'react';

export const WorkshopsSection = () => {
  return (
    <Box shadow="base">
      <Container
        minW="100%"
        mt={4}
        bgColor="#3168B2"
      >
        <Center>
          <Heading
            fontWeight="regular"
            size="sm"
            my={3}
            color="white"
          >
            COACHING
          </Heading>
        </Center>
      </Container>
      <Center mt={4} >

      </Center>
      <Center>
        <Button
          as={Link}
          minW="25%"
          to="/search"
          size="lg"
          borderRadius="3xl"
          my={8}
          bgColor="#3168B2"
          fontSize="md"
          fontWeight="regular"
        >
          Download Workbook
        </Button>
      </Center>
    </Box>
  )
}