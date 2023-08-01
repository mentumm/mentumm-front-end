import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import Coach from "../../components/Coach";
import { menApiAuthClient } from "../../clients/mentumm";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";

const CoachSearch = ({ currentUser }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [coaches, setCoaches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [coachBooked, setCoachBooked] = useState<boolean>(null);
  const navigate = useNavigate();

  const handleChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleReset = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    const controller = new AbortController();

    const getCoaches = async () => {
      setIsLoading(true);

      try {
        const coaches = await menApiAuthClient().get(
          `/coaches${searchTerm ? `?search=${searchTerm}` : ""}`,
          {
            signal: controller.signal,
          }
        );
        if (!coaches || !coaches.data) {
          throw new Error("Could not get Coaches from API");
        }
        setCoaches(coaches.data);
        setIsLoading(false);
      } catch (err) {
        if (axios.isCancel(err)) {
          return;
        }
        setIsLoading(false);
        console.error(err);
      }
    };

    const timeoutId = setTimeout(() => {
      getCoaches();
    }, 250);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [searchTerm]);

  useEffect(() => {
    // these are for the calendly redirect url params
    const event_type_uuid = searchParams.get("event_type_uuid");
    const event_type_name = searchParams.get("event_type_name");
    const event_start_time = searchParams.get("event_start_time");
    const event_end_time = searchParams.get("event_end_time");
    const invitee_uuid = searchParams.get("invitee_uuid");
    const invitee_full_name = searchParams.get("invitee_full_name");
    const invitee_email = searchParams.get("invitee_email");
    const utmSource = searchParams.get("utm_source");

    const bookCoach = async () => {
      try {
        const bookedCoach = await menApiAuthClient().post("/user/book-coach", {
          user_id: currentUser.id,
          coach_id: utmSource,
          event_end_time,
          event_start_time,
          event_type_name,
          event_type_uuid,
          invitee_email,
          invitee_full_name,
          invitee_uuid,
        });

        if (bookedCoach) {
          setCoachBooked(true);
        }
      } catch (error) {
        throw new Error("Could not save booking!");
      }
    };

    if (!coachBooked && invitee_email && currentUser?.id) {
      bookCoach();
    } else if (!invitee_email) {
      setCoachBooked(false);
    }
  }, [searchParams, coachBooked, currentUser]);

  if (coachBooked) {
    navigate("/booking-confirmation");
  }

  return (
    <PageWrapper title="All Mentumm Coaches" backTo="/home">
      <Box display="flex" flexDir="row" paddingX={4}>
        <InputGroup>
          <InputLeftAddon children={<SearchIcon />} />
          <Input
            placeholder="Search by coach name..."
            onChange={(e) => handleChange(e.target.value)}
            flex={1}
            mr="4"
            value={searchTerm}
          />
        </InputGroup>
        <Button
          disabled={searchTerm.length === 0}
          onClick={handleReset}
          leftIcon={<CloseIcon />}
        >
          Reset
        </Button>
      </Box>
      {isLoading && (
        <Box textAlign={"center"} mt="8">
          <Spinner size="xl" />
        </Box>
      )}
      {coaches.length >= 1 && (
        <Box
          display="flex"
          flexDir="row"
          flexWrap="wrap"
          justifyContent="space-around"
        >
          {!isLoading &&
            coaches.map((coach) => (
              <Box key={coach.id} padding={4}>
                <Coach coachInfo={coach} />
              </Box>
            ))}
        </Box>
      )}
      {!isLoading && coaches.length === 0 && (
        <Box p="32" textAlign="center">
          <Text>
            Sorry, no coaches were found. Try a different search term.
          </Text>
        </Box>
      )}
    </PageWrapper>
  );
};

export default CoachSearch;
