import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import PageWrapper from "../../components/Wrappers/PageWrapper";
import Coach from "../../components/Coach";
import { CoachType, CurrentUser, Tag } from "../../types";
import { menApiAuthClient } from "../../clients/mentumm";
import envConfig from "../../envConfig";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { TagOption } from "../../components/TagOption";
import { toggleTag } from "../../components/TagOption/utils";

const CoachSearch = ({ currentUser }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [coaches, setCoaches] = useState([]);
  const [styleTags, setStyleTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleReset = () => {
    setSearchTerm("");
  };

  // fetch coaches
  useEffect(() => {
    const controller = new AbortController();

    const getCoaches = async () => {
      setIsLoading(true);

      try {
        const response = await menApiAuthClient().get<CoachType[]>(`/coaches`, {
          signal: controller.signal,
        });

        if (!response || !response.data) {
          throw new Error('Could not get Coaches from API');
        }

        setCoaches(response.data);
        setIsLoading(false);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error(err);
        }
        setIsLoading(false);
      }
    };

    getCoaches();
  }, []);

  //memoized coaches to remove need for multiple API calls on search
  const filteredCoaches = useMemo(() => {
    return coaches
      .filter((coach: CoachType) => {
        const name = `${coach.first_name} ${coach.last_name}` || '';
        return searchTerm === '' || (name && name.toLowerCase().includes(searchTerm.toLowerCase()));
      })
      .filter((coach) => {
        if (selectedTags.length === 0) {
          return true;
        }
        return coach.styles.some((style: Tag) => selectedTags.includes(style.id));
      });
  }, [coaches, searchTerm, selectedTags]);

  // fetch style tags from API
  useEffect(() => {
    const getTags = async () => {
      try {
        setIsLoading(true);

        const { data } = await menApiAuthClient().get<Tag[]>(
          `${envConfig.API_URL}/v1/tags?kind=style`
        );
        setStyleTags(data);
      } catch (error) {
        throw new Error("Could not load Expertise Tags!");
      } finally {
        setIsLoading(false);
      }
    };
    getTags();
  }, [])

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
    <PageWrapper title="Book Your Coach" backTo="/home">
      <Box px='4em'>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon ml={2} color='gray.300' />}
          />
          <Input
            placeholder="search by name"
            _placeholder={{ color: '#B3B3B3', fontSize: '18px' }}
            onChange={(e) => handleChange(e.target.value)}
            flex={1}
            value={searchTerm}
          />
          <InputRightElement children={
            <CloseIcon
              w="14px"
              color='#B3B3B3'
              _hover={{ cursor: 'pointer' }}
              mr={6}
              onClick={handleReset}
            />
          } />
        </InputGroup>
      </Box>
      {!isLoading && (
        <Flex mt={8} gap={1} justify='center' wrap='wrap'>
          {styleTags.map((tag) => (
            <TagOption
              key={tag.id}
              tag={tag}
              toggleTag={toggleTag}
              selectedItems={selectedTags}
              setSelectedItems={setSelectedTags}
              isMin
            />
          ))}
        </Flex>
      )}
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
          pt={4}
          mx={8}
          justifyContent="space-around"
        >
          {!isLoading &&
            filteredCoaches.map((coach) => (
              <Box key={coach.id} padding={2}>
                <Coach coachInfo={coach} currentUser={currentUser} />
              </Box>
            ))}
        </Box>
      )}
      {!isLoading && filteredCoaches.length === 0 && (
        <Box p="32" textAlign="center" >
          <Text color='white'>
            Sorry, no coaches were found. Try a different search term or Coach Style.
          </Text>
        </Box>
      )}
    </PageWrapper>
  );
};

export default CoachSearch;
