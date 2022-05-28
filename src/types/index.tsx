import { ReactNode } from "react";

export interface AppContainerProps {
  children: ReactNode;
}

export interface CurrentUserProps {
  currentUser: CurrentUser;
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

export interface CurrentUser {
  id: number;
  name: string;
  email: string;
  employer_id: number;
  last_sign_in?: Date;
}

export interface UserLoginProps {
  currentUser: CurrentUser;
  setCurrentUser: (currentUser: CurrentUser) => void;
}
