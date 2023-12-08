import {
  Box,
  Flex,
  Heading,
  VStack,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import LoginForm from "../../components/LoginForm";
import { UserLoginProps } from "../../types";
import logo from "../../assets/minimal-mentumm-logo.svg";
import { SvgLayer } from "../../components/Waves/svgLayer";

const Login: React.FC<UserLoginProps> = (props) => {
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
        top="8em"
        textAlign="center"
      >
        <Image src={logo} boxSize="150px" />
        <Heading size="4xl" fontWeight="400" color="white" mt="-10px !important">
          Welcome to <b>mentumm</b>
        </Heading>
        <Text fontFamily="Montserrat" color="white" fontSize="2xl" fontStyle="italic">
          Customized Coaching, For You!
        </Text>
      </VStack>
      <Box>
        <SvgLayer
          vbHeight="527"
        >
          <path
            d="M0 55.0362V252H1440V0C1279.43 75.0766 1033.8 180.288 729.45 182.008C415.65 183.878 162.9 131.234 0 55.0362Z"
            fill="#0D1C31"
          />
        </SvgLayer>
        <SvgLayer
          vbHeight="527"
        >
          <path
            d="M1440 55.0362V492H0V0C160.575 75.0766 406.2 180.288 710.55 182.008C1024.35 183.878 1277.1 131.234 1440 55.0362Z"
            fill="#2CBBBC"
          />
        </SvgLayer>
        <SvgLayer
          vbHeight="300"
        >
          <path
            d="M0 55.0362V300H1440V0C1279.43 75.0766 1033.8 180.288 729.45 182.008C415.65 183.878 162.9 131.234 0 55.0362Z" fill="#0D1C31" />
        </SvgLayer>
      </Box>
      <LoginForm {...props} />
    </Flex>
  );
};

export default Login;
