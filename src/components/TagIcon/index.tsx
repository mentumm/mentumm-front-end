import React from "react";
import { Icon } from "@chakra-ui/react";
import { IconProps } from "@chakra-ui/react";
import { iconComponents } from "./utils";

type TagIconProps = IconProps & {
  isHovered?: boolean;
  isSelected?: boolean;
  isSelectable?: boolean;
  isBgWhite?: boolean;
  icon: string;
};

export const TagIcon = ({
  isHovered,
  isSelected,
  isSelectable,
  icon,
  isBgWhite,
  ...rest
}: TagIconProps) => {
  const IconComponent = iconComponents[icon];

  return (
    <Icon
      as={IconComponent}
      mr={1}
      isHovered={isHovered}
      isSelected={isSelected}
      isSelectable={isSelectable}
      isBgWhite={isBgWhite}
      {...rest}
    />
  );
};
