import { useState, useEffect } from "react";
import { menApiAuthClient } from "../clients/mentumm";
import { CoachSkills } from "../types";

export const getTags = async () => {
  try {
    const tags = await menApiAuthClient().get<CoachSkills[]>("/tags");

    if (tags) {
      return tags.data;
    }
  } catch (error) {
    throw new Error("Could not load Coach Tags!");
  }
};

export const useGetTags = () => {
  const [coachTags, setCoachTags] = useState<CoachSkills[]>([]);

  useEffect(() => {
    const getCoachTags = async () => {
      const tags = await getTags();
      setCoachTags(tags);
    };

    getCoachTags();
  }, []);

  return coachTags;
};
