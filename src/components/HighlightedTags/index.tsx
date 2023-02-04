// @ts-nocheck
import { Heading, Stack, Box } from "@chakra-ui/react";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { CoachSkills } from "../../types";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

library.add(fas, faLinkedin);

const tagColor = {
  Professional: "#5D83BD",
  Leadership: "#5DBDA6",
  Personal: "#BD5D5D",
};

const iconTag = {
  "career-planning": "rocket",
  collaboration: "people-carry",
  communication: "comment-dots",
  "conflict-management": "bomb",
  "content-development": "",
  "customer-care": "headset",
  "decision-making": "map-signs",
  "goal-setting": "bullseye",
  "interview-skills": "vote-yea",
  leadership: "chess-king",
  "life-coaching": "compass",
  "linkedin-marketing": ["fab", "linkedin"],
  management: "sitemap",
  meditation: "pray",
  mentoring: "hat-wizard",
  negotiation: "handshake",
  networking: "cocktail",
  nutrition: "carrot",
  "onboarding-training": "road",
  parenting: "baby",
  "personal-branding": "apple-alt",
  "personal-finance": "dollar-sign",
  "personal-fitness": "heartbeat",
  "presentation-public-speaking": "photo-video",
  "problem-solving": "puzzle-piece",
  "relationship-management": "hand-holding-heart",
  sales: "funnel-dollar",
  sleep: "cloud-moon",
  "strategic-planning": "route",
  "stress-management": "angry",
  "time-management-productivity": "clock",
  "work-life-balance": "balance-scale-left",
  "workplace-culture": "star-half-alt",
};

interface Iprops {
  tags: CoachSkills[];
  title: string;
}

const HighlightedTags: FC<Iprops> = ({ title, tags }) => {
  return (
    <>
      <Heading fontWeight="normal" fontSize={24} mt={12} mb={4}>
        {title}
      </Heading>
      <Stack direction="row" spacing={16} pb={6}>
        {tags.map((t) => {
          const { slug, name, id, category } = t;
          const Icon: React.LazyExoticComponent<FontAwesomeIconProps> = (
            props
          ) => (
            <FontAwesomeIcon icon={iconTag[slug] || "envelope"} {...props} />
          );
          return (
            <Link key={id} to={`/coaches/${slug}`} style={{ flex: 1 }}>
              <Stack
                mx="auto"
                minHeight="2xs"
                p={{ base: "6", md: "8" }}
                rounded={{ sm: "lg" }}
                shadow={{ md: "base" }}
                textAlign="center"
                justifyContent="center"
                gap={4}
                transition="box-shadow 0.1s ease-out 0s"
                _hover={{
                  shadow: "lg",
                }}
              >
                <Icon size="6x" color={tagColor[category]} />
                <Box>{name}</Box>
              </Stack>
            </Link>
          );
        })}
      </Stack>
    </>
  );
};

export default HighlightedTags;
