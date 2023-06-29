import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { createUseStyles, DefaultTheme } from "react-jss";
import { Routes, Route, useNavigate } from "react-router-dom";
import AppContainer from "./components/AppContainer";
import Footer from "./components/Footer";
import SignInWrapper from "./components/LoginWrapper";
import NavBar from "./components/NavBar";
import { CurrentUser } from "./types";
import ActionPlan from "./views/ActionPlan";
import { EditProfile } from "./views/Coach/EditProfile";
import CoachBio from "./views/CoachBio";
import CoachResults from "./views/CoachResults";
import { CoachSearch } from "./views/CoachSearch";
import GetStarted from "./views/GetStarted";
import CoachingStyle from "./views/GetStarted/CoachingStyle";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import Workshops from "./views/Workshops";
import WorkshopSlug from "./views/WorkshopSlug";
import BookingConfirmation from "./views/BookingConfirmation";

const useStyles = createUseStyles((theme: DefaultTheme) => ({
  root: {
    width: "100%",
  },
}));

function RedirectOnCondition({ currentUser, to }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate(to, { replace: true });
    }
  }, [currentUser, navigate, to]);

  return null;
}

function App() {
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState<CurrentUser>(null);
  const [cookies] = useCookies(["growth_10_03142023"]);

  useEffect(() => {
    if (cookies.growth_10_03142023) {
      setCurrentUser({
        id: cookies.growth_10_03142023.id,

        // leaving backward compatibility for now
        first_name: cookies.growth_10_03142023.name
          ? cookies.growth_10_03142023.name.split(" ")[0]
          : cookies.growth_10_03142023.first_name,
        last_name: cookies.growth_10_03142023.name
          ? cookies.growth_10_03142023.name.split(" ")[1]
          : cookies.growth_10_03142023.last_name,
        //

        email: cookies.growth_10_03142023.email,
        employer_id: cookies.growth_10_03142023.employer_id,
        role: cookies.growth_10_03142023.role,
        city: cookies.growth_10_03142023.city,
        state: cookies.growth_10_03142023.state,
        photo_url: cookies.growth_10_03142023.photo_url,
        booking_url: cookies.growth_10_03142023.booking_url,
        linkedin_url: cookies.growth_10_03142023.linkedin_url,
        bio: cookies.growth_10_03142023.bio,
        instagram_url: cookies.growth_10_03142023.instagram_url,
        facebook_url: cookies.growth_10_03142023.facebook_url,
        website_url: cookies.growth_10_03142023.website_url,
        phone_number: cookies.growth_10_03142023.phone_number,
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
                <RedirectOnCondition currentUser={currentUser} to="/home" />
              )
            }
          />
          <Route
            path="/home"
            element={
              <SignInWrapper currentUser={currentUser}>
                <Home currentUser={currentUser} />
              </SignInWrapper>
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
            path="/coach/:coachId"
            element={
              <SignInWrapper currentUser={currentUser}>
                <CoachBio currentUser={currentUser} />
              </SignInWrapper>
            }
          />
          <Route
            path="/coach/:coachId/profile"
            element={
              <SignInWrapper currentUser={currentUser}>
                <EditProfile
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
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
            path="/get-started/coaching-style"
            element={
              <SignInWrapper currentUser={currentUser}>
                <CoachingStyle currentUser={currentUser} />
              </SignInWrapper>
            }
          />
          <Route
            path="/sign-up"
            element={
              !currentUser || !cookies.growth_10_03142023 ? (
                <Register
                  setCurrentUser={setCurrentUser}
                  currentUser={currentUser}
                />
              ) : (
                <RedirectOnCondition
                  currentUser={currentUser}
                  to="/get-started"
                />
              )
            }
          />
          <Route
            path="/action-plan"
            element={
              <SignInWrapper currentUser={currentUser}>
                <ActionPlan currentUser={currentUser} />
              </SignInWrapper>
            }
          />
          <Route
            path="/workshops"
            element={
              <SignInWrapper currentUser={currentUser}>
                <Workshops />
              </SignInWrapper>
            }
          />
          <Route
            path="/workshops/:slug"
            element={
              <SignInWrapper currentUser={currentUser}>
                <WorkshopSlug />
              </SignInWrapper>
            }
          />
          <Route
            path="/booking-confirmation"
            element={
              <SignInWrapper currentUser={currentUser}>
                <BookingConfirmation currentUser={currentUser} />
              </SignInWrapper>
            }
          />
        </Routes>
        <Footer />
      </div>
    </AppContainer>
  );
}

export default App;
