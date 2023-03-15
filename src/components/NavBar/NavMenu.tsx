import React from "react";
import { useCookies } from "react-cookie";
import { createUseStyles } from "react-jss";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { CurrentUser } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const useStyles = createUseStyles({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    width: 48,
    borderRadius: "50%",
    background: "#88E4E7",
    color: "#5F5F5F",
    fontSize: 20,
    "&:hover": {
      opacity: 0.8,
    },
  },
  menuItems: {
    "& > button": {
      "&:hover, &:focus": {
        background: "#CBE3E4",
      },
    },
  },
});

type NavMenuProps = {
  currentUser: CurrentUser;
  setCurrentUser: (currentUser: CurrentUser) => void;
};

const NavMenu = ({
  currentUser,
  setCurrentUser,
}: NavMenuProps): JSX.Element => {
  const classes = useStyles();
  const removeCookie = useCookies(["growth_10_03142023"])[2];

  const logoutUser = () => {
    removeCookie("growth_10_03142023", { path: "/" });
    setCurrentUser(null);
  };

  const generateUserInitials = () => {
    return currentUser.first_name[0] + currentUser.last_name[0];
  };

  return (
    <Menu>
      <MenuButton className={classes.button}>
        {generateUserInitials()}
      </MenuButton>
      <MenuList className={classes.menuItems}>
        {/* Uncomment profile menu item after profile page is built */}
        {/* <MenuItem>Profile</MenuItem> */}
        <MenuItem
          icon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
          onClick={logoutUser}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default NavMenu;
