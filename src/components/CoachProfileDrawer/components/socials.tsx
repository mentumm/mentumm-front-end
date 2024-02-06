import React from 'react';
import {
  HStack,
  Link,
  Button,
  Icon
} from '@chakra-ui/react';
import { SiLinkedin, SiFacebook, SiInstagram } from "react-icons/si";
import { FaChrome } from 'react-icons/fa';

const Socials = ({ socialUrls }) => {
  const { facebook_url, linkedin_url, instagram_url, website_url } = socialUrls;
  const connectUrls = [
    {
      name: 'Facebook',
      url: facebook_url,
      icon: <SiFacebook size='25px' />,
      colorScheme: 'facebook',
    },
    {
      name: 'LinkedIn',
      url: linkedin_url,
      icon: <SiLinkedin size='25px' />,
      colorScheme: 'linkedin'
    },
    {
      name: 'Instagram',
      url: instagram_url,
      icon: <SiInstagram size='25px' />,
      colorScheme: 'pink'
    },
    {
      name: 'Website',
      url: website_url,
      icon: <FaChrome size='25px' />,
      colorScheme: 'blue'
    }
  ];
  return (
    <HStack spacing="2px">
      {connectUrls.map((connection, i) => {
        return (
          connection.url && (
            <Link
              isExternal
              href={connection.url}
              key={i}
              m='0px'
              p='0px'
            >
              <Button
                w="25px"
                variant="ghost"
                colorScheme={connection.colorScheme}
              >
                <Icon viewBox='0 0 25 25'>
                  {connection.icon}
                </Icon>
              </Button>
            </Link>
          )
        )
      })}
    </HStack>
  )
}

export default Socials;
