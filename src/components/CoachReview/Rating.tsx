import { HStack, Icon, StackProps, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { FaStar } from "react-icons/fa";

interface Props {
  max?: number;
  size?: string;
  rootProps?: StackProps;
  rating: number;
  setRating: (rating: number) => void;
  setErrors: (error: boolean) => void;
}

const Rating = (props: Props) => {
  const { max = 5, size, rootProps, rating, setRating, setErrors } = props;
  const color = useColorModeValue("gray.200", "gray.600");
  const activeColor = "var(--chakra-colors-brand-500)";

  return (
    <HStack spacing="0.5" {...rootProps}>
      {Array.from({ length: max })
        .map((_, index) => index + 1)
        .map((index) => (
          <Icon
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (index > 0) {
                setErrors(false);
                setRating(index);
              }
            }}
            key={index}
            as={FaStar}
            fontSize={size}
            color={index <= rating ? activeColor : color}
          />
        ))}
    </HStack>
  );
};

export default Rating;
