import { CloseIcon } from '@chakra-ui/icons';
import { Box, Button, Drawer, DrawerContent, DrawerOverlay, Grid, IconButton, VStack, Text } from '@chakra-ui/react';
import React from 'react';
import { CoachType } from '../../types';
import bio from '../../views/CoachBio/components/bio';
import { UserAvatar } from '../Coach/UserAvatar';
import About from '../CoachProfileDrawer/components/about';
import ContentDivider from '../CoachProfileDrawer/components/contentDivider';
import DrawerList from '../CoachProfileDrawer/components/drawerList';
import Socials from '../CoachProfileDrawer/components/socials';
import StyleTags from '../CoachProfileDrawer/components/styleTags';

interface props {
  isOpen: boolean,
  onClose: () => void
  coachInfo: CoachType
}

const RateYourExperienceDrawer = ({
  isOpen,
  onClose,
  coachInfo
}: props) => {

  const {
    id: coachId,
    first_name,
    last_name,
    styles,
    city,
    state,
    photo_url,

    expertise,
    bio,
  } = coachInfo;

  return (
    <Drawer
      placement='bottom'
      onClose={onClose}
      isOpen={isOpen}
    >
      <DrawerOverlay>
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
              <Button
                variant='onBlue'
              // TODO: handle review submission logic
              >
                SUBMIT REVIEW
              </Button>
            </VStack>
            <VStack spacing={4} align="stretch" p={6} overflowY='scroll' >
              <VStack overflowY='auto' alignItems='baseline'>
                <Text fontSize="2xl" fontWeight="bold">{`${first_name} ${last_name}`}</Text>
                <Text fontSize="md">{`${city}, ${state}`}</Text>
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
              </VStack>
              <Box
                position='absolute'
                top='0'
                right='0'
              >
                <IconButton
                  aria-label="Close drawer"
                  icon={<CloseIcon w='8px' />}
                  onClick={onClose}
                  mr={4}
                  size="xs"
                  isRound
                  bgColor="white"
                  border="2px solid"
                  borderColor="brand.800"
                  color="brand.800"
                />
              </Box>
            </VStack>
          </Grid>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

export default RateYourExperienceDrawer