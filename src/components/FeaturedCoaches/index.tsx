import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { CoachType } from "../../types";
import Coach from "../Coach";

interface IProps {
  title: string;
  coaches: CoachType[];
}

const FeaturedCoaches: React.FC<IProps> = ({ title, coaches }) => {
  return (
    <>
      <Heading
        color='white'
        size='md'
        fontFamily='Montserrat'
        fontWeight='400'
        borderBottom='2px solid #2CBBBC'
        pb='0.5em'
        mt={8}
      >
        {title}
      </Heading>
      <Flex gap={4} overflow='scroll'>
        {coaches.map((c) => {
          return <Coach coachInfo={c} key={c.id} />;
        })}
      </Flex>
    </>
  );
};

export default FeaturedCoaches;
