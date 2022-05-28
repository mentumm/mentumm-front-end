import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { createUseStyles, DefaultTheme } from "react-jss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppContainer from "./components/AppContainer";
import SignInWrapper from "./components/LoginWrapper";
import NavBar from "./components/NavBar";
import { CurrentUser } from "./types";
import CoachResults from "./views/CoachResults";
import CoachSearch from "./views/CoachSearch";
import Login from "./views/Login";

const useStyles = createUseStyles((theme: DefaultTheme) => ({
  root: {
    position: "relative",
    width: "100%",
  },
}));

function App() {
  const classes = useStyles();
  // const demoState = {
  //   id: 1,
  //   name: "string",
  //   email: "string",
  //   employer_id: 1,
  // };
  const [currentUser, setCurrentUser] = useState<CurrentUser>(null);
  const [cookies, setCookie] = useCookies(["growth_10"]);

  useEffect(() => {
    if (cookies.growth_10) {
      console.log("user cookie found");
      setCurrentUser({
        id: cookies.growth_10.id,
        name: cookies.growth_10.name,
        email: cookies.growth_10.email,
        employer_id: cookies.growth_10.employer_id,
      });
    }
  }, [cookies]);

  return (
    <AppContainer>
      <div className={classes.root}>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              !currentUser ? (
                <Login
                  setCurrentUser={setCurrentUser}
                  currentUser={currentUser}
                />
              ) : (
                <Navigate to="/search" replace />
              )
            }
          />
          <Route
            path="/search"
            element={
              <SignInWrapper currentUser={currentUser}>
                {/* <CoachSearch currentUser={currentUser} /> */}
                <CoachSearch currentUser={currentUser} />
              </SignInWrapper>
            }
          />
          <Route
            path="/coaches/:slug"
            element={
              <SignInWrapper currentUser={currentUser}>
                <CoachResults />
              </SignInWrapper>
            }
          />
        </Routes>
      </div>
    </AppContainer>
  );
}

export default App;
