import React from "react";
import { createUseStyles } from "react-jss";
import { CurrentUser } from "../../types";

const useStyles = createUseStyles({
  root: {},
});

type ActionPlanProps = {
  currentUser: CurrentUser;
};

const ActionPlan = ({ currentUser }: ActionPlanProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>ActionPlan</div>
    </div>
  );
};

export default ActionPlan;
