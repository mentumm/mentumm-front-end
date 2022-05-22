import React, { useState } from "react";
import { createUseStyles, DefaultTheme } from "react-jss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppContainer from "./components/AppContainer";
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

  const SignInWrapper = ({ children, currentUser }) => {
    return !currentUser ? <Navigate replace to="/" /> : children;
  };

  return (
    <AppContainer>
      <BrowserRouter>
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
                  <CoachSearch currentUser={currentUser} />
                )
              }
            />
            <Route
              path="/search"
              element={
                <SignInWrapper currentUser={currentUser}>
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
      </BrowserRouter>
    </AppContainer>
  );
}

export default App;
