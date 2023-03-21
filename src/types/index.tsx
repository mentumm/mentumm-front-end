import { ReactNode } from "react";

export interface AppContainerProps {
  children: ReactNode;
}

export interface CurrentUserProps {
  currentUser: CurrentUser;
}

export interface User {
  id: string | number;
  first_name: string;
  last_name: string;
  email: string;
  employer_id: number;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
  password: string;
  reset_password_token: string;
  reset_password_expiration: Date;
  last_sign_in: Date;
  bio?: string;
  photo_url?: string;
  booking_url?: string;
  linkedin_url: string;
  location?: string; // deprecated
  legacy_coach_id?: string | number; // only for initial migration, should not really be used outside of migrations, so dont use it
  city?: string;
  state?: string;
  role: "coach" | "user";
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

export interface CoachType extends User {
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

export interface Workshop {
  id: string | number;
  name: string;
  vimeo_id: string;
  workbook_url: string;
  year: number;
  month: number;
  hidden: 1 | 0;
  created_at: Date;
  updated_at?: Date;
}

export interface StyleType {
  id: number;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
  created_at: Date;
  updated_at?: Date;
}
