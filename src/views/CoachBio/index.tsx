import {
  AspectRatio,
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tag,
  Text,
  useDisclosure,
  Wrap,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { InlineWidget } from "react-calendly";
import { CoachType, CurrentUserProps } from "../../types";
import { GoGlobe } from "react-icons/go";
import { SiLinkedin } from "react-icons/si";
import { mixpanelEvent } from "../../helpers";
import PageWrapper from "../../components/PageWrapper";
import { menApiAuthClient } from "../../clients/mentumm";
import { createUseStyles } from "react-jss";

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
          <Box flex="1">
            <AspectRatio maxW="450px" ratio={1}>
              <Image
                src={
                  coach && coach.photo_url
                    ? coach.photo_url
                    : "https://mentumm.com/wp-content/uploads/2022/06/mentumm_profile.png"
                }
                alt="Coach image"
              />
            </AspectRatio>
          </Box>
          <Box maxW="sm">
            <Stack spacing="8">
              <Stack spacing="4">
                <Stack>
                  <Heading size="2xl" fontWeight="bold">
                    {coach && `${coach.first_name} ${coach.last_name}`}
                  </Heading>
                  <HStack fontSize="md">
                    <Icon as={GoGlobe} color="gray.500" />
                    <Text>{coach && coach.location}</Text>
                    <Icon as={SiLinkedin} color="gray.500" />
                    <Link
                      href={
                        coach && coach.linkedin_url ? coach.linkedin_url : "#"
                      }
                      isExternal
                    >
                      {coach && `${coach.first_name} ${coach.last_name}`}
                    </Link>
                  </HStack>
                </Stack>
                <Text color="black">{coach && coach.bio}</Text>
              </Stack>
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
                    <Modal
                      isOpen={calendlyIsOpen}
                      onClose={calendlyOnClose}
                      isCentered
                      size="xl"
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>
                          Book your session{" "}
                          {coach &&
                            (`with ${`${coach.first_name} ${coach.last_name}`}`)
                          }
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <InlineWidget
                            url={coach && coach.booking_url}
                            utm={{
                              utmSource: coach && String(coach.id),
                            }}
                            prefill={{
                              email: currentUser?.email,
                              name: `${currentUser?.first_name} ${currentUser?.last_name}`,
                            }}
                          />
                        </ModalBody>
                        <ModalFooter>
                          <Button mr={3} onClick={calendlyOnClose}>
                            Cancel
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                    Book Your Coaching Session
                  </Button>
                </Stack>
              </div>
              <Stack spacing="4">
                <Wrap shouldWrapChildren>
                  {(coach && coach.expertise.length) &&
                    (coach.expertise.map((expertise) => (
                      <Tag key={expertise.id}>{expertise.name}</Tag>
                    )))
                  }
                </Wrap>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </PageWrapper>
  );
};

export default CoachBio;
