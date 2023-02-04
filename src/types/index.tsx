import { ReactNode } from "react";

export interface AppContainerProps {
  children: ReactNode;
}

export interface CurrentUserProps {
  currentUser: CurrentUser;
}

export interface CoachBooking {
  id: number;
  user_id: number;
  coach_id: number;
  event_type_uuid?: string;
  event_type_name?: string;
  event_start_time?: string;
  event_end_time?: string;
  invitee_uuid?: string;
  invitee_full_name?: string;
  invitee_email?: string;
  user_review: CoachUserRating;
}

export interface CoachUserRating {
  additional_comments: string;
  coach_id: number;
  created_at: string;
  id: number;
  primary_topic: string;
  rating_listening: number;
  rating_overall: number;
  updated_at: string;
  user_coach_id: number;
  user_id: number;
  user_learned: boolean;
  user_would_book_again: boolean;
}

export interface CoachProps {
  coachInfo: CoachType;
  slug?: string;
  booking?: CoachBooking;
  currentUser?: CurrentUser;
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
  slug: string;
  description: string;
  created_at: string;
  updated_at: string;
  category: "Professional" | "Leadership" | "Personal";
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
  userCoachId?: number;
}

export interface CoachReviewProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: (success?: boolean) => void;
  coach: CoachType;
  currentUser: CurrentUser;
  userCoachId?: number;
}
