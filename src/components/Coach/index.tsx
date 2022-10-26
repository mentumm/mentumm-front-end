import { Box, HStack, Icon, Stack, Tag, Text, Wrap } from "@chakra-ui/react";
import React from "react";
import { createUseStyles, DefaultTheme } from "react-jss";
import { CoachProps, CoachSkills } from "../../types";
import { Card } from "./Card";
import { CardContent } from "./CardContent";
import { CardHeader } from "./CardHeader";
import { UserAvatar } from "./UserAvatar";
import { GoGlobe } from "react-icons/go";
import BookingInfo from "./BookingInfo";

const useStyles = createUseStyles((theme: DefaultTheme) => ({
  root: {
    display: "flex",
  },
}));

const generateCoachTags = (tags: CoachSkills[], slug) => {
  if (tags.length > 4) {
    let trimmedTags = [];

    const remainingTags = tags.filter(
      (tag: CoachSkills) => tag.slug !== slug
    );

    // make sure to show the tag that the user searched for
    trimmedTags.push(tags.find((tag) => tag.slug === slug));
    remainingTags.slice(0, 2).map((tag) => trimmedTags.push(tag));
    // the extra +3 more tag
    trimmedTags.push({
      id: Math.floor(Math.random() * (2000 - 1000) + 1000),
      name: `+ ${tags.length - 4} more`,
    });

    return trimmedTags.map((tag) => <Tag key={tag.id}>{tag.name}</Tag>);
  } else {
    return tags.map((tag) => <Tag key={tag.id}>{tag.name}</Tag>);
  }
};

const Coach: React.FC<CoachProps> = (props) => {
  const classes = useStyles();
  const { 
    coachInfo,
    slug,
    booking,
    currentUser,
  } = props;
  const { name, skills, location, photo_url } = coachInfo;

  return (
    <div className={classes.root}>
      <Box as="section" py="6">
        <Card>
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={{ base: "4", md: "10" }}
          >
            <UserAvatar
              name={name ? name : null}
              src={
                photo_url
                  ? photo_url
                  : "https://mentumm.com/wp-content/uploads/2022/06/mentumm_profile.png"
              }
            />
            <CardContent>
              <CardHeader title={name ? name : null} />
              <Stack mt="1">
                <HStack fontSize="sm">
                  <Icon as={GoGlobe} color="gray.500" />
                  <Text>{location ? location : null}</Text>
                </HStack>
              </Stack>
              <Text fontWeight="semibold" mt="8" mb="2">
                Expertise
              </Text>
              <Wrap shouldWrapChildren>
                {skills ? generateCoachTags(skills, slug) : null}
              </Wrap>
            </CardContent>
            {!!booking && <BookingInfo booking={booking} coach={coachInfo} currentUser={currentUser} />}
          </Stack>
        </Card>
      </Box>
    </div>
  );
};

export default Coach;
