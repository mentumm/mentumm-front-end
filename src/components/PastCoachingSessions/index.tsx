import { Box, Heading } from "@chakra-ui/react";
import React, { FC } from "react";
import { CoachBooking, CoachType, CurrentUser } from "../../types";
import Coach from "../Coach";

type TCoachBooking = CoachBooking & { coach: CoachType };
interface Iprops {
  currentUser: CurrentUser;
  past: TCoachBooking[];
}

const PastCoachingSessions: FC<Iprops> = ({ currentUser, past }) => {

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
