import React from "react";
import { createUseStyles, DefaultTheme } from "react-jss";
import { Link } from "react-router-dom";
import { UserLoginProps } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import logo from "./m_logo.png";
import NavMenu from "./NavMenu";

const useStyles = createUseStyles((theme: DefaultTheme) => ({
  root: {
    position: "sticky",
    display: "flex",
    backgroundColor: "#2cbdbe",
    flexFlow: "row nowrap",
    width: "100%",
    height: "75px",
    padding: "0 25px",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: "65px",
    "&:hover": {
      opacity: 0.8,
    },
  },
  rightContent: {
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
    height: "100%",
  },
  coaches: {
    height: "70%",
    color: "white",
    margin: "0 15px",
    "& > a": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    },
    "& *": {
      margin: "0 2px",
    },
    "&:hover": {
      opacity: 0.8,
    },
  },
  logout: {
    color: "white",
  },
}));

const NavBar: React.FC<UserLoginProps> = (props) => {
  const classes = useStyles();
  const { currentUser, setCurrentUser } = props;

  return (
    <div className={classes.root}>
      <div className={classes.logo}>
        <Link to="/">
          <img src={logo} alt="Momentum" role="banner" />
        </Link>
      </div>
      <div className={classes.rightContent}>
        <div className={classes.coaches}>
          <Link to="/search">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <span>Coaches</span>
          </Link>
        </div>
        <NavMenu currentUser={currentUser} setCurrentUser={setCurrentUser} />
      </div>
    </div>
  );
};

export default NavBar;
