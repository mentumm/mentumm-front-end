import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppContainer from "./components/AppContainer";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <AppContainer>
          <div style={{ padding: "85px 0" }}>hihi</div>
        </AppContainer>
      </Router>
    </div>
  );
}

export default App;
