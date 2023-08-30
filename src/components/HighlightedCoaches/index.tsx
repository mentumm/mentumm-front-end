import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { CoachType } from "../../types";
import Coach from "../Coach";

interface IProps {
  coaches: CoachType[];
}

const HighlightedCoaches: React.FC<IProps> = ({ coaches }) => {
  return (
    <>
      <Box display="flex" flexFlow="row wrap" gap={4}>
        {coaches.map((c) => {
          return <Coach coachInfo={c} key={c.id} />;
        })}
      </Box>
    </>
  );
};

export default HighlightedCoaches;
