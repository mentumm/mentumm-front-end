import React from "react";
import { IconProps } from "@chakra-ui/react";
import AnchorIcon from '../../assets/Icons/MentummIcons/anchor.svg';
import ChallengerIcon from '../../assets/Icons/MentummIcons/challenger.svg';
import CheerleaderIcon from '../../assets/Icons/MentummIcons/cheerleader.svg';
import EducatorIcon from '../../assets/Icons/MentummIcons/educator.svg';
import IdeatorIcon from '../../assets/Icons/MentummIcons/ideator.svg';
import ProtectorIcon from '../../assets/Icons/MentummIcons/protector.svg';
import SponsorIcon from '../../assets/Icons/MentummIcons/sponsor.svg';

const iconComponents = {
  anchor: AnchorIcon,
  challenger: ChallengerIcon,
  cheerleader: CheerleaderIcon,
  educator: EducatorIcon,
  ideator: IdeatorIcon,
  protector: ProtectorIcon,
  sponsor: SponsorIcon,
};

type TagIconProps = IconProps & {
  isHovered?: boolean;
  isSelected?: boolean;
  isSelectable?: boolean;
  isBgWhite?: boolean;
  icon: string;
  ml?: string;
  width?: string;
  height?: string;
};

export const TagIcon = ({
  isSelected,
  isBgWhite,
  icon,
  ml,
  width,
  height,
}: TagIconProps) => {
  const IconComponent = iconComponents[icon];

  const color = () => {
    if (isSelected) {
      return "#4A4A4A";
    }
    if (isBgWhite) {
      return "brand.700";
    }
    return "white"
  }

  return (
    <img
      src={IconComponent}
      alt={`${icon} icon`}
      style={{
        width: width || '14px',
        height: height || '14px',
        marginRight: '1rem',
        marginLeft: ml,
        filter: color() === 'white' ? 'invert(1)' : 'invert(0.7)',
        pointerEvents: 'none'
      }}
    />
  );
};
