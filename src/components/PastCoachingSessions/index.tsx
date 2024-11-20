import { Box, Flex, Heading, Divider, } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { menApiAuthClient } from "../../clients/mentumm";
import { CoachBooking, CoachType, CurrentUser } from "../../types";
import { CoachingSessionCard } from "../CoachingSessionCard";

interface Iprops {
  currentUser: CurrentUser;
}
type TChoachBooking = CoachBooking & { coach: CoachType };

const PastCoachingSessions = ({
  currentUser
}: Iprops) => {
  const [past, setPast] = useState<TChoachBooking[]>([]);

  useEffect(() => {
    async function loadPast() {
      const u = await menApiAuthClient().get("/user/past", {
        params: { id: currentUser?.id },
      });

      setPast(u.data);
    }

    loadPast();
  }, [currentUser?.id]);

  if (!past.length) {
    return null;
  }

  return (
    <>
      <Box mb='0.5em' px='1em'>
        <Heading fontWeight="normal" size="sm" mt={12} mb={2} color="white">
          Previous Coaching Sessions
        </Heading>
        <Divider borderBottomColor='#2CBBBC' />
      </Box>
      {past.length > 0 && (
        <Box>
          <Flex display="flex" flexDirection='column' gap={4}>
            {past.map((u) => {
              return (
                <CoachingSessionCard session={u} isPrevious={true} key={u.event_type_uuid} />
              );
            })}
          </Flex>
        </Box>
      )}
    </>
  );
};

export default PastCoachingSessions;
