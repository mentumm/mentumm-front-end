import { useState, useEffect } from "react";
import { menApiAuthClient } from "../clients/mentumm";
import { Tag } from "../types";

export const getTags = async () => {
  try {
    const tags = await menApiAuthClient().get<Tag[]>("/tags?kind=expertise");

    if (tags) {
      return tags.data;
    }
  } catch (error) {
    throw new Error("Could not load Coach Tags!");
  }
};

export const useGetTags = () => {
  const [coachTags, setCoachTags] = useState<Tag[]>([]);

  useEffect(() => {
    const getCoachTags = async () => {
      const tags = await getTags();
      setCoachTags(tags);
    };

    getCoachTags();
  }, []);

  return coachTags;
};
