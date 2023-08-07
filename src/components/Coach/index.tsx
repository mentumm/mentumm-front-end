import {
  Box,
  HStack,
  Icon,
  Stack,
  Tag,
  TagLabel,
  Text,
  Wrap,
} from "@chakra-ui/react";
import React from "react";
import { createUseStyles, DefaultTheme } from "react-jss";
import { CoachProps, Tag as TagType } from "../../types";
import { Card } from "./Card";
import { CardContent } from "./CardContent";
import { CardHeader } from "./CardHeader";
import { UserAvatar } from "./UserAvatar";
import { GoGlobe } from "react-icons/go";
import BookingInfo from "./BookingInfo";
import { Link } from "react-router-dom";
import { TagIcon } from "../TagIcon";
import { CoachType } from "../../types";

const useStyles = createUseStyles((theme: DefaultTheme) => ({
  root: {
    display: "flex",
  },
}));

export const generateCoachUrl = (coach: CoachType) => {
  const name = `${coach.first_name} ${coach.last_name}`;
  return name.replace(/\W|_/g, "-").toLowerCase() + `-${coach.id}`;
};

const generateCoachTags = (tags: TagType[], slug: string) => {
  let trimmedTags = [];

  if (tags.length > 2) {
    const remainingTags = tags.filter((tag: TagType) => tag.slug !== slug);

    // make sure to show the tag that the user searched for
    if (slug) {
      trimmedTags.push(tags.find((tag) => tag.slug === slug));
      remainingTags.slice(0, 2).map((tag) => trimmedTags.push(tag));
    } else {
      remainingTags.slice(0, 2).map((tag) => trimmedTags.push(tag));
    }
    // the extra +3 more tag
    trimmedTags.push({
      id: Math.floor(Math.random() * (2000 - 1000) + 1000),
      name: `+ ${tags.length - 2} more`,
    });
  } else {
    trimmedTags = tags;
  }
  return trimmedTags.map(
    (tag) =>
      !!tag && (
        <Tag key={tag.id} backgroundColor={tag.color} size="lg">
          <TagIcon icon={tag.icon} />
          <TagLabel>{tag.name}</TagLabel>
        </Tag>
      )
  );
};

const Coach: React.FC<CoachProps> = (props) => {
  const classes = useStyles();
  const { coachInfo, slug, booking, currentUser } = props;
  const { first_name, last_name, expertise, city, state, photo_url } = coachInfo;
  const getLocationText = (city?: string, state?: string) => {
    if (city && state) {
      return `${city}, ${state}`;
    } else if (city && !state) {
      return city;
    } else if (!city && state) {
      return state;
    }
    return null;
  }

  return (
    <Link to={`/coach/${generateCoachUrl(coachInfo)}`} className={classes.root}>
      <Box as="section" py="6">
        <Card
        >
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={{ base: "4", md: "10" }}
          >
            <UserAvatar
              name={`${first_name} ${last_name}`}
              src={
                photo_url
                  ? photo_url
                  : "https://mentumm.com/wp-content/uploads/2022/06/mentumm_profile.png"
              }
            />
            <CardContent>
              <CardHeader title={`${first_name} ${last_name}`} />
              <Stack mt="1">
                <HStack fontSize="md" mt={2}>
                  <Icon as={GoGlobe} color="gray.500" />
                  <Text>
                    {getLocationText(city, state)}
                  </Text>
                </HStack>
              </Stack>
              <Wrap shouldWrapChildren mt={4}>
                {expertise ? generateCoachTags(expertise, slug) : null}
              </Wrap>
            </CardContent>
            {!!booking && (
              <BookingInfo
                booking={booking}
                coach={coachInfo}
                currentUser={currentUser}
              />
            )}
          </Stack>
        </Card>
      </Box>
    </Link>
  );
};

export default Coach;
