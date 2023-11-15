import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  VStack,
  Image,
  Text,
  HStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router";
import LoginForm from "../../components/LoginForm";
import RegisterAction from "../../components/RegisterAction";
import { UserLoginProps } from "../../types";
import logo from "../../assets/minimal-mentumm-logo.svg";
import bgImage from '../../assets/mentumm-splash.jpeg';
import tealWave from '../../assets/teal-wave.svg'
import marineWave from '../../assets/marine-wave.svg';
import marineWaveSmall from '../../assets/marine-wave-small.svg';
import marineRectangle from '../../assets/marine-rectangle.svg';

const Login: React.FC<UserLoginProps> = (props) => {

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      h="100vh"
      width="100vw"
      bgImage={`url(${bgImage})`}
      bgPos="center center"
      bgSize="cover"
      position="relative"
      w="100vw"
    >
      <VStack spacing={10} w="full" maxW="md" p={8} textAlign="center">
        <Image src={logo} boxSize="120px" />
        <Heading as="h1" size="xl" fontWeight="normal" color="white">
          Welcome to mentumm
        </Heading>
        <Text color="white" fontSize="md" fontStyle="italic">
          Customized Coaching, For You!
        </Text>
      </VStack>
      <LoginForm {...props} />
      <Image
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        w="100vw"
        src={marineWave}
      />
      {/* <Image
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        w="100vw"
        src={marineRectangle}
      /> */}
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
    </Flex>
  );
};

export default Login;
