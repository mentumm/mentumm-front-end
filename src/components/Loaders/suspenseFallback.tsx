import React from 'react';
import {
  Center,
  Spinner,
} from '@chakra-ui/react'

const SuspenseFallback = () => {
  return (
    <Center mt={8}>
      <Spinner />
    </Center>
  )
}

export default SuspenseFallback;
