// import { Center, Container, Image } from "@chakra-ui/react";
// import React from "react";
// import { createUseStyles } from "react-jss";
// import RegisterForm from "../../components/RegisterForm";
// import { UserLoginProps } from "../../types";
// import logo from "../../assets/mentumm-logo.svg";

// const useStyles = createUseStyles({
//   root: {
//     position: "relative",
//     width: "100%",
//     textAlign: "center",
//   },
//   parentColumn: {
//     display: "inline-block",
//   },
//   container: {
//     position: "relative",
//     display: "flex",
//     flexDirection: "row",
//   },
// });

// const Register: React.FC<UserLoginProps> = (props) => {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <div className={classes.parentColumn}>
//         <div className={classes.container}>
//           <Container
//             maxW="md"
//             paddingTop={{ base: "4", md: "8" }}
//             paddingBottom={{ base: "2", md: "6" }}
//           >
//             <Center>
//               <Image
//                 src={logo}
//                 alt="mentumm banner"
//                 w={{ base: "auto", lg: "500px" }}
//               />
//             </Center>
//           </Container>
//         </div>
//         <div className={classes.container}>
//           <RegisterForm
//             currentUser={props.currentUser}
//             setCurrentUser={props.setCurrentUser}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

import {
  Box,
  Flex,
  Button,
  VStack,
  Image,
  Stack,
  Center,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React from "react";
import RegisterForm from "../../components/RegisterForm";
import { UserLoginProps } from "../../types";
import logo from "../../assets/minimal-mentumm-logo.svg";
import { SvgLayer } from "../../components/Waves/svgLayer";

const Register: React.FC<UserLoginProps> = (props) => {
  const bgImage = 'https://mentummportal.sfo3.digitaloceanspaces.com/mentumm-splash.jpeg';
  // const smallSvgHeight = '252';
  // const largeSvgHeight = '527';

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      height="100vh"
      bgImage={`url(${bgImage})`}
      bgPos="center center"
      bgSize="cover"
    >
      <VStack
        position="absolute"
        top="6em"
        textAlign="center"
      >
        <Image src={logo} boxSize="150px" />
        <Stack
          position="relative"
          zIndex={2}
          mt="3em !important"
        >
          <Link to="/">
            <Button
              variant="onTealAlt"
              w="360px"
            >
              Sign In
            </Button>
          </Link>
          <Link to="/forgot-password">
            <Center>
              <Button
                variant="link"
                size="xs"
                fontWeight="400"
                color="#002F6F"
              >
                Forgot password?
              </Button>
            </Center>
          </Link>
        </Stack>
      </VStack>
      <Box>
        <SvgLayer
          vbHeight="800"
        >
          <path
            d="M0 55.0362V252H1440V0C1279.43 75.0766 1033.8 180.288 729.45 182.008C415.65 183.878 162.9 131.234 0 55.0362Z"
            fill="#0D1C31"
          />
        </SvgLayer>
        <SvgLayer
          vbHeight="800"
        >
          <path
            d="M1440 55.0362V400H0V0C160.575 75.0766 406.2 180.288 710.55 182.008C1024.35 183.878 1277.1 131.234 1440 55.0362Z"
            fill="#2CBBBC"
          />
        </SvgLayer>
        <SvgLayer
          vbHeight="700"
        >
          <path
            d="M0 55.0362V700H1440V0C1279.43 75.0766 1033.8 180.288 729.45 182.008C415.65 183.878 162.9 131.234 0 55.0362Z" fill="#0D1C31" />
        </SvgLayer>
      </Box>
      <RegisterForm
        currentUser={props.currentUser}
        setCurrentUser={props.setCurrentUser}
      />
    </Flex>
  );
};

export default Register;
