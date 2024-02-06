import React from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  VStack,
  Text,
  Button,
  Grid,
} from '@chakra-ui/react'
import { UserAvatar } from '../Coach/UserAvatar';
import StyleTags from './components/styleTags';
import { CoachProfileDrawerProps } from '../../types';
import AreasOfExpertise from './components/areasOfExpertise';
import About from './components/about';
import TopAchievements from './components/topAchievements';
import Socials from './components/socials';
import Hobbies from './components/hobbies';
import ContentDivider from './components/contentDivider';

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
              {!!styles.length && (
                <>
                  <ContentDivider />
                  <StyleTags styles={styles} />
                  <ContentDivider />
                </>
              )}
              <AreasOfExpertise expertise={expertise} />
              <ContentDivider />
              <About bio={bio} />
              <ContentDivider />
              {achievementsArray && (
                <>
                  <TopAchievements achievements={achievementsArray} />
                  <ContentDivider />
                </>
              )}
              {hobbiesArray && <Hobbies hobbies={hobbiesArray} />}
            </VStack>
          </VStack>
        </Grid>
      </DrawerContent>
    </Drawer>
  )
}

export default CoachProfileDrawer;