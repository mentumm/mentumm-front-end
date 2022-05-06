import React from "react";
import { createUseStyles } from "react-jss";
import { AppContainerProps } from "../../types";

const useStyles = createUseStyles({
  root: {
    display: "flex",
    position: "relative",
    width: "100%",
    minHeight: `100vh`,
  },
});

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.root}>{children}</div>;
};

export default AppContainer;
