import {
  Box,
  Flex,
  Heading,
  Spacer,
  Icon,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import { SiLinkedin, SiFacebook, SiInstagram } from "react-icons/si";
import WebsiteIcon from '../assets/websiteIcon';
import { CoachType } from '../../../types';
import { FaUserCircle } from 'react-icons/fa';

type ConnectProps = {
  coach: CoachType,
};

const Connect: React.FC<ConnectProps> = ({ coach }) => {
  const connectUrls = [
    {
      name: 'Facebook',
      url: coach.facebook_url,
      icon: <SiFacebook />
    },
    {
      name: 'LinkedIn',
      url: coach.linkedin_url,
      icon: <SiLinkedin />
    },
    {
      name: 'Instagram',
      url: coach.website_url,
      icon: <SiInstagram />
    },
    {
      name: 'Website',
      url: coach.website_url,
      icon: <WebsiteIcon />
    }
  ];

  return (
    <Box
      px={8}
      py={8}
      borderRadius='md'
      boxShadow='0px 0px 1px 0px #00000059'
      width="50%"
      shadow='base'
    >
      <Flex>
        <Heading size="md">
          {`Connect with ${coach.first_name}`}
        </Heading>
        <Spacer />
        <Icon as={FaUserCircle} boxSize='2em' color='gray.300' />
      </Flex>
      <Box
        mt={6}
      >
        {connectUrls.map((connection) => (
          connection.url && (
            <Button
              leftIcon={connection.icon}
            >
              {connection.name}
            </Button>
          )
        ))}
      </Box>
    </Box>
  )
};

export default Connect;
