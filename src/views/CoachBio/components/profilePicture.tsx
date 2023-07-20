import React from 'react';
import {
  Box,
  AspectRatio,
  Image,
} from "@chakra-ui/react";
import { CoachType } from '../../../types';

type ProfilePictureProps = {
  coach: CoachType
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ coach }) => {
  return (
    <Box
      bgColor='white'
      borderRadius='md'
      px={4}
      py={4}
      mr={4}
      shadow='base'
      width='50%'
    >
      <AspectRatio maxW="450px" ratio={1} >
        <Image
          src={
            coach && coach.photo_url
              ? coach.photo_url
              : "https://mentumm.com/wp-content/uploads/2022/06/mentumm_profile.png"
          }
          alt="Coach image"
        />
      </AspectRatio>
    </Box>
  )
}

export default ProfilePicture;