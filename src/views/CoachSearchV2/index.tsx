import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import { debounce } from "lodash";
import Coach from "../../components/Coach";
import { menApiAuthClient } from "../../clients/mentumm";

export const CoachSearchV2 = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [coaches, setCoaches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  const handleSearch = debounce(async () => {
    try {
      setIsLoading(true);
      const response = await menApiAuthClient().get(
        `coaches?search=${searchTerm}`
      );

      if (!response || !response.data) {
        throw new Error("Could not get response from search API");
      }
      setCoaches(response.data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  }, 250);

  const handleChange = async (value: string) => {
    if (value === "") {
      await handleReset();
    }
    // dont search until we have three characters to reduce network requests
    if (value.length < 2) {
      return;
    }
    setSearchTerm(value);
    handleSearch();
  };

  const getCoaches = async () => menApiAuthClient().get(`/coaches`);

  const handleReset = async () => {
    try {
      inputRef.current.value = "";
      const coaches = await getCoaches();
      setCoaches(coaches.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchInitialCoaches = async () => {
      try {
        const coaches = await getCoaches();
        if (!coaches || !coaches.data) {
          throw new Error("Could not get Coaches from API");
        }
        setCoaches(coaches.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchInitialCoaches();
  }, []);

  return (
    <PageWrapper title="All mentumm Coaches" backTo="/home">
      <Box display="flex" flexDir="row" paddingX={4}>
        <InputGroup>
          <InputLeftAddon children={<SearchIcon />} />
          <Input
            ref={inputRef}
            placeholder="Search by coach name..."
            onChange={(e) => handleChange(e.target.value)}
            flex={1}
            mr="4"
          />
        </InputGroup>
        <Button
          disabled={inputRef?.current && inputRef?.current.value.length < 2}
          onClick={handleReset}
          leftIcon={<CloseIcon />}
          bgColor="#2cbdbe"
        >
          Reset
        </Button>
      </Box>
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
      {!coaches ||
        (coaches.length === 0 && (
          <Box p="32" textAlign="center">
            <Text>
              Sorry, no coaches were found. Try a different search term.
            </Text>
          </Box>
        ))}
    </PageWrapper>
  );
};
