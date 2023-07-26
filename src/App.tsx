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
import { CoachExpertise } from "./views/CoachExpertise";
import { ForgotPassword } from "./views/ForgotPassword";
import { ResetPassword } from "./views/ResetPassword";
import { menApiAuthClient } from "./clients/mentumm";

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
    const loadUser = async () => {
      try {
        const singleUser = await menApiAuthClient().get("/users", {
          params: {
            id: cookies.growth_10_03142023?.id,
          },
        });

        const user: CurrentUser = singleUser.data[0];

        cookies.growth_10_03142023 &&
          setCurrentUser({
            id: user.id,
            last_sign_in: user.last_sign_in,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            employer_id: user.employer_id,
            role: user.role,
            city: user.city,
            state: user.state,
            photo_url: user.photo_url,
            booking_url: user.booking_url,
            linkedin_url: user.linkedin_url,
            bio: user.bio,
            instagram_url: user.instagram_url,
            facebook_url: user.facebook_url,
            website_url: user.website_url,
            phone_number: user.phone_number,
            achievements1: user.achievements[0],
            achievements2: user.achievements[1],
            achievements3: user.achievements[2],
            hobbies1: user.hobbies[0],
            hobbies2: user.hobbies[1],
            hobbies3: user.hobbies[2],
            hobbies4: user.hobbies[3],
            hobbies5: user.hobbies[4],
            hobbies6: user.hobbies[5],
          })
      } catch (error) {
        console.log("Problem loading Coach Profile", error);
        throw new Error(error);
      }
    };
    loadUser();
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
            path="/coach/:coachId/expertise"
            element={
              <SignInWrapper currentUser={currentUser}>
                <CoachExpertise currentUser={currentUser} />
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
          <Route
            path="/forgot-password"
            element={
              <ForgotPassword />
            }
          />
          <Route
            path="/reset-password/:tokenId"
            element={
              <ResetPassword />
            }
          />
        </Routes>
        <Footer />
      </div>
    </AppContainer>
  );
}

export default App;
