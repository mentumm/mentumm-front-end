import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { createUseStyles, DefaultTheme } from "react-jss";
import { Routes, Route, Navigate } from "react-router-dom";
import AppContainer from "./components/AppContainer";
import Footer from "./components/Footer";
import SignInWrapper from "./components/LoginWrapper";
import NavBar from "./components/NavBar";
import { CurrentUser } from "./types";
import CoachBio from "./views/CoachBio";
import CoachResults from "./views/CoachResults";
import CoachSearch from "./views/CoachSearch";
import GetStarted from "./views/GetStarted";
import Login from "./views/Login";
import Register from "./views/Register";

const useStyles = createUseStyles((theme: DefaultTheme) => ({
  root: {
    width: "100%",
  },
}));

function App() {
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState<CurrentUser>(null);
  const [cookies] = useCookies(["growth_10"]);

  useEffect(() => {
    if (cookies.growth_10) {
      setCurrentUser({
        id: cookies.growth_10.id,

        // leaving backward compatibility for now
        first_name: cookies.growth_10.name
          ? cookies.growth_10.name.split(" ")[0]
          : cookies.growth_10.first_name,
        last_name: cookies.growth_10.name
          ? cookies.growth_10.name.split(" ")[1]
          : cookies.growth_10.last_name,
        //

        email: cookies.growth_10.email,
        employer_id: cookies.growth_10.employer_id,
      });
    }
  }, [cookies]);

  return (
    <AppContainer>
      <div className={classes.root}>
        <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
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
                <Navigate to="/get-started" replace />
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
          <Route
            path="/coach/:coach"
            element={
              <SignInWrapper currentUser={currentUser}>
                <CoachBio currentUser={currentUser} />
              </SignInWrapper>
            }
          />
          <Route
            path="/get-started"
            element={
              <SignInWrapper currentUser={currentUser}>
                <GetStarted currentUser={currentUser} />
              </SignInWrapper>
            }
          />
          <Route
            path="/sign-up"
            element={
              !currentUser || !cookies.growth_10 ? (
                <Register
                  setCurrentUser={setCurrentUser}
                  currentUser={currentUser}
                />
              ) : (
                <Navigate to="/get-started" replace />
              )
            }
          />
        </Routes>
        <Footer />
      </div>
    </AppContainer>
  );
}

export default App;
