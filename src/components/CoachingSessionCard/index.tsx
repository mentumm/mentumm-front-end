import { Heading, Divider, HStack, Flex, Icon, Spacer, Text, Box } from '@chakra-ui/react';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { TCoachBooking } from '../UpcomingCoachingSessions';


type CoachingSessionCardProps = {
  session: TCoachBooking,
  isPrevious: boolean,
}
const CoachingSessionCard = ({
  session,
  isPrevious,
}: CoachingSessionCardProps) => {

  const eventDate = new Date(session.event_start_time);
  const endDate = new Date(session.event_end_time);
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
    day: 'numeric'
  });

  const timeDifferenceDisplay = timeDifference > 0
    ? hours >= 1
      ? `${hours} hrs ${minutes} mins`
      : `${minutes} mins`
    : null;

  return (
    <Box bgColor="#0D1C31" borderRadius="1em" w="100%" p="1em" >
      <Heading fontFamily='Montserrat' size="sm" color="#3067B0" fontWeight="normal">
        {isPrevious ? 'Rate Your Experience' : 'Coaching Session'}
      </Heading>
      <Divider borderBottomColor="#3067B0" />
      <HStack mt='0.5em'>
        <Text fontSize="xs" color="#3067B0" >
          With:
        </Text>
        <Text color="#3067B0" fontSize='xs'>
          {`${session.coach.first_name} ${session.coach.last_name}`}
        </Text>
      </HStack>
      <HStack mb='0.5em'>
        <Text fontSize="xs" color="#3067B0" >
          Time:
        </Text>
        <Text color="#3067B0" fontSize='xs'>
          {isPrevious ? `${previousTimeFormat}` : `${futureTimeFrame}`}
        </Text>
      </HStack>
      <Flex align="center">
        <Icon as={FontAwesomeIcon} icon={faClockRotateLeft} color="#3067B0" size="lg" />
        <Spacer />
        <Heading size='md' color="#3067B0">
          {isSameDay
            ? timeDifferenceDisplay
            : futureEventFormat}
        </Heading>
      </Flex>
    </Box>
  )
}

export default CoachingSessionCard;