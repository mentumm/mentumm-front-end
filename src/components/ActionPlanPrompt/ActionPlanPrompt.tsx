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
      <Heading fontWeight="normal" fontSize={24} mt={12}>
        Monthly Action Plan
      </Heading>
      <div className={classes.buttonRow}>
        {!actionPlan ? (
          <Button
            as={Link}
            to="/action-plan"
            background="#2cbdbe"
            color="white"
            size="lg"
          >
            START
          </Button>
        ) : (
          <Button
            as={Link}
            to="/action-plan"
            variant="outline"
            color="#2cbdbe"
            borderColor="#2cbdbe"
            size="lg"
          >
            Review
          </Button>
        )}
      </div>
    </div>
  );
};

export default ActionPlanPrompt;
