import { Box } from '@chakra-ui/react';
import React from 'react';
import { CoachType } from '../../../types';

type ConnectProps = {
  coach: CoachType,
};

const Connect: React.FC<ConnectProps> = ({ coach }) => {
  return (
    <Box>
      Connect
    </Box>
  )
};

export default Connect;
