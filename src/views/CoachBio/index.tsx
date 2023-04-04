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
import { InlineWidget, useCalendlyEventListener } from "react-calendly";
import { CoachType, CurrentUserProps } from "../../types";
import { GoGlobe } from "react-icons/go";
import { SiLinkedin } from "react-icons/si";
import { mixpanelEvent } from "../../helpers";
import PageWrapper from "../../components/PageWrapper";
import { menApiAuthClient } from "../../clients/mentumm";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();
  useCalendlyEventListener({
    onEventScheduled: () =>
      setTimeout(() => {
        navigate("/booking-confirmation");
      }, 1000),
  });

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
          "Coach Skills": coach.skills.map((skill) => skill.name),
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
                    {coach ? `${coach.first_name} ${coach.last_name}` : null}
                  </Heading>
                  <HStack fontSize="md">
                    <Icon as={GoGlobe} color="gray.500" />
                    <Text>{coach ? coach.location : null}</Text>
                    <Icon as={SiLinkedin} color="gray.500" />
                    <Link
                      href={
                        coach && coach.linkedin_url ? coach.linkedin_url : "#"
                      }
                      isExternal
                    >
                      {coach ? `${coach.first_name} ${coach.last_name}` : null}
                    </Link>
                  </HStack>
                </Stack>
                <Text color="black">{coach ? coach.bio : null}</Text>
              </Stack>
              <Stack spacing="4">
                <Button
                  colorScheme="brand"
                  variant="solid"
                  onClick={() => {
                    mixpanelEvent("Clicked Book Coach", {
                      "Coach Name": coach
                        ? `${coach.first_name} ${coach.last_name}`
                        : null,
                      "Coach ID": coach ? coach.id : null,
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
                        {coach
                          ? `with ${`${coach.first_name} ${coach.last_name}`}`
                          : null}
                      </ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <InlineWidget
                          url={coach ? coach.booking_url : null}
                          utm={{
                            utmSource: coach ? String(coach.id) : null,
                          }}
                        />
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          colorScheme="brand"
                          mr={3}
                          onClick={calendlyOnClose}
                        >
                          Cancel
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                  Book Your Coaching Session
                </Button>
              </Stack>
              <Stack spacing="4">
                <Wrap shouldWrapChildren>
                  {coach && coach.skills.length
                    ? coach.skills.map((skill) => (
                        <Tag key={skill.id}>{skill.name}</Tag>
                      ))
                    : null}
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
