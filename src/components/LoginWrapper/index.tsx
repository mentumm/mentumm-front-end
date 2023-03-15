import React, { createContext } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router";
import { CurrentUser } from "../../types";

type SignInProps = {
  children: any;
  currentUser: CurrentUser;
};

const defaultUserContext = {
  currentUser: null,
};

export const UserContext = createContext(defaultUserContext);

const SignInWrapper: React.FC<SignInProps> = ({ children, currentUser }) => {
  const [cookies] = useCookies(["growth_10_03142023"]);

  return !currentUser && !cookies.growth_10_03142023 ? (
    <Navigate replace to="/" />
  ) : (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default SignInWrapper;
