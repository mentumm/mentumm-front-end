import { Box, HStack, Icon, Stack, Tag, Text, Wrap } from "@chakra-ui/react";
import React from "react";
import { createUseStyles, DefaultTheme } from "react-jss";
import { CoachProps, CoachSkills } from "../../types";
import { Card } from "./Card";
import { CardContent } from "./CardContent";
import { CardHeader } from "./CardHeader";
import { UserAvatar } from "./UserAvatar";
import { GoGlobe } from "react-icons/go";

const useStyles = createUseStyles((theme: DefaultTheme) => ({
  root: {
    display: "flex",
  },
  coach: {
    display: "flex",
  },
  coachCard: {
    width: "35em",
  },
  coachImage: {
    maxWidth: "100%",
    objectFit: "cover",
    marginBottom: "16px",
  },
  coachInfo: {
    marginTop: "auto",
  },
  coachTags: {
    display: "flex",
    flexDirection: "row",
    gap: "6px",
    marginTop: "6px",
  },
}));

const Coach: React.FC<CoachProps> = (props) => {
  const classes = useStyles();
  const { name, skills, location, photo_url } = props.coachInfo;

  const generateCoachTags = (tags: CoachSkills[]) => {
    if (tags.length > 4) {
      let trimmedTags = [];

      const remainingTags = tags.filter(
        (tag: CoachSkills) => tag.slug !== props.slug
      );

      // make sure to show the tag that the user searched for
      trimmedTags.push(tags.find((tag) => tag.slug === props.slug));
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
                {skills ? generateCoachTags(skills) : null}
              </Wrap>
            </CardContent>
          </Stack>
        </Card>
      </Box>
    </div>
  );
};

export default Coach;
