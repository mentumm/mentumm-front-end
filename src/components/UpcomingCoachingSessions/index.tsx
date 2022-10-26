import { Box, Heading } from '@chakra-ui/react';
import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import envConfig from '../../envConfig';
import { CoachBooking, CoachType } from '../../types';
import Coach from '../Coach';

interface Iprops {
  id: number;
}
type TChoachBooking = CoachBooking & {coach: CoachType};

const UpcomingCoachingSessions: FC<Iprops> = ({id}) => {
  const [upcoming, setUpcoming] = useState<TChoachBooking[]>([]);

  useEffect(() => {
    async function loadUpcoming() {
      const u = await axios.get(`${envConfig.API_URL}/v1/user/upcoming`, {params: {id}});
      setUpcoming(u.data);
    }

    loadUpcoming();
  }, [id]);

  if(!upcoming.length){
    return null;
  }

  return (
    <>
      <Heading fontWeight="normal" fontSize={24} mt={12}>Upcoming Coaching Sessions</Heading>
      <Box
        display="flex"
        flexFlow="row wrap"
        gap={4}
      >
      {upcoming.map(u => {
        const {coach, ...booking} = u;
        return <Coach key={booking.id} coachInfo={coach} booking={booking} />
      })}
      </Box>
    </>
  )
}

export default UpcomingCoachingSessions;