import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import CertificateProgram from "../../../components/CertificateProgram";

const certificatePrograms = [
  {
    id: 1,
    title: "Certificate in Digital Marketing",
    description:
      "Learn the basics of digital marketing and how to apply them to your business.",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 2,
    title: "Certificate in Digital Marketing",
    description:
      "Learn the basics of digital marketing and how to apply them to your business.",
    image: "https://via.placeholder.com/300",
  },
];
export const FeaturedCertificatePrograms = ({ title }: any) => {
  return (
    <Box>
      <Heading
        color="white"
        size="md"
        fontFamily="Montserrat"
        fontWeight="400"
        borderBottom="2px solid #2CBBBC"
        pb="0.5em"
        mt={8}
      >
        {title}
      </Heading>
      <Flex
        gap={4}
        overflowX="auto"
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "-ms-overflow-style": "none",
          scrollbarWidth: "none",
        }}
      >
        {certificatePrograms.map((c) => {
          return (
            <CertificateProgram
              key={c.id}
              image={c.image}
              title={c.title}
              description={c.description}
            />
          );
        })}
      </Flex>
    </Box>
  );
};
