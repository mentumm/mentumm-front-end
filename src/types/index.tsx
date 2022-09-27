import { ReactNode } from "react";

export interface AppContainerProps {
  children: ReactNode;
}

export interface CurrentUserProps {
  currentUser: CurrentUser;
}

export interface CoachProps {
  coachInfo: CoachType;
  slug: string;
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
  first_name: string;
  last_name: string;
  email: string;
  employer_id: number;
  last_sign_in?: Date;
}

export interface UserLoginProps {
  currentUser: CurrentUser;
  setCurrentUser: (currentUser: CurrentUser) => void;
}

export interface LocationState {
  currentUser: CurrentUser;
  coachTags: CoachSkills[];
}

export interface ReviewFormType {
  user_id: string | number;
  coach_id: string | number;
  rating_overall: number;
  rating_listening: number;
  additional_comments?: string | null;
  primary_topic: string;
  user_learned: boolean;
  user_would_book_again: boolean;
}

export interface ReviewFormProps {
  submitForm: (form: ReviewFormType) => void;
  currentUser: CurrentUser;
  coach: CoachType;
}

export interface CoachReviewProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  coach: CoachType;
  currentUser: CurrentUser;
}
