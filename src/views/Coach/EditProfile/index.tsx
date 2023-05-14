import {
  Heading,
  Box,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import PageWrapper from "../../../components/PageWrapper";
import { Form, Formik, FormikHelpers } from "formik";
import { UserPublic } from "../../../types";
import { usStates } from "../../../utils/states";
import { menApiAuthClient } from "../../../clients/mentumm";

export const EditProfile = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const { coachId } = useParams();

  useEffect(() => {
    // ensure that only coaches can edit their own profiles
    if (currentUser && currentUser.id !== coachId) {
      navigate("/");
    }
  }, [currentUser, coachId, navigate]);

  const handleSubmit = async (values: UserPublic) => {
    await menApiAuthClient().put("/user", {
      ...values,
      id: currentUser.id,
    });
    setCurrentUser({
      ...currentUser,
      ...values,
    });
  };

  if (!currentUser) {
    return null;
  }

  return (
    <PageWrapper>
      <Box>
        <Heading as="h1" size="lg">
          My Profile
        </Heading>
      </Box>

      <Box>
        <Formik
          initialValues={{
            first_name: currentUser.first_name || "",
            last_name: currentUser.last_name || "",
            email: currentUser.email || "",
            city: currentUser.city || "",
            state: currentUser.state || "",
            phone_number: currentUser.phone_number || "",
            linkedin_url: currentUser.linkedin_url || "",
            instagram_url: currentUser.instagram_url || "",
            facebook_url: currentUser.facebook_url || "",
            website_url: currentUser.website_url || "",
            booking_url: currentUser.booking_url || "",
            bio: currentUser.bio || "",
          }}
          onSubmit={(
            values: UserPublic,
            { setSubmitting }: FormikHelpers<UserPublic>
          ) => {
            setTimeout(async () => {
              await handleSubmit(values);
              setSubmitting(false);
            }, 500);
          }}
        >
          {(props) => (
            <Form>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
                flexDirection="row"
                flexWrap="wrap"
              >
                <Box flexBasis="100%" marginY="6">
                  <Heading as="h2" size="md" fontWeight="normal">
                    Personal Information
                  </Heading>
                </Box>
                <Box flex="50%" paddingEnd="6">
                  <FormLabel htmlFor="first_name">First Name</FormLabel>
                  <Input
                    variant="outline"
                    id="first_name"
                    name="first_name"
                    value={props.values.first_name}
                    onChange={props.handleChange}
                    placeholder="John"
                  />
                </Box>
                <Box flexBasis="50%">
                  <FormLabel htmlFor="last_name">Last Name</FormLabel>
                  <Input
                    variant="outline"
                    id="last_name"
                    name="last_name"
                    value={props.values.last_name}
                    onChange={props.handleChange}
                    placeholder="Savage"
                  />
                </Box>
                <Box flexBasis="50%" paddingEnd="6">
                  <FormLabel htmlFor="city">City</FormLabel>
                  <Input
                    variant="outline"
                    id="city"
                    name="city"
                    value={props.values.city}
                    onChange={props.handleChange}
                    placeholder="Nashville"
                  />
                </Box>
                <Box flexBasis="50%">
                  <FormLabel htmlFor="state">State</FormLabel>
                  <Select
                    id="state"
                    name="state"
                    onChange={props.handleChange}
                    value={props.values.state}
                    placeholder={props.values.state || "Select State..."}
                  >
                    {usStates.map((state) => {
                      return (
                        <option key={state.value} value={state.value}>
                          {state.label}
                        </option>
                      );
                    })}
                  </Select>
                </Box>
                <Box flexBasis="100%" marginY="6">
                  <Heading as="h2" size="md" fontWeight="normal">
                    Contact Information
                  </Heading>
                </Box>
                <Box flexBasis="50%" paddingEnd="6">
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    variant="outline"
                    id="email"
                    name="email"
                    value={props.values.email}
                    onChange={props.handleChange}
                    placeholder="john.savage@mentumm.com"
                  />
                </Box>
                <Box flexBasis="50%">
                  <FormLabel htmlFor="phone_number">Phone Number</FormLabel>
                  <Input
                    type="tel"
                    variant="outline"
                    id="phone_number"
                    name="phone_number"
                    value={props.values.phone_number}
                    onChange={props.handleChange}
                    placeholder="1235555555"
                  />
                </Box>
                <Box flexBasis="50%" paddingEnd="6">
                  <FormLabel htmlFor="linkedin_url">LinkedIn Profile</FormLabel>
                  <Input
                    variant="outline"
                    id="linkedin_url"
                    name="linkedin_url"
                    value={props.values.linkedin_url}
                    onChange={props.handleChange}
                    placeholder="https://linkedin.com/in/john.savage"
                  />
                </Box>
                <Box flexBasis="50%">
                  <FormLabel htmlFor="instagram_url">
                    Instagram Profile (optional)
                  </FormLabel>
                  <Input
                    variant="outline"
                    id="instagram_url"
                    name="instagram_url"
                    value={props.values.instagram_url}
                    onChange={props.handleChange}
                    placeholder="https://instagram.com/john.savage"
                  />
                </Box>
                <Box flexBasis="50%" paddingEnd="6">
                  <FormLabel htmlFor="facebook_url">Facebook Profile</FormLabel>
                  <Input
                    variant="outline"
                    id="facebook_url"
                    name="facebook_url"
                    value={props.values.facebook_url}
                    onChange={props.handleChange}
                    placeholder="https://facebook.com/john.savage"
                  />
                </Box>
                <Box flexBasis="50%">
                  <FormLabel htmlFor="website_url">Website URL</FormLabel>
                  <Input
                    variant="outline"
                    id="website_url"
                    name="website_url"
                    value={props.values.website_url}
                    onChange={props.handleChange}
                    placeholder="https://johnsavage-consulting.com"
                  />
                </Box>
                <Box flexBasis="100%" marginY="6">
                  <Heading as="h2" size="md" fontWeight="normal">
                    Mentumm-specific Calendly Booking Link
                  </Heading>
                </Box>
                <Box flex={1}>
                  <FormLabel htmlFor="booking_url">
                    Enter your Mentumm-specific Calendly link
                  </FormLabel>
                  <Input
                    variant="outline"
                    id="booking_url"
                    name="booking_url"
                    value={props.values.booking_url}
                    onChange={props.handleChange}
                    placeholder="https://calendly.com/johnsavage-mentumm"
                  />
                </Box>
                <Box flexBasis="100%" marginY="6">
                  <Heading as="label" size="md" fontWeight="normal">
                    Public Bio
                  </Heading>
                </Box>
                <Box flex={1}>
                  <span>
                    Please limit to one paragraph. You can write about your
                    years of experience, industry, or skills.
                  </span>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={props.values.bio}
                    onChange={props.handleChange}
                    placeholder="John resides in Nashville, TN where he loves to fish, golf, spend time with this family, and play the latest video games. He prides himself on human connection."
                  />
                </Box>
              </Box>

              {/* <label htmlFor="lastName">Last Name</label>
              <Field name="lastName" placeholder="Doe" />

              <label htmlFor="email">Email</label>
              <Field name="email" placeholder="jane@acme.com" type="email" /> */}

              <Button type="submit" disabled={props.isSubmitting}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </PageWrapper>
  );
};
