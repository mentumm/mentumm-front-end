import React, { useEffect, useState } from "react";
import {
  Container,
} from "@chakra-ui/react";
import { ActionPlanForm, CoachType, CurrentUser } from "../../types";
import { menApiAuthClient } from "../../clients/mentumm";
import ActionPlanPrompt from "../../components/ActionPlanPrompt/ActionPlanPrompt";
import { CoachingSection } from "./sections/coaching";
import { HomeNav } from "./sections/homeNav";

interface IProps {
  currentUser: CurrentUser;
}

const Home: React.FC<IProps> = ({ currentUser }) => {
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

  return (
    <Container maxW={1270}>
      {/* <HStack justifyContent="space-between">
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
      </HStack> */}
      <HomeNav />
      <CoachingSection currentUser={currentUser} coaches={coaches} />
    </Container>
  );
};

export default Home;
