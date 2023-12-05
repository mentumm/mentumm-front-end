import React from "react";
import { createUseStyles } from "react-jss";
import { AppContainerProps } from "../../types";

const useStyles = createUseStyles({
  root: {
    display: "flex",
    position: "relative",
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    minHeight: "100vh",
    padding: 0,
    margin: 0,
    // paddingBottom: "125px",
  },
});

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.root}>{children}</div>;
};

export default AppContainer;
