import { Button, Container, Heading, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HighlightedCoaches from "../../components/HighlightedCoaches";
import HighlightedTags from "../../components/HighlightedTags";
import PastCoachingSessions from "../../components/PastCoachingSessions";
import UpcomingCoachingSessions from "../../components/UpcomingCoachingSessions";
import { useGetTags } from "../../helpers/tagHelpers";
import { ActionPlanForm, CoachType, CurrentUser } from "../../types";
import getWeek from "date-fns/getWeek";
import { menApiAuthClient } from "../../clients/mentumm";
import ActionPlanPrompt from "../../components/ActionPlanPrompt/ActionPlanPrompt";

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
  const coachTags = useGetTags();
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

  const hotTopics = getCurrentFeatured(coachTags, 4);
  const featuredCoaches = getCurrentFeatured(coaches, 2);
  const careerGrowthTopics = getCurrentFeatured(
    coachTags.filter((t) => t.category === "Professional"),
    4,
    4
  );

  return (
    <Container maxW={1270}>
      <Stack justifyContent="space-between" direction="row" mt={14} mb={8}>
        <Heading>Welcome back, {currentUser?.first_name}</Heading>
        <Button
          as={Link}
          to="/search"
          background="#2cbdbe"
          color="#fff"
          _hover={{ bg: "#3CA8AB" }}
          mt={2}
          style={{ zIndex: -1 }}
        >
          PICK A TOPIC
        </Button>
      </Stack>

      <ActionPlanPrompt actionPlan={actionPlan} />

      <UpcomingCoachingSessions id={currentUser?.id} />
      <HighlightedTags title="Hot Topics" tags={hotTopics} />
      <HighlightedCoaches title="Featured Coaches" coaches={featuredCoaches} />
      <HighlightedTags title="Career Growth Topics" tags={careerGrowthTopics} />
      <PastCoachingSessions currentUser={currentUser} />
    </Container>
  );
};

export default Home;
