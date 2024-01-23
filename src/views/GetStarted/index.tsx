import {
  Box,
  Flex,
  Heading,
  VStack,
  Image,
  Text,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { CurrentUserProps } from "../../types";
import logo from "../../assets/minimal-mentumm-logo.svg";
import { SvgLayer } from "../../components/Waves/svgLayer";
import { WelcomeContent } from "../../components/WelcomeContent";

const GetStarted: React.FC<CurrentUserProps> = ({ currentUser }) => {
  const bgImage = 'https://mentummportal.sfo3.digitaloceanspaces.com/mentumm-splash.jpeg';
  const isCoach = currentUser?.role === 'coach';

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
        <Heading zIndex={1} size="4xl" fontWeight="400" color="white">
          Welcome to mentumm,{' '}
          {currentUser
            ? (
              <Box as="span">
                <Text as="b">
                  {currentUser.first_name}
                </Text>
                {`!`}
              </Box>
            )
            : null}
        </Heading>
      </VStack>
      <Box>
        <SvgLayer
          vbHeight="825"
        >
          <path
            d="M1440 55.0362V492H0V0C160.575 75.0766 406.2 180.288 710.55 182.008C1024.35 183.878 1277.1 131.234 1440 55.0362Z"
            fill="#2CBBBC"
          />
        </SvgLayer>
        <SvgLayer
          vbHeight="825"
        >
          <path
            d="M0 55.0362V825H1440V0C1279.43 75.0766 1033.8 180.288 729.45 182.008C415.65 183.878 162.9 131.234 0 55.0362Z"
            fill="#0D1C31"
          />
        </SvgLayer>
        <SvgLayer
          vbHeight="230"
        >
          <path
            d="M1440 55.0362V252H0V0C160.575 75.0766 406.2 180.288 710.55 182.008C1024.35 183.878 1277.1 131.234 1440 55.0362Z" fill="#2CBBBC" />
        </SvgLayer>
        <SvgLayer
          vbHeight="230"
        >
          <path
            d="M0 55.0362V550H1440V0C1279.43 75.0766 1033.8 180.288 729.45 182.008C415.65 183.878 162.9 131.234 0 55.0362Z" fill="#0D1C31" />
        </SvgLayer>
      </Box>
      <WelcomeContent isCoach={isCoach} />
      <Box mt="2em">
        <Link
          to={isCoach ? `/coach/${currentUser.id}/coaching-style` : "/get-started/coaching-style"}
        >
          <Button
            borderRadius="30px"
            variant="onBlue"
            border="2px solid #2CBBBC"
            width="360px"
            fontWeight="bold"
            mt={2}
            padding={7}
          >
            GET STARTED
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default GetStarted;
