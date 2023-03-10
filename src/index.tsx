import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "./theme";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { SnackbarProvider } from "notistack";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <CookiesProvider>
        <BrowserRouter>
          <SnackbarProvider>
            <App />
          </SnackbarProvider>
        </BrowserRouter>
      </CookiesProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
