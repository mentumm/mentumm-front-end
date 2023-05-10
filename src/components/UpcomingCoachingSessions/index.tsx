import { Box, Heading } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { menApiAuthClient } from "../../clients/mentumm";
import { CoachBooking, CoachType } from "../../types";
import Coach from "../Coach";
import { createUseStyles } from "react-jss";

interface Iprops {
  id: number;
}
type TChoachBooking = CoachBooking & { coach: CoachType };

const useStyles = createUseStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  buttonRow: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
});

const UpcomingCoachingSessions: FC<Iprops> = ({ id }) => {
  const classes = useStyles();
  const [upcoming, setUpcoming] = useState<TChoachBooking[]>([]);

  useEffect(() => {
    async function loadUpcoming() {
      const u = await menApiAuthClient().get("/user/upcoming", {
        params: { id },
      });

      setUpcoming(u.data);
    }

    loadUpcoming();
  }, [id]);

  return (
    <div className={classes.root}>
      {upcoming.length ? (
        <>
          <Heading fontWeight="normal" fontSize={24} mt={12} mb={2}>
            Upcoming Coaching Sessions
          </Heading>
          <Box display="flex" flexFlow="row wrap" gap={4}>
            {upcoming.map((u) => {
              const { coach, ...booking } = u;
              return (
                <Coach key={booking.id} coachInfo={coach} booking={booking} />
              );
            })}
          </Box>
        </>
      ) : null}
    </div>
  );
};

export default UpcomingCoachingSessions;
