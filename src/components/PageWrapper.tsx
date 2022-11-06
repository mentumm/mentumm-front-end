import { ArrowBackIcon } from '@chakra-ui/icons';
import { Container, Heading, Box, Link } from '@chakra-ui/react';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface IProps {
  title?: string;
  backTo?: string;
  children: React.ReactNode;
}


const PageWrapper: FC<IProps> = ({title, backTo = '', children}) => {
  const navigate = useNavigate();

  const back = <Link onClick={() => backTo ? navigate(backTo) : navigate(-1)} style={{float:'left'}}><ArrowBackIcon ml={-12} mr={2} fontSize={30} /></Link>;

  return (
    <Container maxW={1270} pt={8}>
      {back}
      {title ? <Heading as="h1" size="lg" mb={8}> {title}</Heading> : back }
      <Box>
        {children}
      </Box>
    </Container>
  )
}

export default PageWrapper;