import React from 'react';
import {
  Stack,
  Heading,
  Wrap,
  Tag,
  Text,
} from '@chakra-ui/react';
import { CoachType } from '../../../types';
import { TagIcon } from '../../../components/TagIcon';

type CoachingStylesProps = {
  coach: CoachType;
}

const CoachingStyles: React.FC<CoachingStylesProps> = ({ coach }) => {
  return (
    <Stack spacing="4">
      <Heading size='md' >
        Coaching Style
      </Heading>
      <Wrap shouldWrapChildren>
        {(coach.styles.map((style) => (
          <Tag
            p={2}
            key={style.id}>
            <TagIcon icon={style.icon} />
            <Text pl={2} >
              {style.name}
            </Text>
          </Tag>
        )))
        }
      </Wrap>
    </Stack>
  )
}

export default CoachingStyles;