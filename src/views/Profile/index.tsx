import React from 'react';
import { Flex, Avatar } from "@chakra-ui/react"
import { CurrentUser } from '../../types';
import PageWrapper from '../../components/PageWrapper';
import ProfileForm from '../../components/ProfileForm';


interface IProps {
  currentUser: CurrentUser;
}

const Profile: React.FC<IProps> = ({currentUser}) => {
  
  return (
    <PageWrapper title="My Profile" backTo="/home">
      <Flex>
          <Avatar size="lg" mr={12} />
          {!!currentUser && <ProfileForm currentUser={currentUser} />}
        </Flex>
      </PageWrapper>
  )
}

export default Profile;