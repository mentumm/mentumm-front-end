import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    brand: {
      50: "#dff3f5",
      100: "#aee2e3",
      200: "#76d1d2",
      300: "#2CBBBC",
      400: "#00afae",
      500: "#00a09c",
      600: "#00938e",
      700: "#002F6F",
      800: "#0D1C31",
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
    Input: {
      variants: {
        outline: {
          field: {
            boxShadow: "0px 4px 4px 0px #00000040 inset",
            borderRadius: "30px",
            bg: "white",
            height: "36px",
          }
        }
      }
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
            bg: "brand.800",
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
        onBlue: {
          borderRadius: "30px",
          bgColor: "white",
          colorScheme: "brand",
          color: "brand.300",
          fontWeight: "bold",
          fontSize: "lg",
          fontFamily: "Montserrat",
          border: "2px solid #2CBBBC",
          _hover: {
            backgroundColor: "brand.300",
            color: "white",
            _disabled: {
              bg: "red",
            },
          },
        },
        onTeal: {
          borderRadius: "30px",
          bgColor: "white",
          height: "38px",
          colorScheme: "brand",
          color: "brand.500",
          fontWeight: "bold",
          fontFamily: "Montserrat",
          _hover: {
            bg: "brand.800",
            color: "white",
          },
        },
        onTealAlt: {
          borderRadius: "30px",
          border: "2px solid #FFFFFF",
          fontSize: "18px",
          bgColor: "brand.300",
          height: "38px",
          colorScheme: "brand",
          color: "white",
          fontWeight: "bold",
          fontFamily: "Montserrat",
          _hover: {
            bg: "#brand.800",
            color: "white",
          },
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
