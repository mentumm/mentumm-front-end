import React, { useState } from 'react';
import {
  Card,
  Spacer,
  Text,
  Flex,
  Box,
} from "@chakra-ui/react";
import { TagIcon } from '../../../../../components/TagIcon';
import { Tag } from '../../../../../types';

type TagOptionProps = {
  tag: Tag;
  selectedItems: Number[];
  setSelectedItems: Function;
  toggleTag: Function;
};

export const TagOption: React.FC<TagOptionProps> = ({
  tag,
  toggleTag,
  selectedItems,
  setSelectedItems,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isSelected = selectedItems.includes(Number(tag.id));
  const isSelectable = selectedItems.length < 2;

  return (
    <Card
      h="74px"
      w="285px"
      pl={4}
      pt={2}
      border="1px solid rgba(255, 255, 255, 1)"
      color={isSelected ? "#4A4A4A" : "white"}
      bg={isSelected ? "white" : "#0D1C31"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        opacity: !isSelectable && !isSelected ? 0.4 : 1,
      }}
      _hover={{
        color: isSelected || !isSelectable ? "" : "brand.500",
        boxShadow: isSelectable && 'inset 0 0 0 2px white',
        cursor: isSelectable || isSelected ? "pointer" : "default"
      }}
      fontWeight="bold"
      fontSize="sm"
      key={tag.id}
      onClick={() => setSelectedItems(toggleTag(Number(tag.id)))}
    >
      <Flex>
        <Box>
          <Text
            fontFamily="Saira"
            fontSize="18px"
            fontWeight="700"
          >
            {tag.name}
          </Text>
          <Text
            fontFamily="Saira"
            fontSize="16px"
            fontWeight="400"
          >
            {tag.description.replace(/\s+/g, '')}
          </Text>
        </Box>
        <Spacer />
        <TagIcon
          isHovered={isHovered}
          isSelected={isSelected}
          isSelectable={isSelectable}
          icon={tag.icon}
          height="50px"
          width="50px"
        />
      </Flex>
    </Card>
  );
};