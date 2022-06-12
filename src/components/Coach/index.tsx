import { Box, HStack, Icon, Stack, Tag, Text, Wrap } from "@chakra-ui/react";
import React from "react";
import { createUseStyles, DefaultTheme } from "react-jss";
import { CoachProps } from "../../types";
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
  const { name, skills, location } = props.coachInfo;
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
              src="https://i.imgur.com/bojxiui.jpg"
              isVerified
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
                {skills
                  ? skills.map((tag) => <Tag key={tag.id}>{tag.name}</Tag>)
                  : null}
              </Wrap>
            </CardContent>
          </Stack>
        </Card>
      </Box>
    </div>
  );
};

export default Coach;
