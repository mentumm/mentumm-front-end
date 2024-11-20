// CoachingSessionCard.tsx
import {
  Heading,
  Divider,
  HStack,
  Flex,
  Icon,
  Spacer,
  Text,
  Box,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { TCoachBooking } from '../UpcomingCoachingSessions';
import RateYourExperienceDrawer from '../RateExperienceDrawer/rateYourExperience';

type CoachingSessionCardProps = {
  session: TCoachBooking;
  isPrevious: boolean;
};

export const CoachingSessionCard = ({
  session,
  isPrevious,
}: CoachingSessionCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { coach, event_start_time, event_end_time } = session;

  const eventDate = new Date(event_start_time);
  const endDate = new Date(event_end_time);
  const today = new Date();
  const isSameDay =
    eventDate.getFullYear() === today.getFullYear() &&
    eventDate.getMonth() === today.getMonth() &&
    eventDate.getDate() === today.getDate();

  const startTime = eventDate.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const endTime = endDate.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const month = eventDate.toLocaleString('en-GB', { month: 'short' });
  const day = eventDate.getDate();
  const timeDifference = Math.floor((eventDate.getTime() - today.getTime()) / (1000 * 60));
  const hours = Math.floor(timeDifference / 60);
  const minutes = timeDifference % 60;
  const futureTimeFrame = `${startTime} - ${endTime}`;
  const futureEventFormat = `${day} ${month}`;
  const previousTimeFormat = eventDate.toLocaleDateString('en-US', {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
  });

  const timeDifferenceDisplay = timeDifference > 0
    ? hours >= 1
      ? `${hours} hrs ${minutes} mins`
      : `${minutes} mins`
    : null;

  const handleOpenReviewDrawer = () => {
    onOpen(); // Opens the RateYourExperienceDrawer
  };

  return (
    <>
      <Box bgColor="#0D1C31" borderRadius="1em" w="100%" p="1em">
        <Heading
          fontFamily="Montserrat"
          size="sm"
          color="brand.1000"
          fontWeight="normal"
        >
          {isPrevious ? 'Rate Your Experience' : 'Coaching Session'}
        </Heading>
        <Divider borderBottomColor="brand.1000" />
        <HStack mt="0.5em">
          <Text fontSize="xs" color="brand.1000">
            With:
          </Text>
          <Text color="brand.1000" fontSize="xs">
            {`${coach.first_name} ${coach.last_name}`}
          </Text>
        </HStack>
        <HStack mb="0.5em">
          <Text fontSize="xs" color="brand.1000">
            Time:
          </Text>
          <Text color="brand.1000" fontSize="xs">
            {isPrevious ? `${previousTimeFormat}` : `${futureTimeFrame}`}
          </Text>
        </HStack>
        {!isPrevious && (
          <Flex align="center">
            <Icon
              as={FontAwesomeIcon}
              icon={faClockRotateLeft}
              color="brand.1000"
              boxSize="lg"
            />
            <Spacer />
            <Heading size="md" color="brand.1000">
              {isSameDay
                ? timeDifferenceDisplay
                : futureEventFormat}
            </Heading>
          </Flex>
        )}
        {isPrevious && (
          <Button
            variant="onBlueAlt"
            w="100%"
            onClick={handleOpenReviewDrawer}
          >
            REVIEW
          </Button>
        )}
      </Box>

      {/* RateYourExperienceDrawer */}
      {isPrevious && (
        <RateYourExperienceDrawer
          isOpen={isOpen}
          onClose={onClose}
          coachInfo={coach}
          session={session}
          currentUser={currentUser}
        />
      )}
    </>
  );
};

export const EmptyCoachingSessionCard = () => {
  return (
    <Box bgColor="brand.800" borderRadius="1em" w="100%" p="1em" h="128px">
      <Heading
        display="flex"
        justifyContent="center"
        mb={1}
        fontFamily="Montserrat"
        size="sm"
        color="brand.1000"
        fontWeight="normal"
      >
        No upcoming sessions
      </Heading>
      <Divider borderBottomColor="brand.1000" />
      <HStack mt="0.5em"></HStack>
      <Flex align="center"></Flex>
    </Box>
  );
};