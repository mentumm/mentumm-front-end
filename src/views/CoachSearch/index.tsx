import { Heading, Select, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { createUseStyles, DefaultTheme } from "react-jss";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { CurrentUserProps } from "../../types";
import design from "./design.png";

const NODE_API = process.env.REACT_APP_NODE_API;

const useStyles = createUseStyles((theme: DefaultTheme) => ({
  root: {
    display: "flex",
    width: "100%",
  },
  heading: {
    margin: "30px 30px",
  },
  column: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  columnRow: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    width: "75%",
    justifyContent: "center",
    alignItems: "center",
    gap: "24px",
  },
  box: {
    position: "relative",
    width: "50%",
    padding: "12px",
  },
  image: {
    position: "relative",
    width: "75%",
    margin: "0 auto",
  },
  margin: {
    marginBottom: "16px",
  },
  capitalize: {
    textTransform: "capitalize",
  },
}));

const CoachSearch: React.FC<CurrentUserProps> = ({ currentUser }) => {
  const classes = useStyles();
  const [coachTags, setCoachTags] = useState(null);
  const [coachBooked, setCoachBooked] = useState<boolean>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const selectTag = (e) => {
    navigate(`/coaches/${e.target.value}`);
  };

  const loadTags = async () => {
    // for some reason this fails when redirected from calendly, not sure why
    // doesn't impact anything but a message in console
    try {
      const tags = await axios.get(`${NODE_API}/v1/tags`);

      if (tags) {
        setCoachTags(tags.data);
      }
    } catch (error) {
      throw new Error("Could not load Coach Tags!");
    }
  };

  useEffect(() => {
    if (!coachTags) {
      loadTags();
    }
  }, [coachTags]);

  useEffect(() => {
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
        const booking = await axios.post(`${NODE_API}/v1/user/book-coach`, {
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

        if (booking) {
          setCoachBooked(true);
        }
      } catch (error) {
        throw new Error("Could not load Coach Tags!");
      }
    };

    if (!coachBooked && invitee_email) {
      bookCoach();
    }
  }, [searchParams, coachBooked, currentUser]);

  return (
    <div className={classes.root}>
      <div className={classes.column}>
        <div className={classes.heading}>
          <Stack spacing="6" style={{ marginBottom: "100px" }}>
            <Heading as="h2" size="xl" className={classes.capitalize}>
              {`Welcome Back ${currentUser ? currentUser.name : null}`}
            </Heading>
          </Stack>
        </div>
        <div className={classes.columnRow}>
          <div className={classes.row}>
            <div className={classes.box}>
              <Heading as="h1" size="2xl" className={classes.margin}>
                Find your path foward
              </Heading>
              <Text fontSize="large" className={classes.margin}>
                Book an on-demand coaching session each month with a certified
                executive coach. These sessions are completely confidential and
                give you the ability to get private feedback, mentorship, and
                perspective.
              </Text>
              <Select
                placeholder="Choose a topic"
                onChange={(e) => selectTag(e)}
              >
                {coachTags && coachTags.length
                  ? coachTags.map((tag) => (
                      <option value={tag.slug} key={tag.id}>
                        {tag.name}
                      </option>
                    ))
                  : null}
              </Select>
            </div>
            <div className={classes.box}>
              <img src={design} className={classes.image} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachSearch;
