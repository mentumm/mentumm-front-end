import { Button } from "@chakra-ui/react";
import React from "react";
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";

const useStyles = createUseStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  buttonRow: {
    display: "flex",
    flexDirection: "row",
  },
});

const ActionPlanPrompt = ({ actionPlan }): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.buttonRow}>
        {!actionPlan ? (
          <Button as={Link} to="/action-plan" size="lg">
            START YOUR PLAN
          </Button>
        ) : (
          <Button as={Link} to="/action-plan" variant="outline" size="lg">
            REVIEW YOUR PLAN
          </Button>
        )}
      </div>
    </div>
  );
};

export default ActionPlanPrompt;
