import React from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  HStack,
  VStack,
  Text,
  Divider,
  Button,
  Icon,
  Link,
  Tag,
  TagLabel
} from '@chakra-ui/react'
import { TagIcon } from '../TagIcon';
import { SiLinkedin, SiFacebook, SiInstagram } from "react-icons/si";
import { FaChrome } from 'react-icons/fa';
import { UserAvatar } from './UserAvatar';
import { CoachProfileDrawerProps } from '../../types';
import { generateCoachTags } from './utils';

const CoachProfileDrawer = ({ onClose, isOpen, coachInfo }: CoachProfileDrawerProps) => {
  const {
    first_name,
    last_name,
    styles,
    city,
    state,
    photo_url,
    linkedin_url,
    facebook_url,
    instagram_url,
    website_url,
    expertise,
    bio,
    achievements,
    hobbies,
  } = coachInfo;

  console.log(styles)

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
    <Drawer
      placement='bottom'
      onClose={onClose}
      isOpen={isOpen}
    >
      <DrawerOverlay />
      <DrawerContent
        w='960px'
        h='487px'
        mt={3}
        borderTopRadius='24px'
        borderBottomWidth='1px'
        mx='auto'
      >
        <VStack spacing={4} align="stretch" p={6}>
          <HStack justify="left" spacing={4}>
            <VStack>
              <UserAvatar
                boxSize='240px'
                borderRadius='16px'
                name={`${first_name} ${last_name}`}
                src={
                  photo_url
                    ? photo_url
                    : "https://mentumm.com/wp-content/uploads/2022/06/mentumm_profile.png"
                }
              />
              <Button>
                Book a Session
              </Button>
            </VStack>
            <VStack>
              <Text fontSize="2xl" fontWeight="bold">{`${first_name} ${last_name}`}</Text>
              <Text fontSize="md">{`${city}, ${state}`}</Text>
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
              <Divider borderColor='brand.300' />
              {styles.map((tag) => {
                console.log(tag.icon)
                return (
                  !!tag && (
                    <Tag
                      key={tag.id}
                      backgroundColor='transparent'
                      size="sm"
                      color='brand.900'
                      border='0.5px solid'
                    >
                      <TagIcon icon={tag.icon} isBgWhite={true} />
                      <TagLabel fontWeight='400'>{tag.name.toUpperCase()}</TagLabel>
                    </Tag>
                  )
                )
              })}
              <Divider borderColor='brand.300' />
            </VStack>
          </HStack>
        </VStack>
      </DrawerContent>
    </Drawer>
  )
}

export default CoachProfileDrawer;