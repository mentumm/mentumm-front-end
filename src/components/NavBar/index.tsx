import React from "react";
import { createUseStyles, DefaultTheme } from "react-jss";
import { Link } from "react-router-dom";
import logo from "./m_logo.png";

const useStyles = createUseStyles((theme: DefaultTheme) => ({
  root: {
    position: "sticky",
    display: "flex",
    backgroundColor: "#2cbdbe",
    flexFlow: "row nowrap",
    width: "100%",
    height: "75px",
    justifyContent: "center",
    padding: "0 25px",
  },
  container: {
    display: "flex",
    position: "relative",
    flexFlow: "row nowrap",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  logo: {
    position: "relative",
    "& img": {
      position: "relative",
      width: "10%",
      height: "auto",
    },
  },
}));

const NavBar: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.logo}>
          <Link to="/">
            <img src={logo} alt="Momentum" role="banner" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
