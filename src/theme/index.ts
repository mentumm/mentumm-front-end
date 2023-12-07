import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
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
      900: "#3168B2",
    },
  },
  fonts: {
    heading: `'Saira', sans-serif`,
  },
  components: {
    Link: {
      baseStyle: {
        color: "brand.500",
      },
    },
    Button: {
      baseStyle: {
        textTransform: "uppercase",
        color: "white",
      },
      variants: {
        solid: {
          bg: "brand.900",
          _hover: {
            bg: "#0D1C31",
            color: "white",
            _disabled: {
              _hover: {
                bg: "red",
              },
            },
          },
          _active: {
            bg: "#20467a",
          }
        },
      },
    },
    Tag: {
      defaultProps: {
        colorScheme: "gray",
      },
    },
  },
});

export default customTheme;
