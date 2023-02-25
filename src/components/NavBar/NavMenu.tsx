import React from "react";
import { useCookies } from "react-cookie";
import { createUseStyles } from "react-jss";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { CurrentUser } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const useStyles = createUseStyles({
  root: {},
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
  const removeCookie = useCookies(["growth_10"])[2];

  const logoutUser = () => {
    removeCookie("growth_10", { path: "/" });
    setCurrentUser(null);
  };

  return (
    <div className={classes.root}>
      <Menu>
        <MenuButton>Menu</MenuButton>
        <MenuList>
          <MenuItem>Profile</MenuItem>
          <MenuItem
            icon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
            onClick={logoutUser}
          >
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default NavMenu;
