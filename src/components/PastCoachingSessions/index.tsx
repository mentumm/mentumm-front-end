import { Box, Heading } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { menApiAuthClient } from "../../clients/mentumm";
import { CoachBooking, CoachType, CurrentUser } from "../../types";
import Coach from "../Coach";

interface Iprops {
  currentUser: CurrentUser;
}
type TChoachBooking = CoachBooking & { coach: CoachType };

const PastCoachingSessions: FC<Iprops> = ({ currentUser }) => {
  const [past, setPast] = useState<TChoachBooking[]>([]);

  useEffect(() => {
    async function loadPast() {
      const u = await menApiAuthClient().get("/user/past", {
        params: { id: currentUser.id },
      });

      setPast(u.data);
    }

    loadPast();
  }, [currentUser.id]);

  if (!past.length) {
    return null;
  }

  return (
    <>
      <Heading fontWeight="normal" fontSize={24} mt={12}>
        Past Coaching Sessions
      </Heading>
      <Box display="flex" flexFlow="row wrap" gap={4}>
        {past.map((b) => {
          const { coach, ...booking } = b;
          return (
            <Coach
              key={booking.id}
              coachInfo={coach}
              booking={booking}
              currentUser={currentUser}
            />
          );
        })}
      </Box>
    </>
  );
};

export default PastCoachingSessions;
