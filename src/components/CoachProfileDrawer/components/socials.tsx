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
      name: 'LinkedIn',
      url: linkedin_url,
      icon: <SiLinkedin size='24px' />,
      colorScheme: 'linkedin'
    },
    {
      name: 'Facebook',
      url: facebook_url,
      icon: <SiFacebook size='24px' />,
      colorScheme: 'facebook',
    },
    {
      name: 'Instagram',
      url: instagram_url,
      icon: <SiInstagram size='24px' />,
      colorScheme: 'pink'
    },
    {
      name: 'Website',
      url: website_url,
      icon: <FaChrome size='24px' />,
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
                w="30px"
                variant='ghost'
                colorScheme={connection.colorScheme}
              >
                <Icon w='7' h='7' >
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
