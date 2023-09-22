import React from 'react';
import {
  Text, WrapItem,
} from "@chakra-ui/react";
import { Tag, CoachType } from "../../types";

export const generateCoachTags = (tags: Tag[], slug: string, kind: string) => {
  let trimmedTags: Tag[] = [];

  if (tags.length > 2) {
    const remainingTags = tags.filter(tag => tag.slug !== slug);

    if (slug) {
      const matchingTag = tags.find(tag => tag.slug === slug);
      if (matchingTag) {
        trimmedTags.push(matchingTag);
      }
      trimmedTags = [...trimmedTags, ...remainingTags.slice(0, 2)];
    } else {
      trimmedTags = remainingTags.slice(0, 4);
    }

    // the extra +3 more tag
    const moreTag: Partial<Tag> = {
      id: Math.floor(Math.random() * (2000 - 1000) + 1000),
      name: `+ ${tags.length - 4} more`
    };

    trimmedTags.push(moreTag as Tag);
  } else {
    trimmedTags = tags;
  }

  return trimmedTags.map(tag => {
    const isStyle = kind === 'style';
    const tagName = isStyle ? tag.name.toUpperCase() : tag.name;
    const tagFontSize = isStyle ? 'sm' : 'xs';
    const tagFontColor = isStyle ? 'white' : 'black';

    return (
      <WrapItem lineHeight={1} >
        <Text
          fontSize={tagFontSize}
          key={tag.id}
          color={tagFontColor}
        >
          {tagName}
        </Text>
      </WrapItem>
    );
  });
};

export const generateCoachUrl = (coach: CoachType) => {
  const name = `${coach.first_name} ${coach.last_name}`;
  return name.replace(/\W|_/g, "-").toLowerCase() + `-${coach.id}`;
};