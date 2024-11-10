import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Flex, Heading } from "@chakra-ui/react";
import { certificatePrograms } from "../../data/mock/certificatePrograms";
import PageWrapper from "../../components/Wrappers/PageWrapper";

const CertificateProgram = () => {
  const { id } = useParams<{ id: string }>();
  const [program, setProgram] = useState(null);

  useEffect(() => {
    const fetchedProgram = certificatePrograms.find(
      (program) => program.id === parseInt(id)
    );
    setProgram(fetchedProgram);
  }, [id]);

  if (!program) return <div>Loading...</div>;

  return (
    <PageWrapper title={program.title} backTo="/home">
      <Flex>
        <div>content</div>
      </Flex>
    </PageWrapper>
  );
};

export default CertificateProgram;
