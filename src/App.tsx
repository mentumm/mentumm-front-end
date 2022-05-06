import React from "react";
import { createUseStyles, DefaultTheme } from "react-jss";
import { BrowserRouter as Router } from "react-router-dom";
import AppContainer from "./components/AppContainer";
import NavBar from "./components/NavBar";
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
    <div className={classes.root}>
      <Router>
        <NavBar />
        <AppContainer>
          <Login />
        </AppContainer>
      </Router>
    </div>
  );
}

export default App;
