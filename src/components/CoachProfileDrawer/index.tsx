import React from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  VStack,
  Text,
  Button,
  Grid,
  IconButton,
  Box,
} from '@chakra-ui/react'
import { UserAvatar } from '../Coach/UserAvatar';
import StyleTags from './components/styleTags';
import { CoachProfileDrawerProps } from '../../types';
import About from './components/about';
import Socials from './components/socials';
import ContentDivider from './components/contentDivider';
import { CloseIcon } from '@chakra-ui/icons';
import DrawerList from './components/drawerList';

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

  const socialUrls = {
    linkedin_url,
    facebook_url,
    instagram_url,
    website_url,
  }

  const achievementsArray = JSON.parse(achievements);
  const hobbiesArray = JSON.parse(hobbies);

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
        <Grid templateColumns='1fr 3fr' h='100%'>
          <VStack alignItems='center' ml={6} mt={6} >
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
          <VStack spacing={4} align="stretch" p={6} overflowY='scroll' >
            <VStack overflowY='auto' alignItems='baseline'>
              <Text fontSize="2xl" fontWeight="bold">{`${first_name} ${last_name}`}</Text>
              <Text fontSize="md">{`${city}, ${state}`}</Text>
              <Socials socialUrls={socialUrls} />
              <ContentDivider />
              {!!styles.length && (
                <>
                  <StyleTags styles={styles} />
                  <ContentDivider />
                </>
              )}
              <DrawerList heading='Areas of Expertise' items={expertise} />
              <ContentDivider />
              <About bio={bio} />
              {achievementsArray && (
                <>
                  <ContentDivider />
                  <DrawerList heading={'Top Achievements'} items={achievementsArray} />
                  <ContentDivider />
                </>
              )}
              {hobbiesArray && <DrawerList heading='Favorite Hobbies' items={hobbiesArray} />}

            </VStack>
            <Box
              position='absolute'
              top='0'
              right='0'
            >
              <IconButton
                aria-label="Close drawer"
                icon={<CloseIcon w='8px' strokeWidth='3px' />}
                onClick={onClose}
                mr={4}
                size="xs"
                isRound
                bgColor="white"
                border="2px solid"
                borderColor="brand.800"
                color="brand.800"
              />
            </Box>d
          </VStack>
        </Grid>
      </DrawerContent>
    </Drawer>
  )
}

export default CoachProfileDrawer;