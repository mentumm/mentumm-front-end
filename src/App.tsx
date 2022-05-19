import React from "react";
import { createUseStyles, DefaultTheme } from "react-jss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppContainer from "./components/AppContainer";
import NavBar from "./components/NavBar";
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

  return (
    <AppContainer>
      <BrowserRouter>
        <div className={classes.root}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/search" element={<CoachSearch />} />
            <Route path="/coaches/:slug" element={<CoachResults />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppContainer>
  );
}

export default App;
