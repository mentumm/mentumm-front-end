import { Flex, VStack, Heading, Spacer, Avatar, Text, Divider, Box } from '@chakra-ui/react';
import React from 'react';
import { CurrentUser } from '../../../types';
import { useCookies } from 'react-cookie';

type SideContentHeaderProps = {
  currentUser: CurrentUser
  setCurrentUser: (currentUser: CurrentUser) => void;
}

const SideContentHeader = ({ currentUser, setCurrentUser }: SideContentHeaderProps) => {
  const userDisplayName = `${currentUser?.first_name} ${currentUser?.last_name[0]}.`
  const removeCookie = useCookies(["growth_10_03142023"])[2];
  const logoutUser = () => {
    removeCookie("growth_10_03142023", { path: "/" });
    setCurrentUser(null);
  };

  return (
    <Box mx='1em' >
      <Flex mt='3em' mb='1em'>
        <VStack justifyContent='center' >
          <Heading size='md' color='#2CBBBC'>
            {userDisplayName}
          </Heading>
          <Text size='md' color='#3067B0' onClick={logoutUser} _hover={{ cursor: 'pointer' }}>
            Logout
          </Text>
        </VStack>
        <Spacer />
        <Avatar size='xl' name={userDisplayName} />
      </Flex >
      <Divider borderBottomColor='#002F6F' />
    </Box >
  )
}

export default SideContentHeader;
