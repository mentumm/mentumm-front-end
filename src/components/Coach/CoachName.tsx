import { Flex, FlexProps, Heading } from "@chakra-ui/react";
import * as React from "react";

interface CoachNameProps extends FlexProps {
  title: string;
  action?: React.ReactNode;
}

export const CoachName = (props: CoachNameProps) => {
  const { title, action, ...flexProps } = props;
  return (
    <Flex mt="5em" justifyContent="space-between" alignItems="center" {...flexProps}>
      <Heading color="white" size="lg" fontWeight="regular" letterSpacing="tight">
        {title}
      </Heading>
      {action ? action : null}
    </Flex>
  );
};
