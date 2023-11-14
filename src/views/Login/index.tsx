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
import waveImage from '../../assets/login-bottom-wave.svg'

const Login: React.FC<UserLoginProps> = (props) => {
  // Responsive background size for the wave SVG
  const waveSize = useBreakpointValue({ base: '200%', md: '100%' });

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      bgImage={`url(${bgImage})`}
      bgPos="center center"
      bgSize="cover"
      position="relative"
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

      {/* Login Form Component */}
      <LoginForm {...props} />

      {/* Wave SVG at the bottom of the page */}
      <Box
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        height="150px" // Adjust the height to fit your wave SVG
        bgImage={`url(${waveImage})`}
        bgRepeat="no-repeat"
        bgSize={waveSize}
        bgPos="bottom center"
        width="full"
      />
    </Flex>
  );
};

export default Login;
