import React, { useState } from 'react';
import {
  Card,
  Spacer,
  Text,
  Flex,
  Box,
} from "@chakra-ui/react";
import { TagIcon } from '../TagIcon';
import { Tag } from '../../types';

type TagOptionProps = {
  tag: Tag;
  selectedItems: Number[];
  setSelectedItems: Function;
  toggleTag: Function;
  isMin?: boolean;
};

export const TagOption: React.FC<TagOptionProps> = ({
  tag,
  toggleTag,
  selectedItems,
  setSelectedItems,
  isMin,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isSelected = selectedItems.includes(Number(tag.id));
  const isSelectable = isMin ? true : selectedItems.length < 2;

  return (
    <Card
      h={isMin ? '70px' : '74px'}
      w={isMin ? 'auto' : '285px'}
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
      onClick={() => setSelectedItems(toggleTag(selectedItems, Number(tag.id), isMin))}
    >
      <Flex>
        <Box
          display={isMin ? 'flex' : ''}
          alignItems={isMin ? 'center' : ''}
        >
          <Text
            fontFamily="Saira"
            fontSize="20px"
            fontWeight="700"
          >
            {tag.name}
          </Text>
          {!isMin && (
            <Text
              fontFamily="Saira"
              fontSize="16px"
              fontWeight="400"
            >
              {tag.description.replace(/\s+/g, '')}
            </Text>
          )}
        </Box>
        <Spacer />
        <TagIcon
          ml={isMin ? '1em' : ''}
          isHovered={isHovered}
          isSelected={isSelected}
          isSelectable={isSelectable}
          icon={tag.slug}
          height="30px"
          width="30px"
        />
      </Flex>
    </Card>
  );
};