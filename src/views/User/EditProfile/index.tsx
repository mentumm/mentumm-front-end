import React, { useEffect } from "react";
import { menApiAuthClient } from "../../../clients/mentumm";
import { EditProfileWrapper } from "../../../components/Wrappers/EditProfileWrapper";
import { ensureHttps, urlRegex } from "../../../helpers/validators";

export const EditUserProfile = ({ currentUser, setCurrentUser }) => {
  // hooks

  // useEffect(() => {
  //   const loadUser = async () => {
  //     try {
  //       const singleUser =  await menApiAuthClient.get('/users', {
  //         params: {
  //           id: currentUser?.id
  //         }
  //       })
  //     } catch (error) {
  //       throw error;
  //     }
  //   }
  // }, [])

  // handle submit

  // loading state

  return (
    <EditProfileWrapper>
      <div>form here</div>
    </EditProfileWrapper>
  );
};
