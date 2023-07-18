import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { CoachType, CurrentUserProps } from "../../types";
import { mixpanelEvent } from "../../helpers";
import PageWrapper from "../../components/PageWrapper";
import { menApiAuthClient } from "../../clients/mentumm";
import {
  AreasOfExpertise,
  Bio,
  BookingModal,
  ProfileHeader,
  ProfilePicture,
  BookCoachingButton,
  TopAchievements,
  Hobbies,
  Connect,
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

  const isCoach = (currentUser && currentUser.role === "coach");

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
          "Coach Name": `${coach.first_name} ${coach.last_name}`,
          "Coach Expertise": coach.expertise.map((expertise) => expertise.name),
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
        <Stack direction={{ base: "column", md: "row" }}>
          <ProfilePicture coach={coach} />
          <Box maxW="sm">
            <Stack spacing="8">
              <Stack spacing="4">
                <ProfileHeader coach={coach} />
                {coach.expertise.length && (
                  <AreasOfExpertise coach={coach} />
                )}
                {!isCoach && (
                  <BookCoachingButton
                    coach={coach}
                    calendlyOnOpen={calendlyOnOpen}
                  />)}
              </Stack>
            </Stack>
          </Box>
        </Stack>
        <VStack>
          {coach.bio && (
            <Bio coach={coach}
            />
          )}
          {coach.achievements1 && ( //*todo* change this check once we create type for achievements
            <TopAchievements coach={coach} />
          )}
          <Stack direction={{ base: "column", md: "row" }}>
            <Hobbies coach={coach} />
            <Connect coach={coach} />
          </Stack>
          {!isCoach && (
            <BookCoachingButton
              coach={coach}
              calendlyOnOpen={calendlyOnOpen}
            />)}
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
