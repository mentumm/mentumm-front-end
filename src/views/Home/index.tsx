import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  HStack,
  Image,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import HighlightedCoaches from "../../components/HighlightedCoaches";
import PastCoachingSessions from "../../components/PastCoachingSessions";
import UpcomingCoachingSessions from "../../components/UpcomingCoachingSessions";
import { ActionPlanForm, CoachType, CurrentUser } from "../../types";
import getWeek from "date-fns/getWeek";
import { menApiAuthClient } from "../../clients/mentumm";
import ActionPlanPrompt from "../../components/ActionPlanPrompt/ActionPlanPrompt";
import { Link } from "react-router-dom";
import hexBlue from "./hex-blue.svg";
import hexGreen from "./hex-green.svg";
import hexPurple from "./hex-purple.svg";
import threePillar from "./three-pillar.svg";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  hide: {
    display: "none",
  },
});

function getCurrentFeatured<T>(
  objects: T[],
  amount: number,
  weekOffset = 0
): T[] {
  if (!objects.length) {
    return objects;
  }
  const total = objects.length;
  const sets = Math.ceil(total / amount);
  const week = getWeek(new Date()) + weekOffset;
  const endIndex = Math.min(((week % sets) + 1) * amount, total);
  const startIndex = endIndex - amount;
  return objects.slice(startIndex, endIndex);
}

interface IProps {
  currentUser: CurrentUser;
}

const Home: React.FC<IProps> = ({ currentUser }) => {
  const classes = useStyles();
  const [coaches, setCoaches] = useState<CoachType[]>([]);
  const [actionPlan, setActionPlan] = useState<ActionPlanForm>(null);

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

  if (!currentUser) {
    return null;
  }

  const featuredCoaches = getCurrentFeatured(coaches, 2);

  return (
    <Container maxW={1270}>
      <Stack justifyContent="space-between" direction="row" mt={14} mb={8}>
        <Heading>Welcome Back, {currentUser?.first_name}</Heading>
      </Stack>

      <HStack justifyContent="space-between">
        <Box>
          <HStack alignItems="flex-start" mb={12}>
            <Box>
              <Image src={hexBlue} alt="Leadership Workshops" mt={1} />
            </Box>
            <Box>
              <Heading fontWeight="normal" fontSize={24} mb={4}>
                Leadership Workshops
              </Heading>
              <Button as={Link} to="/workshops" size="lg">
                SEE ALL WORKSHOPS
              </Button>
            </Box>
          </HStack>
          <HStack alignItems="flex-start" mb={12}>
            <Box>
              <Image src={hexPurple} alt="Action Planning" mt={1} />
            </Box>
            <Box>
              <Heading fontWeight="normal" fontSize={24} mb={4}>
                Action Planning
              </Heading>
              <ActionPlanPrompt actionPlan={actionPlan} />
            </Box>
          </HStack>
          <HStack alignItems="flex-start" mb={12}>
            <Box>
              <Image src={hexGreen} alt="One-on-One Coaching" mt={1} />
            </Box>
            <Box>
              <Heading fontWeight="normal" fontSize={24} mb={4}>
                One-on-One Coaching
              </Heading>
              <Button as={Link} to="/search" size="lg">
                BOOK YOUR SESSION
              </Button>
            </Box>
          </HStack>
        </Box>
        <Box>
          <Image src={threePillar} alt="One-on-One Coaching" />
        </Box>
      </HStack>
      <div className={currentUser.role === "coach" ? classes.hide : null}>
        <UpcomingCoachingSessions id={currentUser?.id} />
        <HighlightedCoaches
          title="Featured Coaches"
          coaches={featuredCoaches}
        />
        <PastCoachingSessions currentUser={currentUser} />
      </div>
    </Container>
  );
};

export default Home;
