import React from 'react'
import {
  Box,
  Grid,
  Card,
  Heading
} from '@chakra-ui/react'
import { Tag } from '../../../types';

type TagsSectionProps = {
  tags: {
    category: string,
    data: Tag[];
  };
  selectedItems: Number[];
  setSelectedItems: Function;
};

export const TagsSection: React.FC<TagsSectionProps> = ({
  tags,
  selectedItems,
  setSelectedItems,
}) => {
  const toggleTag = (id: number) => {
    if (selectedItems.includes(id)) {
      return selectedItems.filter((item) => item !== id);
    }

    if (selectedItems.length < 6) {
      return [...selectedItems, id];
    }

    return selectedItems;
  }

  return (
    <Box my={8}>
      <Heading size="md" mb={4}>
        {tags.category}
      </Heading>
      <Grid
        pl={8}
        templateColumns="repeat(3, 1fr)"
        gap={4}
      >
        {tags.data.map((tag: Tag) => (
          <Card
            h="40px"
            w="279px"
            pl={4}
            pt={2}
            bg={selectedItems.includes(Number(tag.id)) ? "#C0E1FF" : "#EDF2F7"}
            _hover={{
              bg: selectedItems.length < 6 || selectedItems.includes(Number(tag.id)) ? "#C0E1FF" : "",
              cursor: selectedItems.length < 6 || selectedItems.includes(Number(tag.id)) ? "pointer" : "default"
            }}
            fontWeight="bold"
            fontSize="sm"
            key={tag.id}
            onClick={() => setSelectedItems(toggleTag(Number(tag.id)))}
          >
            {tag.name}
          </Card>
        ))}
      </Grid>
    </Box>
  )
}