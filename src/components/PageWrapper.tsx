import { ArrowBackIcon } from '@chakra-ui/icons';
import { Container, Heading, Box, Link } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';


const PageWrapper = ({title, children}) => {
  const navigate = useNavigate();

  return (
    <Container maxW={1270}>
      <Heading as="h1" size="lg" mt={8} mb={8}><Link onClick={() => navigate(-1)}><ArrowBackIcon ml={-12} mr={2} /></Link> {title}</Heading>
      <Box>
        {children}
      </Box>
    </Container>
  )
}

export default PageWrapper;