import {
  Button,
  Heading,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { PopupModal } from "react-calendly";
import { createUseStyles, DefaultTheme } from "react-jss";
import { CoachType, CurrentUserProps } from "../../types";

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
  list: {
    marginLeft: "15px",
  },
}));

const CoachBio: React.FC<CurrentUserProps> = ({ currentUser }) => {
  const classes = useStyles();
  const [coach, setCoach] = useState<CoachType>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const windowUrl = window.location.toString().toLowerCase();
  const slug = windowUrl.substring(windowUrl.lastIndexOf("/") + 1);
  const coachId = slug.split("-");

  useEffect(() => {
    const loadCoach = async () => {
      try {
        const singleCoach = await axios.get(`${NODE_API}/v1/coaches`, {
          params: {
            id: coachId[coachId.length - 1],
          },
        });

        setCoach(singleCoach.data[0]);
      } catch (error) {}
    };

    if (!coach) {
      loadCoach();
    }
  }, [coach, coachId]);

  return (
    <div className={classes.root}>
      <div className={classes.column}>
        <div className={classes.heading}>
          <Stack spacing="6" style={{ marginBottom: "100px" }} />
        </div>
        <div className={classes.columnRow}>
          <div className={classes.row}>
            <div className={classes.box}>
              {coach ? (
                <img
                  src={coach.photo_url}
                  className={classes.image}
                  alt="Coach Profile"
                />
              ) : null}
            </div>
            <div className={classes.box}>
              <Heading as="h1" size="2xl" className={classes.margin}>
                {coach ? coach.name : null}
              </Heading>
              <Text fontSize="large" className={classes.margin}>
                {coach ? coach.bio : null}
              </Text>
              <Heading as="h5" size="md">
                Skills
              </Heading>

              <div className={classes.list}>
                <UnorderedList spacing={3}>
                  {coach && coach.skills.length
                    ? coach.skills.map((skill) => (
                        <ListItem key={skill.id}>
                          {/* <ListIcon /> */}
                          {skill.name}
                        </ListItem>
                      ))
                    : null}
                </UnorderedList>
                <ul className={classes.margin}></ul>
              </div>
              <Heading as="h5" size="md">
                Location
              </Heading>
              <div className={classes.margin}>
                {coach ? coach.location : null}
              </div>
              <Stack spacing="6">
                <Button
                  colorScheme="blue"
                  variant="solid"
                  onClick={() => setIsOpen(true)}
                >
                  <PopupModal
                    // url="https://calendly.com/ryan-vaznis/30min"
                    url={coach ? coach.booking_link : null}
                    onModalClose={() => setIsOpen(false)}
                    open={isOpen}
                    rootElement={document.getElementById("root")}
                  />
                  Book Time Slot
                </Button>
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachBio;
