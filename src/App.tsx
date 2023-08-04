import React, { lazy, Suspense, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { createUseStyles, DefaultTheme } from "react-jss";
import { Routes, Route, useNavigate } from "react-router-dom";
import SuspenseFallback from "./components/Loaders/suspenseFallback";
import AppContainer from "./components/AppContainer";
import Footer from "./components/Footer";
import SignInWrapper from "./components/LoginWrapper";
import NavBar from "./components/NavBar";
import { CurrentUser } from "./types";
import Home from "./views/Home";
import Login from "./views/Login";
import { menApiAuthClient } from "./clients/mentumm";
const ActionPlan = lazy(() => import('./views/ActionPlan'));
const EditProfile = lazy(() => import('./views/Coach/EditProfile'));
const EditUserProfile = lazy(() => import('./views/User/EditProfile'));
const CoachBio = lazy(() => import('./views/CoachBio'));
const CoachResults = lazy(() => import('./views/CoachResults'));
const CoachSearch = lazy(() => import('./views/CoachSearch'));
const GetStarted = lazy(() => import('./views/GetStarted'));
const CoachingStyle = lazy(() => import('./views/GetStarted/CoachingStyle'));
const Workshops = lazy(() => import('./views/Workshops'));
const CoachExpertise = lazy(() => import('./views/CoachExpertise'));
const ForgotPassword = lazy(() => import('./views/ForgotPassword'));
const ResetPassword = lazy(() => import('./views/ResetPassword'));
const WorkshopSlug = lazy(() => import('./views/WorkshopSlug'))
const BookingConfirmation = lazy(() => import('./views/BookingConfirmation'))
const Register = lazy(() => import('./views/Register'));


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
        if (cookies.growth_10_03142023) {
          const singleUser = await menApiAuthClient().get("/users", {
            params: {
              id: cookies.growth_10_03142023.id,
            },
          });

          const {
            id,
            last_sign_in,
            first_name,
            last_name,
            email,
            employer_id,
            role,
            city,
            state,
            photo_url,
            booking_url,
            linkedin_url,
            bio,
            instagram_url,
            facebook_url,
            website_url,
            phone_number,
            achievements,
            hobbies,
          }: CurrentUser = singleUser.data[0];

          setCurrentUser({
            id,
            last_sign_in,
            first_name,
            last_name,
            email,
            employer_id,
            role,
            city,
            state,
            photo_url,
            booking_url,
            linkedin_url,
            bio,
            instagram_url,
            facebook_url,
            website_url,
            phone_number,
            achievements1: achievements[0],
            achievements2: achievements[1],
            achievements3: achievements[2],
            hobbies1: hobbies[0],
            hobbies2: hobbies[1],
            hobbies3: hobbies[2],
            hobbies4: hobbies[3],
            hobbies5: hobbies[4],
            hobbies6: hobbies[5],
          });
        }
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
                <Suspense fallback={<SuspenseFallback />}>
                  <CoachSearch currentUser={currentUser} />
                </Suspense>
              </SignInWrapper>
            }
          />
          <Route
            path="/coaches/:slug"
            element={
              <SignInWrapper currentUser={currentUser}>
                <Suspense fallback={<SuspenseFallback />}>
                  <CoachResults />
                </Suspense>
              </SignInWrapper>
            }
          />
          <Route
            path="/coach/:coachId"
            element={
              <SignInWrapper currentUser={currentUser}>
                <Suspense fallback={<SuspenseFallback />}>
                  <CoachBio currentUser={currentUser} />
                </Suspense>
              </SignInWrapper>
            }
          />
          <Route
            path="/coach/:coachId/expertise"
            element={
              <SignInWrapper currentUser={currentUser}>
                <Suspense fallback={<SuspenseFallback />}>
                  <CoachExpertise currentUser={currentUser} />
                </Suspense>
              </SignInWrapper>
            }
          />
          <Route
            path="/coach/:coachId/profile"
            element={
              <SignInWrapper currentUser={currentUser}>
                <Suspense fallback={<SuspenseFallback />}>
                  <EditProfile
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                  />
                </Suspense>
              </SignInWrapper>
            }
          />
          <Route
            path="/user/:userId/profile"
            element={
              <SignInWrapper currentUser={currentUser}>
                <Suspense fallback={<SuspenseFallback />}>
                  <EditUserProfile
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                  />
                </Suspense>
              </SignInWrapper>
            }
          />
          <Route
            path="/coach/:coachId/coaching-style"
            element={
              <SignInWrapper currentUser={currentUser}>
                <Suspense fallback={<SuspenseFallback />}>
                  <CoachingStyle
                    isCoach
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                  />
                </Suspense>
              </SignInWrapper>
            }
          />
          <Route
            path="/get-started"
            element={
              <SignInWrapper currentUser={currentUser}>
                <Suspense fallback={<SuspenseFallback />}>
                  <GetStarted currentUser={currentUser} />
                </Suspense>
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
                <Suspense fallback={<SuspenseFallback />}>
                  <Register
                    setCurrentUser={setCurrentUser}
                    currentUser={currentUser}
                  />
                </Suspense>
              ) : (
                <RedirectOnSignup currentUser={currentUser} />
              )
            }
          />
          <Route
            path="/action-plan"
            element={
              <SignInWrapper currentUser={currentUser}>
                <Suspense fallback={<SuspenseFallback />}>
                  <ActionPlan currentUser={currentUser} />
                </Suspense>
              </SignInWrapper>
            }
          />
          <Route
            path="/workshops"
            element={
              <SignInWrapper currentUser={currentUser}>
                <Suspense fallback={<SuspenseFallback />}>
                  <Workshops />
                </Suspense>
              </SignInWrapper>
            }
          />
          <Route
            path="/workshops/:slug"
            element={
              <SignInWrapper currentUser={currentUser}>
                <Suspense fallback={<SuspenseFallback />}>
                  <WorkshopSlug />
                </Suspense>
              </SignInWrapper>
            }
          />
          <Route
            path="/booking-confirmation"
            element={
              <SignInWrapper currentUser={currentUser}>
                <Suspense fallback={<SuspenseFallback />}>
                  <BookingConfirmation currentUser={currentUser} />
                </Suspense>
              </SignInWrapper>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <Suspense fallback={<SuspenseFallback />}>
                <ForgotPassword />
              </Suspense>
            }
          />
          <Route
            path="/reset-password/:tokenId"
            element={
              <Suspense fallback={<SuspenseFallback />}>
                <ResetPassword />
              </Suspense>
            }
          />
        </Routes>
        <Footer />
      </div>
    </AppContainer>
  );
}

export default App;
