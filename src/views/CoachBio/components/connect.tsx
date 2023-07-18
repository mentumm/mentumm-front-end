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
      width="50%">
      <Flex>
        <Heading size="md">
          {`Connect with ${coach.first_name}`}
        </Heading>
        <Spacer />
        <Icon />
      </Flex>
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
  )
};

export default Connect;
