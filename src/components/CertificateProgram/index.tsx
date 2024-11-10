import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const CertificateProgram = ({ id, image, title, description }) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/certificate-program/${id}`);
  };

  return (
    <Flex
      minWidth={355}
      maxWidth={415}
      h={112}
      bgColor="#0D1C31"
      borderRadius={5}
      overflow="hidden"
      flexShrink={0}
      _hover={{
        "& > div > p:first-of-type": {
          color: "#2CBBBC",
          fontWeight: "bold",
        },
        "& > div > p:last-of-type": {
          opacity: 1,
        },
      }}
      cursor="pointer"
      onClick={handleClick}
    >
      <Image
        src={image}
        alt={title}
        minWidth={148}
        height="auto"
        maxHeight="none"
        objectFit="cover"
      />
      <Flex direction="column" padding="20px 24px" gap={2} justify="center">
        <Text
          color="white"
          fontFamily="Montserrat"
          fontWeight="400"
          fontSize="20px"
          lineHeight="24px"
          noOfLines={2}
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {title}
        </Text>
        <Text
          color="white"
          opacity="50%"
          fontFamily="Montserrat"
          fontWeight="400"
          fontSize="12px"
          lineHeight="14.63px"
          noOfLines={1}
        >
          {description}
        </Text>
      </Flex>
    </Flex>
  );
};

export default CertificateProgram;
