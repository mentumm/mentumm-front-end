import { Flex, Image, Text, Heading } from "@chakra-ui/react";
import React from "react";

const CertificateProgram = ({ image, title, description }) => {
  return (
    <Flex w={366} h={112} bgColor="#0D1C31" borderRadius={16}>
      <Image src={image} alt={title} />
      <Heading color="white">{title}</Heading>
      <Text>{description}</Text>
    </Flex>
  );
};

export default CertificateProgram;
