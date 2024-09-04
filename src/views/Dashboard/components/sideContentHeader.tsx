import { Flex, VStack, Heading, Spacer, Avatar, Text } from '@chakra-ui/react';
import React from 'react';
import { CurrentUser } from '../../../types';

type SideContentHeaderProps = {
  currentUser: CurrentUser
}

const SideContentHeader = ({ currentUser }: SideContentHeaderProps) => {
  const userDisplayName = `${currentUser?.first_name} ${currentUser?.last_name[0]}.`

  return (
    <Flex mt='3em' mb='1em'>
      <VStack justifyContent='center'>
        <Heading size='md' color='white'>
          {userDisplayName}
        </Heading>
        <Text size='md'>
          Logout
        </Text>
      </VStack>
      <Spacer />
      <Avatar size='xl' name={userDisplayName} />
    </Flex>
  )
}

export default SideContentHeader;
