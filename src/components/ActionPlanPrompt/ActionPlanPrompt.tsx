import { Button, Heading } from "@chakra-ui/react";
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
    marginTop: 10,
  },
});

const ActionPlanPrompt = ({ actionPlan }): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Heading fontWeight="normal" fontSize={24} mt={12} mb={4}>
        Monthly Action Plan
      </Heading>
      <div className={classes.buttonRow}>
        {!actionPlan ? (
          <Button as={Link} to="/action-plan" size="lg">
            START
          </Button>
        ) : (
          <Button as={Link} to="/action-plan" variant="outline" size="lg">
            REVIEW
          </Button>
        )}
      </div>
    </div>
  );
};

export default ActionPlanPrompt;
