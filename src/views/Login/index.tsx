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
import bgImage from '../../assets/mentumm-splash.jpeg';
import tealWave from '../../assets/teal-wave.svg'
import marineWave from '../../assets/marine-wave.svg';
import marineWaveSmall from '../../assets/marine-wave-small.svg';

const Login: React.FC<UserLoginProps> = (props) => {

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
        top="0"
        pt={8}
        textAlign="center"
      >
        <Image src={logo} boxSize="150px" />
        <Heading size="4xl" fontWeight="400" color="white">
          Welcome to <b>mentumm</b>
        </Heading>
        <Text fontFamily="Montserrat" color="white" fontSize="2xl" fontStyle="italic" pt="4">
          Customized Coaching, For You!
        </Text>
      </VStack>
      <Box>
        <Image
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          w="100vw"
          src={marineWave}
        />
        <Image
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          w="100vw"
          src={tealWave}
        />
        <Image
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          w="100vw"
          src={marineWaveSmall}
        />
        <LoginForm {...props} />
      </Box>
    </Flex>
  );
};

export default Login;
