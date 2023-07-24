import React from 'react';
import {
  Stack,
  Heading,
  Wrap,
  Tag,
} from '@chakra-ui/react';
import { CoachType } from '../../../types';

type AreasOfExpertiseProps = {
  coach: CoachType;
}

const AreasOfExpertise: React.FC<AreasOfExpertiseProps> = ({ coach }) => {
  return (
    <Stack spacing="4">
      <Heading size='md' >
        Areas of Expertise
      </Heading>
      <Wrap shouldWrapChildren>
        {(coach.expertise.map((expertise) => (
          <Tag p={2} key={expertise.id}>{expertise.name}</Tag>
        )))
        }
      </Wrap>
    </Stack>
  )
}

export default AreasOfExpertise;