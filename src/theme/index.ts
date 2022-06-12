import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    // change the colors here using material UI color scale
    // use in component with `colorScheme="brand"`
    brand: {
      50: "#ebf1f9",
      100: "#c3d6ee",
      200: "#9bbae3",
      300: "#739ed8",
      400: "#4b83cd",
      500: "#3269b4",
      600: "#27528c",
      700: "#1c3a64",
      800: "#11233c",
      900: "#060c14",
    },
  },
});

export default customTheme;
