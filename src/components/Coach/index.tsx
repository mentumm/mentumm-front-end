import {
  Box,
  Flex,
  Text,
  Wrap,
  Card,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import React from "react";
import { CoachProps, Tag as TagType } from "../../types";
import { CoachName } from "./CoachName";
import BookingInfo from "./BookingInfo";
import { Link } from "react-router-dom";
import { CoachType } from "../../types";

export const generateCoachUrl = (coach: CoachType) => {
  const name = `${coach.first_name} ${coach.last_name}`;
  return name.replace(/\W|_/g, "-").toLowerCase() + `-${coach.id}`;
};

const generateCoachTags = (tags: TagType[], slug: string, kind: string) => {
  let trimmedTags: TagType[] = [];

  if (tags.length > 2) {
    const remainingTags = tags.filter(tag => tag.slug !== slug);

    if (slug) {
      const matchingTag = tags.find(tag => tag.slug === slug);
      if (matchingTag) {
        trimmedTags.push(matchingTag);
      }
      trimmedTags = [...trimmedTags, ...remainingTags.slice(0, 2)];
    } else {
      trimmedTags = remainingTags.slice(0, 2);
    }

    // the extra +3 more tag
    const moreTag: Partial<TagType> = {
      id: Math.floor(Math.random() * (2000 - 1000) + 1000),
      name: `+ ${tags.length - 2} more`
    };

    trimmedTags.push(moreTag as TagType);
  } else {
    trimmedTags = tags;
  }

  return trimmedTags.map(tag => {
    const isStyle = kind === 'style';
    const tagName = isStyle ? tag.name.toUpperCase() : tag.name;
    const tagFontSize = isStyle ? 'sm' : 'xs';
    const tagFontColor = isStyle ? 'white' : 'black';

    return (
      <Text
        fontSize={tagFontSize}
        key={tag.id}
        color={tagFontColor}
      >
        {tagName}
      </Text>
    );
  });
};


const Coach: React.FC<CoachProps> = (props) => {
  const { coachInfo, slug, booking, currentUser } = props;
  const { first_name, last_name, expertise, styles, photo_url } = coachInfo;

  const coachImage = photo_url
    ? photo_url
    : "https://mentumm.com/wp-content/uploads/2022/06/mentumm_profile.png";

  return (
    <Flex as={Link} to={`/coach/${generateCoachUrl(coachInfo)}`}>
      <Card
        bgImage={`linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(${coachImage})`}
        backgroundSize="100%"
        minWidth="23.5em"
        maxWidth="23.5em"
        rounded="sm"
        shadow="base"
        h="12.5em"
        minH="12.5em"
      >
        <CardBody
          h="10em"
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
          h="2.625em"
          minH="2.625em"
          rounded="sm"
        >
          <Wrap shouldWrapChildren mb={4}>
            {expertise && generateCoachTags(expertise, slug, 'expertise')}
          </Wrap>
        </CardFooter>
        {/* {!!booking && (
          <BookingInfo
            booking={booking}
            coach={coachInfo}
            currentUser={currentUser}
          />
        )} */}
      </Card>
    </Flex>
  );
};

export default Coach;
