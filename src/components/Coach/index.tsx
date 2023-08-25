import {
  Box,
  Flex,
  Wrap,
  Card,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import React from "react";
import { CoachProps } from "../../types";
import { CoachName } from "./CoachName";
import { Link } from "react-router-dom";
import { generateCoachUrl, generateCoachTags } from "./utils";

const Coach: React.FC<CoachProps> = (props) => {
  const { coachInfo, slug, currentUser } = props;
  const { first_name, last_name, expertise, styles, photo_url } = coachInfo;

  const coachImage = photo_url
    ? photo_url
    : "https://mentumm.com/wp-content/uploads/2022/06/mentumm_profile.png";

  return (
    <Flex as={Link} to={`/coach/${generateCoachUrl(coachInfo)}`}>
      <Card
        bgImage={`linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(${coachImage})`}
        backgroundSize="100%"
        w="23.5em"
        rounded="sm"
        shadow="base"
        h="12.5em"
      >
        <CardBody
          minH="10em"
        >
          <Box>
            <CoachName title={`${first_name} ${last_name}`} />
          </Box>
          <Box>
            {<Wrap shouldWrapChildren>
              {styles && generateCoachTags(styles, slug, 'style')}
            </Wrap>}
          </Box>
        </CardBody>
        <CardFooter
          bgColor="brand.400"
          pb={0}
          pt={1}
          minH="2.625em"
          rounded="sm"
        >
          <Wrap shouldWrapChildren mb={4}>
            {expertise && generateCoachTags(expertise, slug, 'expertise')}
          </Wrap>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default Coach;
