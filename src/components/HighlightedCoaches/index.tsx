import { Box, Heading } from '@chakra-ui/react';
import React from 'react';
import { CoachType } from '../../types';
import Coach from '../Coach';
import { Link as RouteLink} from "react-router-dom";
import { generateCoachUrl } from '../../views/CoachResults';

interface IProps {
  title: string;
  coaches: CoachType[];
}

const HighlightedCoaches: React.FC<IProps> = ({title, coaches}) => {
  return (
    <>
      <Heading fontWeight="normal" fontSize={24} mt={12} >{title}</Heading>
      <Box
        display="flex"
        flexFlow="row wrap"
        gap={4}
      >
        {coaches.map(c => (
          <RouteLink to={`/coach/${generateCoachUrl(c)}`} key={c.id}>
            <Coach coachInfo={c} />
          </RouteLink>
        ))}
      </Box>
    </>
  );
}

export default HighlightedCoaches;