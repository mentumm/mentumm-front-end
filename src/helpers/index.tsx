import mixpanel from "mixpanel-browser";
import { CurrentUser } from "../types";

const MIXPANEL = process.env.REACT_APP_MIXPANEL;

export const mixpanelEvent = (event: string, properties: any) => {
  mixpanel.init(MIXPANEL);
  mixpanel.track(event, properties);
};

export const mixpanelIdentify = (userId: string) => {
  mixpanel.init(MIXPANEL);
  mixpanel.identify(userId);
};

export const mixpanelPeople = (user: CurrentUser) => {
  mixpanel.people.set({
    "User ID": user.id,
    Email: user.email,
    "Employer ID": user.employer_id,
    "First Name": user.first_name,
    "Last Name": user.last_name,
    "Last Sign In": user.last_sign_in,
  });
};
