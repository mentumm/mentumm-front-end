import { Box, Divider, Heading, Text, Flex, VStack } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { menApiAuthClient } from "../../clients/mentumm";
import { CoachBooking, CoachType } from "../../types";

interface Iprops {
  id: number;
}
type TChoachBooking = CoachBooking & { coach: CoachType };

const UpcomingCoachingSessions: FC<Iprops> = ({ id }) => {
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

  console.log(upcoming)

  return (
    <>
      <Heading fontWeight="normal" size='md' mt={12} mb={2} color='white'>
        Upcoming Coaching Sessions
      </Heading>
      {
        upcoming.length > 0 && (
          <Box>
            <Box display="flex" flexFlow="row wrap" gap={4}>
              {upcoming.map((u) => {
                const { coach, ...booking } = u;
                const startTime = new Date(u.event_start_time).toLocaleTimeString('en-GB');
                const endTime = new Date(u.event_end_time).toLocaleTimeString('en-GB');

                return (
                  <Box bgColor='red' borderRadius='1em' w='100%'>
                    <Heading size='md' color='#3067B0'>
                      Coaching Session
                    </Heading>
                    <Divider />
                    <Text>
                      {`With ${u.coach.first_name} ${u.coach.last_name}`}
                    </Text>
                    <Text>
                      {`Time ${startTime} - ${endTime}`}
                    </Text>
                  </Box>
                );
              })}
            </Box>
          </Box>
        )
      }
    </>
  );
};

export default UpcomingCoachingSessions;
