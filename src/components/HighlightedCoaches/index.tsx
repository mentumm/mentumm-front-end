import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { CoachType } from "../../types";
import Coach from "../Coach";

interface IProps {
  title: string;
  coaches: CoachType[];
}

const HighlightedCoaches: React.FC<IProps> = ({ title, coaches }) => {
  return (
    <>
      <Heading fontWeight="normal" fontSize={24} mt={12}>
        {title}
      </Heading>
      <Box display="flex" flexFlow="row wrap" gap={4}>
        {coaches.map((c) => {
          return !c.is_test && <Coach coachInfo={c} key={c.id} />;
        })}
      </Box>
    </>
  );
};

export default HighlightedCoaches;
