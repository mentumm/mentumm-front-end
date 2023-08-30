import {
  Box,
  Flex,
  Heading,
  Spacer,
  Icon,
  Button,
  Link,
  SimpleGrid,
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
      icon: <SiFacebook size='25px' />,
      colorScheme: 'facebook',
    },
    {
      name: 'LinkedIn',
      url: coach.linkedin_url,
      icon: <SiLinkedin size='25px' />,
      colorScheme: 'linkedin'
    },
    {
      name: 'Instagram',
      url: coach.instagram_url,
      icon: <SiInstagram size='25px' />,
      colorScheme: 'pink'
    },
    {
      name: 'Website',
      url: coach.website_url,
      icon: <WebsiteIcon />,
      colorScheme: 'blue'
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
        <SimpleGrid columns={2} spacing={2} mt={4}>
          {connectUrls.map((connection, i) => {
            return (
              connection.url && (
                <Link
                  isExternal
                  href={connection.url}
                  key={i}
                >
                  <Button
                    w="10em"
                    variant="ghost"
                    colorScheme={connection.colorScheme}
                    leftIcon={connection.icon}
                  >
                    {connection.name}
                  </Button>
                </Link>
              )
            )
          })}
        </SimpleGrid>
      </Box>
    </Box>
  )
};

export default Connect;
