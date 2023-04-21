import React from "react";
import { Icon } from "@chakra-ui/react";
import {
  FaRocket,
  FaHatWizard,
  FaSeedling,
  FaAnchor,
  FaLightbulb,
  FaFire,
  FaChessKing,
} from "react-icons/fa";

type TagIconProps = {
  icon: string;
};

export const TagIcon = ({ icon }: TagIconProps) => {
  switch (icon) {
    case "fa-solid fa-rocket":
      return <Icon as={FaRocket} mr={1} />;
    case "fa-solid fa-hat-wizard":
      return <Icon as={FaHatWizard} mr={1} />;
    case "fa-solid fa-seedling":
      return <Icon as={FaSeedling} mr={1} />;
    case "fa-solid fa-anchor":
      return <Icon as={FaAnchor} mr={1} />;
    case "fa-solid fa-lightbulb":
      return <Icon as={FaLightbulb} mr={1} />;
    case "fa-solid fa-fire-flame-curved":
      return <Icon as={FaFire} mr={1} />;
    case "fa-solid fa-chess-king":
      return <Icon as={FaChessKing} mr={1} />;
  }
};
