import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Flex, Heading, Text } from "@chakra-ui/react";
import {
  certificatePrograms,
  CertificateProgram as CertificateProgramType,
  Module,
} from "../../data/mock/certificatePrograms";
import PageWrapper from "../../components/Wrappers/PageWrapper";
import ModuleModal from "./ModuleModal";
const CertificateProgram = () => {
  const { id } = useParams<{ id: string }>();
  const [program, setProgram] = useState<CertificateProgramType | null>(null);

  useEffect(() => {
    const fetchedProgram = certificatePrograms.find(
      (program) => program.id === parseInt(id)
    );
    setProgram(fetchedProgram || null);
  }, [id]);

  if (!program) return <div>Loading...</div>;

  const Module = (module: Module, index: number) => {
    return (
      <Flex
        textAlign="left"
        direction="column"
        gap={2}
        padding={6}
        w="600px"
        height="fit-content"
        borderRadius="30px"
        border="2px solid #FFFFFF"
        fontSize="18px"
        bgColor="brand.300"
        fontFamily="Montserrat"
      >
        <Heading size="md">{`${index + 1}. ${module.title}`}</Heading>
        <Text fontWeight="normal">{module.description}</Text>
        <ModuleModal module={module} />
      </Flex>
    );
  };

  return (
    <PageWrapper title={program.title} backTo="/home">
      <Flex
        maxW="1000px"
        mx="auto"
        direction="column"
        align="center"
        gap={4}
        wrap="wrap"
        mb={4}
      >
        {program.modules.map((module: Module, index: number) => {
          return Module(module, index);
        })}
      </Flex>
    </PageWrapper>
  );
};

export default CertificateProgram;
