import React from "react";
import { useCookies } from "react-cookie";
import { createUseStyles, DefaultTheme } from "react-jss";
import { Link } from "react-router-dom";
import { UserLoginProps } from "../../types";
import logo from "./m_logo.png";

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
  container: {
    display: "flex",
    position: "relative",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
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
  logout: {
    color: "white",
  },
}));

const NavBar: React.FC<UserLoginProps> = (props) => {
  const classes = useStyles();
  // const [cookie, setCookie, removeCookie] = useCookies(["growth_10"]);
  // destructured it this way so that i don't have tslint crying at me
  const removeCookie = useCookies(["growth_10"])[2];
  const { currentUser, setCurrentUser } = props;

  const logout = () => {
    removeCookie("growth_10", { path: "/" });
    setCurrentUser(null);
  };
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.logo}>
          <Link to="/">
            <img src={logo} alt="Momentum" role="banner" />
          </Link>
        </div>
        <div className={classes.logout}>
          {currentUser ? (
            <Link color="white" to="#" onClick={() => logout()}>
              Logout
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
