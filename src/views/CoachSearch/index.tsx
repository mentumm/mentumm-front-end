import { Box, Heading, ListItem, Stack, UnorderedList } from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";
import { mixpanelEvent, mixpanelIdentify } from "../../helpers";
import { CurrentUserProps, CoachSkills } from "../../types";
import BookingConfirmation from "../BookingConfirmation";
import { useGetTags } from "../../helpers/tagHelpers";
import { menApiAuthClient } from "../../clients/mentumm";

const CATEGORIES = ["Professional", "Leadership", "Personal"];

const CoachSearch: React.FC<CurrentUserProps> = ({ currentUser }) => {
  const coachTags = useGetTags();
  const [coachBooked, setCoachBooked] = useState<boolean>(null);
  const [searchParams] = useSearchParams();

  const selectTag = (t: CoachSkills) => {
    mixpanelEvent("Searched For Tag", {
      "User ID": currentUser ? currentUser.id : null,
      "Tag Slug": t.slug,
      "Tag Name": t.name,
      "Tag ID": t.id,
    });
  };

  useEffect(() => {
    if (currentUser) {
      mixpanelIdentify(String(currentUser.id));
    }
  }, [currentUser]);

  useEffect(() => {
    // these are for the calendly redirect url params
    const event_type_uuid = searchParams.get("event_type_uuid");
    const event_type_name = searchParams.get("event_type_name");
    const event_start_time = searchParams.get("event_start_time");
    const event_end_time = searchParams.get("event_end_time");
    const invitee_uuid = searchParams.get("invitee_uuid");
    const invitee_full_name = searchParams.get("invitee_full_name");
    const invitee_email = searchParams.get("invitee_email");
    const utmSource = searchParams.get("utm_source");

    const bookCoach = async () => {
      try {
        const bookedCoach = await menApiAuthClient().post("/user/book-coach", {
          user_id: currentUser.id,
          coach_id: utmSource,
          event_end_time,
          event_start_time,
          event_type_name,
          event_type_uuid,
          invitee_email,
          invitee_full_name,
          invitee_uuid,
        });

        if (bookedCoach) {
          setCoachBooked(true);
        }
      } catch (error) {
        throw new Error("Could not save booking!");
      }
    };

    if (!coachBooked && invitee_email && currentUser?.id) {
      bookCoach();
    } else if (!invitee_email) {
      setCoachBooked(false);
    }
  }, [searchParams, coachBooked, currentUser]);

  if (coachBooked) {
    return <BookingConfirmation currentUser={currentUser} />;
  }

  return (
    <PageWrapper title="Pick a Topic" backTo="/home">
      <Stack direction="row" gap="75px" pl={2}>
        {CATEGORIES.map((c) => (
          <Box key={c} minW={275}>
            <Heading as="h2" size="md" mb={3}>
              {c}
            </Heading>
            <UnorderedList>
              {!!coachTags &&
                coachTags
                  .filter((t) => t.category === c)
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((t) => (
                    <Link
                      key={t.id}
                      to={`/coaches/${t.slug}`}
                      onClick={() => selectTag(t)}
                    >
                      <ListItem mb={2} _hover={{ color: "#5DBABD" }}>
                        {t.name}
                      </ListItem>
                    </Link>
                  ))}
            </UnorderedList>
          </Box>
        ))}
      </Stack>
    </PageWrapper>
  );
};

export default CoachSearch;
