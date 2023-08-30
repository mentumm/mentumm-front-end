import React, { useEffect, useState } from 'react';
import { Box, Heading, Container, Center, HStack, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { CoachType, CurrentUser } from '../../../../types';
import HighlightedCoaches from '../../../../components/HighlightedCoaches';
import UpcomingCoachingSessions from '../../../../components/UpcomingCoachingSessions';
import PastCoachingSessions from '../../../../components/PastCoachingSessions';
import { getCurrentFeatured } from '../../utils';
import { CoachBooking } from '../../../../types';
import { menApiAuthClient } from '../../../../clients/mentumm';

type CoachingSeectionProps = {
  currentUser: CurrentUser;
  coaches: CoachType[];
}

type TCoachBooking = CoachBooking & { coach: CoachType };

export const CoachingSection = ({ currentUser, coaches }: CoachingSeectionProps) => {
  const [upcoming, setUpcoming] = useState<TCoachBooking[]>([]);
  const [past, setPast] = useState<TCoachBooking[]>([]);

  const featuredCoaches = getCurrentFeatured(coaches, 2);

  useEffect(() => {
    const loadUpcoming = async () => {
      const upcomingSessions = await menApiAuthClient().get("/user/upcoming", {
        params: { id: currentUser.id },
      });

      setUpcoming(upcomingSessions.data);
    };

    const loadPast = async () => {
      const pastSessions = await menApiAuthClient().get("/user/past", {
        params: { id: currentUser.id },
      });

      setPast(pastSessions.data);
    };

    loadUpcoming();
    loadPast();
  }, [currentUser.id]);

  return (
    <Box shadow="base">
      <Container
        minW="100%"
        mt={4}
        bgColor="#8A4FFF"
      >
        <Center>
          <Heading fontWeight="regular" >
            Coaching
          </Heading>
        </Center>
      </Container>
      <Center>
        {currentUser.role === 'user' && (
          <HStack>
            <UpcomingCoachingSessions upcoming={upcoming} />
            <PastCoachingSessions currentUser={currentUser} past={past} />
          </HStack>
        )
        }
        <HighlightedCoaches
          coaches={featuredCoaches}
        />
      </Center>
      <Center>
        <Button
          as={Link}
          to="/search"
          size="lg"
          borderRadius="3xl"
          my={8}
        >
          BOOK COACH
        </Button>
      </Center>
    </Box>
  )
}