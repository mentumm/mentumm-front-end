import { Flex, FlexProps, Heading } from "@chakra-ui/react";
import * as React from "react";

interface CardHeaderProps extends FlexProps {
  title: string;
  isHovered?: boolean;
  action?: React.ReactNode;
}

export const CardHeader = ({ title, action, isHovered, ...flexProps }: CardHeaderProps) => {

  return (
    <Flex justifyContent="space-between" alignItems="center" {...flexProps}>
      <Heading
        size="md"
        color='white'
        fontWeight={isHovered ? '700' : '400'}
        letterSpacing="tight"
        marginEnd="6"
      >
        {title}
      </Heading>
      {action ? action : null}
    </Flex>
  );
};
