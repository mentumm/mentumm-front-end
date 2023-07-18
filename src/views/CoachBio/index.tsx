import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { CoachType, CurrentUserProps } from "../../types";
import { mixpanelEvent } from "../../helpers";
import PageWrapper from "../../components/PageWrapper";
import { menApiAuthClient } from "../../clients/mentumm";
import { createUseStyles } from "react-jss";
import { AreasOfExpertise, Bio, BookingModal, ProfileHeader, ProfilePicture } from "./components";

const useStyles = createUseStyles({
  hide: {
    display: "none",
  },
});

const CoachBio: React.FC<CurrentUserProps> = ({ currentUser }) => {
  const classes = useStyles();
  const [coach, setCoach] = useState<CoachType>(null);
  const {
    isOpen: calendlyIsOpen,
    onOpen: calendlyOnOpen,
    onClose: calendlyOnClose,
  } = useDisclosure();
  const windowUrl = window.location.toString().toLowerCase();
  const slug = windowUrl.substring(windowUrl.lastIndexOf("/") + 1);
  const coachId = slug.split("-");

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
                )
                }
              </Stack>
              {coach.bio && <Bio coach={coach} />}
              <div
                className={currentUser.role === "coach" && classes.hide}
              >
                <Stack
                  spacing="4"
                  className={currentUser.role === "coach" && classes.hide}
                >
                  <Button
                    onClick={() => {
                      mixpanelEvent("Clicked Book Coach", {
                        "Coach Name": coach &&
                          (`${coach.first_name} ${coach.last_name}`),
                        "Coach ID": coach && coach.id,
                      });
                      calendlyOnOpen();
                    }}
                  >
                    Book Your Coaching Session
                  </Button>
                </Stack>
              </div>
            </Stack>
          </Box>
        </Stack>
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
