import React from 'react';
import { Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { ArrowBackIcon } from '@chakra-ui/icons';


const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Link
      position="absolute"
      zIndex={1}
      mt="3em"
      ml="4em"
      onClick={() => (navigate(-1))}
    >
      <ArrowBackIcon mr={2} fontSize="3em" color="white" />
    </Link>
  );
}

export default BackButton;
