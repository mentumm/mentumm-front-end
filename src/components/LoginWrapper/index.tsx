import React from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router";
import { CurrentUser } from "../../types";

type SignInProps = {
  children: any;
  currentUser: CurrentUser;
};

const SignInWrapper: React.FC<SignInProps> = ({ children, currentUser }) => {
  const [cookies, setCookies] = useCookies(["growth_10"]);

  return !currentUser && !cookies.growth_10 ? (
    <Navigate replace to="/" />
  ) : (
    children
  );
};

export default SignInWrapper;
