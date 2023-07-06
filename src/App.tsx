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
import { CoachSearchV2 } from "./views/CoachSearchV2";
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

// coaches skip user onboarding on register
function RedirectOnSignup({ currentUser }: { currentUser: CurrentUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser.role === "coach") {
      navigate(`/coach/${currentUser.id}/coaching-style`, { replace: true });
    } else {
      navigate("/get-started", { replace: true });
    }
  }, [currentUser, navigate]);

  return null;
}

// coaches skip user onboarding on first-time sign in
function RedirectOnSignIn({ currentUser }: { currentUser: CurrentUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("role: ", currentUser.role);
    console.log("last_sign_in: ", currentUser.last_sign_in);
    if (currentUser.role === "coach" && !currentUser.last_sign_in) {
      navigate(`/coach/${currentUser.id}/coaching-style`, { replace: true });
    } else {
      navigate("/home", { replace: true });
    }
  }, [currentUser, navigate]);

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
        last_sign_in: cookies.growth_10_03142023.last_sign_in,

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
        achievements1: cookies.growth_10_03142023.achievements1,
        achievements2: cookies.growth_10_03142023.achievements2,
        achievements3: cookies.growth_10_03142023.achievements3,
        hobbies1: cookies.growth_10_03142023.hobbies1,
        hobbies2: cookies.growth_10_03142023.hobbies2,
        hobbies3: cookies.growth_10_03142023.hobbies3,
        hobbies4: cookies.growth_10_03142023.hobbies4,
        hobbies5: cookies.growth_10_03142023.hobbies5,
        hobbies6: cookies.growth_10_03142023.hobbies6,
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
                <RedirectOnSignIn currentUser={currentUser} />
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
                <CoachSearchV2 currentUser={currentUser} />
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
            path="/coach/:coachId/coaching-style"
            element={
              <SignInWrapper currentUser={currentUser}>
                <CoachingStyle
                  isCoach
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
                <CoachingStyle
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
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
                <RedirectOnSignup currentUser={currentUser} />
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
