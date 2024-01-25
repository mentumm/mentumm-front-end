import React from 'react';
import {
  Flex,
} from '@chakra-ui/react';
import { TagOption } from '../TagOption';
import { Tag } from '../../../../../types';

type ContentContainerProps = {
  tags: Tag[];
  selectedItems: Number[];
  setSelectedItems: Function;
};

export const ContentContainer: React.FC<ContentContainerProps> = ({
  tags,
  selectedItems,
  setSelectedItems,
}) => {

  const toggleTag = (id: number) => {
    if (selectedItems.includes(id)) {
      return selectedItems.filter((item) => item !== id);
    }

    if (selectedItems.length < 2) {
      return [...selectedItems, id];
    }

    return selectedItems;
  }
  return (
    <Flex
      pl={8}
      wrap='wrap'
      maxW='container.xl'
      gap={8}
      justifyContent='center'
    >
      {tags.map((tag: Tag) => (
        <TagOption
          tag={tag}
          toggleTag={toggleTag}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      ))}
    </Flex>
  );
};