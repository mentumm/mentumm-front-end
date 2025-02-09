import React from 'react';
import {
  Flex,
} from '@chakra-ui/react';
import { TagOption } from '../../../../../components/TagOption';
import { toggleTag } from '../../../../../components/TagOption/utils';
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
  return (
    <Flex
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