import React from "react";
import { useCookies } from "react-cookie";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { CurrentUser } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";

type NavMenuProps = {
  currentUser: CurrentUser;
  setCurrentUser: (currentUser: CurrentUser) => void;
};

const NavMenu = ({
  currentUser,
  setCurrentUser,
}: NavMenuProps): JSX.Element => {
  const removeCookie = useCookies(["growth_10_03142023"])[2];

  const logoutUser = () => {
    removeCookie("growth_10_03142023", { path: "/" });
    setCurrentUser(null);
  };

  return (
    <Menu>
      <MenuButton
        boxSize={7}
        as={HamburgerIcon}
        _hover={{ "cursor": "pointer", "opacity": "0.8" }} >
      </MenuButton>
      <MenuList>
        <Link to={`/${currentUser.role}/${currentUser.id}/profile`}>
          <MenuItem icon={<FontAwesomeIcon icon={faUser} />}>Profile</MenuItem>
        </Link>
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
