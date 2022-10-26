import axios from "axios";
import { useState, useEffect } from "react";
import envConfig from "../envConfig";
import { CoachSkills } from "../types";

export const getTags = async () => {
  try {
    const tags = await axios.get<CoachSkills[]>(`${envConfig.API_URL}/v1/tags`);

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
}
