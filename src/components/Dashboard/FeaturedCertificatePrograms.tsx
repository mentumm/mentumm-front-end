import React from "react";
import CertificateProgram from "../CertificateProgram";
import { certificatePrograms } from "../../data/certificatePrograms";
import { ScrollSection } from "../ScrollSection";

export const FeaturedCertificatePrograms = ({ title }: { title: string }) => {
  return (
    <ScrollSection title={title}>
      {certificatePrograms.map((c) => (
        <CertificateProgram
          key={c.id}
          id={c.id}
          image={c.image}
          title={c.title}
          description={c.description}
        />
      ))}
    </ScrollSection>
  );
};
