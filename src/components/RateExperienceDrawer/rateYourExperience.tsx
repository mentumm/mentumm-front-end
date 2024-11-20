import { CloseIcon } from '@chakra-ui/icons';
import { Box, Button, Drawer, DrawerContent, DrawerOverlay, Grid, IconButton, VStack, Text, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { menApiAuthClient } from '../../clients/mentumm';
import { mixpanelEvent } from '../../helpers';
import { CoachType, ReviewFormType } from '../../types';
import { UserAvatar } from '../Coach/UserAvatar';
import About from '../CoachProfileDrawer/components/about';
import ContentDivider from '../CoachProfileDrawer/components/contentDivider';
import DrawerList from '../CoachProfileDrawer/components/drawerList';
import StyleTags from '../CoachProfileDrawer/components/styleTags';
import ReviewForm from '../CoachReview/ReviewForm';
import { TCoachBooking } from '../UpcomingCoachingSessions';

interface props {
  isOpen: boolean,
  onClose: () => void
  coachInfo: CoachType
  session: TCoachBooking
  currentUser:
}

const RateYourExperienceDrawer = ({
  isOpen,
  onClose,
  coachInfo,
  session,
  currentUser,
}: props) => {
  const [topic, setTopic] = useState<string>("");
  const [listeningRating, setListeningRating] = useState<number>(0);
  const [overallRating, setOverallRating] = useState<number>(0);
  const [learnFromCoach, setLearnFromCoach] = useState<string>("yes");
  const [bookCoachAgain, setBookCoachAgain] = useState<string>("yes");
  const [additionalComments, setAddtionalComments] = useState<string>("");

  const {
    id: coachId,
    first_name,
    last_name,
    photo_url,
  } = coachInfo;

  const toast = useToast();

  const submitForm = async (rating: ReviewFormType) => {
    try {
      const reviewCoach = await menApiAuthClient().post(
        "/coach/rating",
        rating
      );

      if (reviewCoach) {
        toast({
          title: "Review Submitted!",
          description: `We've submitted your review for ${`${first_name} ${last_name}`}.`,
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "bottom-right",
        });
        onClose();
      }
    } catch (error) {
      throw new error("Unable to submit Coach review");
    }
  };

  const eventDate = new Date(session.event_start_time);
  const previousTimeFormat = eventDate.toLocaleDateString('en-US', {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
  });

  const review = {
    user_id: currentUser.id,
    coach_id: coachInfo.id,
    rating_overall: overallRating,
    rating_listening: listeningRating,
    additional_comments: additionalComments,
    primary_topic: topic,
    user_learned: learnFromCoach === "yes" ? true : false,
    user_would_book_again: bookCoachAgain === "yes" ? true : false,
    user_coach_id: userCoachId,
  };

  mixpanelEvent("Coach Review", {
    ...review,
    coach_name: `${first_name} ${last_name}`,
  });
  submitForm(review);
};

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
            >
              SUBMIT REVIEW
            </Button>
          </VStack>
          <VStack spacing={4} align="stretch" p={6} overflowY='scroll' >
            <VStack overflowY='auto' alignItems='baseline'>
              <Text fontSize="2xl" fontWeight="bold">{`Rate your Experience with ${first_name} ${last_name}`}</Text>
              <Text fontSize="md">{`Date of session: ${previousTimeFormat}`}</Text>
              <ContentDivider />
              <Box>
                <ReviewForm
                  currentUser={currentUser}
                  coach={coach}
                  userCoachId={userCoachId}
                />
              </Box>
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