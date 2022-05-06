import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    // change the colors here using material UI color scale
    // use in component with `colorScheme="brand"`
    brand: {
      50: "#ece4ff",
      100: "#c4b2ff",
      200: "#9d80ff",
      300: "#754dff",
      400: "#4f1bfe",
      500: "#0e0c0c",
      600: "#262424",
      700: "#1c0081",
      800: "#262424",
      900: "#060020",
    },
  },
});

export default customTheme;
