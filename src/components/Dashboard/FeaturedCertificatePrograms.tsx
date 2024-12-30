import React, { useRef, useEffect, useState } from "react";
import { Box, Flex, Heading, IconButton } from "@chakra-ui/react";
import CertificateProgram from "../CertificateProgram";
import { certificatePrograms } from "../../data/certificatePrograms";
import { ArrowRightIcon, ArrowLeftIcon } from "@chakra-ui/icons";

export const FeaturedCertificatePrograms = ({ title }: any) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollability = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  useEffect(() => {
    checkScrollability();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollability);
      window.addEventListener("resize", checkScrollability);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScrollability);
        window.removeEventListener("resize", checkScrollability);
      }
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 415 + 24;
      const scrollLeft = direction === "left" ? -scrollAmount : scrollAmount;
      container.scrollBy({ left: scrollLeft, behavior: "smooth" });
    }
  };

  return (
    <Box position="relative">
      <Flex
        justify="space-between"
        align="center"
        borderBottom="2px solid #2CBBBC"
        mb={4}
        mt={8}
      >
        <Heading
          color="#FFFFFF"
          fontSize="20px"
          fontFamily="Montserrat"
          fontWeight="400"
        >
          {title}
        </Heading>
        <Box pb="0.5em">
          <IconButton
            aria-label="Scroll left"
            icon={<ArrowLeftIcon />}
            onClick={() => scroll("left")}
            color="#2CBBBC"
            bg="transparent"
            _hover={{
              bg: "transparent",
            }}
            opacity={canScrollLeft ? 1 : 0}
            pointerEvents={canScrollLeft ? "auto" : "none"}
            mr={2}
          />
          <IconButton
            aria-label="Scroll right"
            icon={<ArrowRightIcon />}
            onClick={() => scroll("right")}
            color="#2CBBBC"
            bg="transparent"
            _hover={{
              bg: "transparent",
            }}
            opacity={canScrollRight ? 1 : 0}
            pointerEvents={canScrollRight ? "auto" : "none"}
          />
        </Box>
      </Flex>
      <Flex position="relative">
        <Flex
          ref={scrollContainerRef}
          gap={6}
          overflowX="auto"
          css={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "-ms-overflow-style": "none",
            scrollbarWidth: "none",
          }}
        >
          {certificatePrograms.map((c) => (
            <CertificateProgram
              key={c.id}
              id={c.id}
              image={c.image}
              title={c.title}
              description={c.description}
            />
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};
