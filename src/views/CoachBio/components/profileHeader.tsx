import React from 'react';
import {
  Stack,
  Heading,
  HStack,
  Icon,
  Text,
  Link,
} from '@chakra-ui/react'
import { GoGlobe } from "react-icons/go";
import { SiLinkedin } from "react-icons/si";
import { CoachType } from '../../../types';

type ProfileHeaderProps = {
  coach: CoachType,
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ coach }) => {
  return (
    <Stack>
      <Heading size="2xl" fontWeight="bold">
        {coach && `${coach.first_name} ${coach.last_name}`}
      </Heading>
      <HStack fontSize="md">
        <Icon as={GoGlobe} color="gray.500" />
        <Text>{coach && coach.location}</Text>
        <Icon as={SiLinkedin} color="gray.500" />
        <Link
          href={
            coach && coach.linkedin_url ? coach.linkedin_url : "#"
          }
          isExternal
        >
          {coach && `${coach.first_name} ${coach.last_name}`}
        </Link>
      </HStack>
    </Stack>
  )
};

export default ProfileHeader;