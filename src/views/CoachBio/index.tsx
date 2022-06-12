import {
  AspectRatio,
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Stack,
  Tag,
  Text,
  Wrap,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { PopupModal } from "react-calendly";
import { CoachType, CurrentUserProps } from "../../types";
import { GoGlobe } from "react-icons/go";
import { SiLinkedin } from "react-icons/si";
import { mixpanelEvent } from "../../helpers";
import { useNavigate } from "react-router";

const NODE_API = process.env.REACT_APP_NODE_API;

const CoachBio: React.FC<CurrentUserProps> = ({ currentUser }) => {
  const [coach, setCoach] = useState<CoachType>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const windowUrl = window.location.toString().toLowerCase();
  const slug = windowUrl.substring(windowUrl.lastIndexOf("/") + 1);
  const coachId = slug.split("-");
  const navigate = useNavigate();

  useEffect(() => {
    const loadCoach = async () => {
      try {
        const singleCoach = await axios.get(`${NODE_API}/v1/coaches`, {
          params: {
            id: coachId[coachId.length - 1],
          },
        });

        const coach: CoachType = singleCoach.data[0];

        setCoach(singleCoach.data[0]);
        mixpanelEvent("Coach Bio Viewed", {
          "Coach ID": coach.id,
          "Coach Name": coach.name,
          "Coach Skills": coach.skills.map((skill) => skill.name),
        });
      } catch (error) {}
    };

    if (!coach) {
      loadCoach();
    }
  }, [coach, coachId]);

  return (
    <Box
      maxW="6xl"
      mx="auto"
      px={{ base: "4", md: "8", lg: "12" }}
      py={{ base: "6", md: "8", lg: "12" }}
    >
      <Stack direction={{ base: "column", md: "row" }} spacing="16">
        <Box flex="1">
          <Stack spacing="8">
            <AspectRatio maxW="450px" ratio={1}>
              <Image src={coach ? coach.photo_url : null} alt="Coach image" />
            </AspectRatio>
          </Stack>
        </Box>
        <Box maxW="sm">
          <Stack spacing="8">
            <Stack spacing="4">
              <Stack>
                <Heading size="2xl" fontWeight="bold">
                  {coach ? coach.name : null}
                </Heading>
                <HStack fontSize="md">
                  <Icon as={GoGlobe} color="gray.500" />
                  <Text>{coach ? coach.location : null}</Text>
                  <Icon as={SiLinkedin} color="gray.500" />
                  <Link href={coach ? coach.linkedin_url : "#"} isExternal>
                    {coach ? coach.name : null}
                  </Link>
                </HStack>
              </Stack>
              <Text color="black">{coach ? coach.bio : null}</Text>
            </Stack>
            <Button
              colorScheme="blue"
              variant="solid"
              onClick={() => {
                mixpanelEvent("Clicked Book Coach", {
                  "Coach Name": coach ? coach.name : null,
                  "Coach ID": coach ? coach.id : null,
                });
                setIsOpen(true);
              }}
            >
              <PopupModal
                url={coach ? coach.booking_link : null}
                onModalClose={() => setIsOpen(false)}
                open={isOpen}
                rootElement={document.getElementById("root")}
                utm={{
                  utmSource: coach ? String(coach.id) : null,
                }}
              />
              Book Your Coaching Session
            </Button>
            <Text>
              <Link color="teal.500" onClick={() => navigate(-1)}>
                Back to Results
              </Link>
            </Text>
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
  );
};

export default CoachBio;
