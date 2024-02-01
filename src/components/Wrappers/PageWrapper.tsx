import { ArrowBackIcon } from "@chakra-ui/icons";
import { Container, Heading, Box, Link, Center, Image } from "@chakra-ui/react";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/minimal-mentumm-logo.svg";

interface IProps {
  title?: string;
  backTo?: string;
  children: React.ReactNode;
}

const PageWrapper: FC<IProps> = ({ title, backTo = "", children }) => {
  const navigate = useNavigate();

  const back = (
    <Link
      onClick={() => (backTo ? navigate(backTo) : navigate(-1))}
      style={{ float: "left", zIndex: '1', color: '#3067B0' }}
    >
      <ArrowBackIcon boxSize={10} position='absolute' ml={6} />
    </Link>
  );

  return (
    <Container maxW='100%' pt={8} bgColor="brand.800" >
      {back}
      {title ? (
        <Center
          p={8}
        >
          <Image w='110px' mb={8} mr={8} src={logo} />
          <Heading color='white' as="h1" size="2xl" mb={8}>
            {" "}
            {title}
          </Heading>

        </Center>
      ) : (
        back
      )}
      <Box>{children}</Box>
    </Container>
  );
};

export default PageWrapper;
