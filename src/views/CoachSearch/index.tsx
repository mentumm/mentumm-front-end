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
import PageWrapper from "../../components/Wrappers/PageWrapper";
import Coach from "../../components/Coach";
import { menApiAuthClient } from "../../clients/mentumm";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";

const CoachSearch = ({ currentUser }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [coaches, setCoaches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleReset = () => {
    setSearchTerm("");
  };

  console.log(searchTerm);

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
    const assignedTo = searchParams.get("assigned_to");
    const eventTypeUUID = searchParams.get("event_type_uuid");
    const eventTypeName = searchParams.get("event_type_name");
    const eventStartTime = searchParams.get("event_start_time");
    const eventEndTime = searchParams.get("event_end_time");
    const inviteeUUID = searchParams.get("invitee_uuid");
    const inviteeFullName = searchParams.get("invitee_full_name");
    const inviteeEmail = searchParams.get("invitee_email");
    const inviteeAnswer = searchParams.get("answer_1");
    const utmSource = searchParams.get("utm_source");

    if (eventTypeUUID) {
      navigate(
        `/booking-confirmation?utm_source=${utmSource}&assigned_to=${assignedTo}&event_type_uuid=${eventTypeUUID}&event_type_name=${eventTypeName}&event_start_time=${eventStartTime}&event_end_time=${eventEndTime}&invitee_uuid=${inviteeUUID}&invitee_full_name=${inviteeFullName}&invitee_email=${inviteeEmail}&answer_1=${inviteeAnswer}`
      );
    }
  }, [navigate, searchParams]);

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
