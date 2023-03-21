import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "./theme";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { SnackbarProvider } from "notistack";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
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
  </React.StrictMode>
);
