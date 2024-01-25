import React from "react";
import { Icon } from "@chakra-ui/react";
import {
  AnchorIcon,
  BookIcon,
  CrownIcon,
  DroneIcon,
  FireworksIcon,
  ShieldIcon,
  SubsetIcon,
} from "../../assets/Icons/StyleIcons";
import { IconProps } from "@chakra-ui/react";

type TagIconProps = IconProps & {
  isHovered?: boolean;
  isSelected?: boolean;
  icon: string;
};

const iconComponents = {
  shield: ShieldIcon,
  book: BookIcon,
  drone: DroneIcon,
  anchor: AnchorIcon,
  subset: SubsetIcon,
  fireworks: FireworksIcon,
  crown: CrownIcon,
};

export const TagIcon = ({ isHovered, isSelected, icon, ...rest }: TagIconProps) => {

  const IconComponent = iconComponents[icon];

  return (
    <Icon as={IconComponent} mr={2} isHovered={isHovered} isSelected={isSelected} {...rest} />
  );
};
