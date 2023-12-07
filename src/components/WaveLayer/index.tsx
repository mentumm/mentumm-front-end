import React from 'react';
import { Image } from '@chakra-ui/react';

export const WaveLayer = ({ src, ...props }) => (
  <Image
    src={src}
    position="absolute"
    bottom="0"
    left="0"
    right="0"
    w="100vw"
    {...props}
  />
);