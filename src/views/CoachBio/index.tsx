import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Spacer,
  Stack,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { CoachType, CurrentUserProps } from "../../types";
import { mixpanelEvent } from "../../helpers";
import PageWrapper from "../../components/Wrappers/PageWrapper";
import { menApiAuthClient } from "../../clients/mentumm";
import {
  ProfilePicture,
  ProfileHeader,
  CoachingStyles,
  AreasOfExpertise,
  Bio,
  BookCoachingButton,
  TopAchievements,
  Hobbies,
  Connect,
  BookingModal,
} from "./components";

const CoachBio: React.FC<CurrentUserProps> = ({ currentUser }) => {
  const [coach, setCoach] = useState<CoachType>(null);
  const {
    isOpen: calendlyIsOpen,
    onOpen: calendlyOnOpen,
    onClose: calendlyOnClose,
  } = useDisclosure();
  const windowUrl = window.location.toString().toLowerCase();
  const slug = windowUrl.substring(windowUrl.lastIndexOf("/") + 1);
  const coachId = slug.split("-");

  const isCoach = currentUser && currentUser.role === "coach";

  useEffect(() => {
    const loadCoach = async () => {
      try {
        const singleCoach = await menApiAuthClient().get("/coaches", {
          params: {
            id: coachId[coachId.length - 1],
          },
        });

        const coach: CoachType = singleCoach.data[0];

        setCoach(singleCoach.data[0]);
        mixpanelEvent("Coach Bio Viewed", {
          "Coach ID": coach.id,
          "Coach": `${coach.first_name} ${coach.last_name}`,
          "Coach Expertise": coach.expertise.map((expertise) => expertise.name),
          "Coach City": coach.city,
          "Coach State": coach.state,
        });
      } catch (error) {
        console.log("Problem loading Coach Bio", error);
        throw new Error(error);
      }
    };

    if (!coach) {
      loadCoach();
    }
  }, [coach, coachId]);

  if (!currentUser || !coach) {
    return null;
  }

  return (
    <PageWrapper>
      <Box
        maxW="5xl"
        mx="auto"
        px={{ base: "4", md: "8", lg: "12" }}
        pb={{ base: "6", md: "8", lg: "12" }}
      >
        <Flex flexDirection={{ base: "column", md: "row" }} alignItems="center">
          <ProfilePicture coach={coach} />
          <Spacer />
          <Stack
            maxW={{ base: "80%", md: "sm", lg: "sm" }}
            mt={{ base: "4", md: "0", lg: "0" }}
            spacing="8"
          >
            <ProfileHeader coach={coach} />
            {coach.styles.length && <CoachingStyles coach={coach} />}
            {coach.expertise.length && <AreasOfExpertise coach={coach} />}
            {!isCoach && (
              <BookCoachingButton
                coach={coach}
                calendlyOnOpen={calendlyOnOpen}
              />
            )}
          </Stack>
        </Flex>
        <VStack spacing={8}>
          {coach.bio && <Bio coach={coach} />}
          {coach.achievements && <TopAchievements coach={coach} />}
          <Stack
            direction={{ base: "column", md: "row" }}
            width="100%"
            spacing={4}
          >
            {coach.hobbies && <Hobbies coach={coach} />}
            <Connect coach={coach} />
          </Stack>
          {!isCoach && (
            <Box mt={8}>
              <BookCoachingButton
                coach={coach}
                calendlyOnOpen={calendlyOnOpen}
              />
            </Box>
          )}
        </VStack>
        <BookingModal
          coach={coach}
          currentUser={currentUser}
          calendlyIsOpen={calendlyIsOpen}
          calendlyOnClose={calendlyOnClose}
        />
      </Box>
    </PageWrapper>
  );
};

export default CoachBio;
