import { ArrowBackIcon } from '@chakra-ui/icons';
import { Container, Heading, Box, Link } from '@chakra-ui/react';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface IProps {
  title: string;
  backTo?: string;
  children: React.ReactNode;
}


const PageWrapper: FC<IProps> = ({title, backTo = '', children}) => {
  const navigate = useNavigate();

  return (
    <Container maxW={1270}>
      <Heading as="h1" size="lg" mt={8} mb={8}><Link onClick={() => backTo ? navigate(backTo) : navigate(-1)}><ArrowBackIcon ml={-12} mr={2} /></Link> {title}</Heading>
      <Box>
        {children}
      </Box>
    </Container>
  )
}

export default PageWrapper;