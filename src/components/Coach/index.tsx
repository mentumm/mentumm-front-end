import { Heading } from "@chakra-ui/react";
import React from "react";
import { createUseStyles, DefaultTheme } from "react-jss";
import { CoachProps } from "../../types";

const useStyles = createUseStyles((theme: DefaultTheme) => ({
  root: {
    display: "flex",
  },
  coach: {
    display: "flex",
  },
  coachCard: {
    flex: "1 1 auto",
    margin: "0.3em",
    width: "30em",
    height: "26em",
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
  const { name, skills } = props.coachInfo;
  return (
    <div className={classes.root}>
      <div className={classes.coach}>
        <div className={classes.coachCard}>
          <div className={classes.coachImage}>
            <img
              src="https://i.imgur.com/bojxiui.jpg"
              alt="Jim Staring"
              className={classes.coachImage}
            />
          </div>
          <div className={classes.coachInfo}>
            <Heading as="h4" size="lg">
              {name ? name : null}
            </Heading>
            <div className={classes.coachTags}>
              {skills
                ? skills.map((tag, index) => (
                    <Heading as="h6" size="sm" key={index}>
                      {tag.name}
                    </Heading>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coach;
