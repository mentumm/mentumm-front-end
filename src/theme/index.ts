import {
  extendTheme,
  withDefaultColorScheme,
  defineStyleConfig,
} from "@chakra-ui/react";

const customTheme = extendTheme(
  withDefaultColorScheme({ colorScheme: "brand" }),
  {
    colors: {
      // change the colors here using material UI color scale
      // use in component with `colorScheme="brand"`
      brand: {
        50: "#dff3f5",
        100: "#aee2e3",
        200: "#76d1d2",
        300: "#2cbdbe",
        400: "#00afae",
        500: "#00a09c",
        600: "#00938e",
        700: "#00827c",
        800: "#00726c",
        900: "#00564d",
      },
    },
    components: {
      Link: defineStyleConfig({
        baseStyle: {
          color: "brand.500",
        },
      }),
      Button: defineStyleConfig({
        baseStyle: {
          textTransform: "uppercase",
        },
      }),
      Tag: {
        defaultProps: {
          colorScheme: "gray",
        },
      },
    },
  }
);

export default customTheme;
