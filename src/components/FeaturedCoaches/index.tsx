import React from "react";
import { CoachType } from "../../types";
import Coach from "../Coach";
import { ScrollSection } from "../ScrollSection";

interface IProps {
  title: string;
  coaches: CoachType[];
}

const FeaturedCoaches: React.FC<IProps> = ({ title, coaches }) => {
  return (
    <ScrollSection title={title}>
      {coaches.map((c) => (
        <Coach coachInfo={c} key={c.id} />
      ))}
    </ScrollSection>
  );
};

export default FeaturedCoaches;
