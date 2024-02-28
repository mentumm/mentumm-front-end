import React from 'react'
import {
  HStack,
  Tag,
  TagLabel
} from '@chakra-ui/react'
import { TagIcon } from '../../TagIcon'

const StyleTags = ({ styles }) => {
  return (
    <HStack>
      {styles.map((tag) => {
        return (
          !!tag && (
            <Tag
              my={2}
              key={tag.id}
              backgroundColor='transparent'
              size="sm"
              color='brand.700'
              border='0.5px solid'
            >
              <TagIcon icon={tag.icon} isBgWhite={true} />
              <TagLabel fontWeight='700'>{tag.name.toUpperCase()}</TagLabel>
            </Tag>
          )
        )
      })}
    </HStack>
  )
}

export default StyleTags;