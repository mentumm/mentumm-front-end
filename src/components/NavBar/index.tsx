import React from "react";
import { Link } from "react-router-dom";
import { UserLoginProps } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/mentumm-nav-logo.svg";
import NavMenu from "./NavMenu";
import { Box, Container, Flex, HStack, Image, Spacer } from "@chakra-ui/react";

const NavBar: React.FC<UserLoginProps> = (props) => {
  const { currentUser, setCurrentUser } = props;

  return (
    <Container
      minW="100%"
      display="flex"
      backgroundColor="var(--chakra-colors-brand-300)"
      height="60px"
      padding="0 25px"
      alignItems="center"
    >
      <Container maxW="container.xl">
        <Flex justifyContent="space-between">
          <Box>
            <Link to="/">
              <Image
                src={logo}
                minH="1.6em"
                alt="mentumm"
                role="banner"
                _hover={{ "opacity": "0.8" }}
              />
            </Link>
          </Box>
          <Spacer />
          <Flex
            alignItems="center"
            height="100%"
          >
            {currentUser && (
              <HStack mr={24}>
                <Box mr={2} >
                  <Link to="/search" >
                    <FontAwesomeIcon color="black" icon={faMagnifyingGlass} />
                  </Link>
                </Box>
                <NavMenu
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              </HStack>
            )}
          </Flex>
        </Flex>
      </Container>
    </Container>
  );
};

export default NavBar;
