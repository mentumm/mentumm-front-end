import React from 'react';
import {
  Box,
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
      <Heading size="xl" fontWeight="bold">
        {coach && `${coach.first_name} ${coach.last_name}`}
      </Heading>
      <HStack spacing={8} fontSize="md">
        {(coach && coach.location) && (
          <Box display='inherit' alignItems='center'>
            <Icon as={GoGlobe} color="gray.500" />
            <Text ml={2} >{coach.location}</Text>
          </Box>
        )}
        <Box display='inherit' alignItems='center'>
          <Icon as={SiLinkedin} color="gray.500" />
          <Link
            ml={2}
            href={
              coach && coach.linkedin_url ? coach.linkedin_url : "#"
            }
            isExternal
          >
            {coach && `${coach.first_name} ${coach.last_name}`}
          </Link>
        </Box>
      </HStack>
    </Stack>
  )
};

export default ProfileHeader;