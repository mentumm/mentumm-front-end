import { ReactNode } from "react";

export interface AppContainerProps {
  children: ReactNode;
}

export interface CoachProps {
  coachInfo: CoachType;
}

export interface CoachType {
  name: string;
  id: number;
  bio: string;
  photo_url: string;
  booking_link: string;
  linkedin_url: string;
  location: string;
  deleted_at: string;
  created_at: string;
  updated_at: string;
  skills: CoachSkills[];
}

export interface CoachSkills {
  id: number;
  name: string;
  description: string;
  slug: string;
}
