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
import React, { useEffect, useRef, useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import Coach from "../../components/Coach";
import { menApiAuthClient } from "../../clients/mentumm";
import axios from "axios";

export const CoachSearchV2 = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [coaches, setCoaches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
