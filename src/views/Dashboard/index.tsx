import React, { useState, useEffect } from 'react';
import {
  Flex,
  Image,
  Heading,
  Box,
  Spacer,
  VStack,
} from '@chakra-ui/react';
import { SvgLayer } from '../../components/Waves/svgLayer';
import logo from "../../assets/minimal-mentumm-logo.svg";
import UpcomingCoachingSessions from '../../components/UpcomingCoachingSessions';
import HighlightedCoaches from '../../components/HighlightedCoaches';
import PastCoachingSessions from '../../components/PastCoachingSessions';
import { CurrentUser, CoachType, ActionPlanForm } from '../../types';
import { menApiAuthClient } from '../../clients/mentumm';
import { getCurrentFeatured } from './utils';
import MainContent from './components/mainContent';
import SideContent from './components/sideContent';

interface IProps {
  currentUser: CurrentUser;
  setCurrentUser: (currentUser: CurrentUser) => void;
}

const Dashboard: React.FC<IProps> = ({ currentUser, setCurrentUser }) => {
  const [coaches, setCoaches] = useState<CoachType[]>([]);
  const [actionPlan, setActionPlan] = useState<ActionPlanForm>(null);
  const bgImage = 'https://mentummportal.sfo3.digitaloceanspaces.com/mentumm-splash.jpeg';

  useEffect(() => {
    const getCoaches = async () => {
      try {
        const results = await menApiAuthClient().get<CoachType[]>("/coaches");

        setCoaches(results.data);
      } catch (error) {
        throw new Error("Could not load Coach Tags!");
      }
    };

    const getActionPlan = async () => {
      try {
        const actionPlan = await menApiAuthClient().get<ActionPlanForm>(
          `/action-plans/${currentUser.id}/${new Date().toISOString()}`
        );
        setActionPlan(actionPlan.data);
      } catch (error) {
        throw new Error("Could not fetch Action Plan!");
      }
    };

    if (currentUser) {
      getActionPlan();
    }
    getCoaches();
  }, [currentUser]);

  const featuredCoaches = getCurrentFeatured(coaches, 2);

  return (
    <Flex
      height="100vh"
      bgImage={`linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${bgImage})`}
      bgPos="center center"
      bgSize="cover"
      justify='space-evenly'
      px='3em'
    >
      <VStack>
        <Flex
          w="100%"
          h="20%"
          alignItems='center'
          justifyContent='space-evenly'
        >
          <Image src={logo} boxSize="120px" />
          <Heading size="2xl" fontWeight="400" color="white" ml='5em' mr='3em' >
            Your <b>Dashboard</b>
          </Heading>
        </Flex>
        <MainContent />
      </VStack>
      <Box>
        <SvgLayer
          vbHeight="300"
        >
          <path
            d="M0 55.0362V300H1440V0C1279.43 75.0766 1033.8 180.288 729.45 182.008C415.65 183.878 162.9 131.234 0 55.0362Z" fill="#0D1C31" />
        </SvgLayer>
      </Box>
      <SideContent currentUser={currentUser} setCurrentUser={setCurrentUser} />
    </Flex>
  )
}

export default Dashboard;