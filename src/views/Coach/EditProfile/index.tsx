import {
  Heading,
  Box,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  FormControl,
  FormErrorMessage,
  Container,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import PageWrapper from "../../../components/PageWrapper";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { UserPublic } from "../../../types";
import { usStates } from "../../../utils/states";
import { menApiAuthClient } from "../../../clients/mentumm";
import { useSnackbar } from "notistack";
import { useCookies } from "react-cookie";
import Achievements from "./Achievements";

const urlRegex = /^(?:([a-z]+):)?(\/\/)?([^\s$.?#].[^\s]*)$/i;

function ensureHttps(url: string) {
  if (!url) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  } else {
    return `https://${url}`;
  }
}

export const EditProfile = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const { coachId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [, setCookie] = useCookies(["growth_10_03142023", "growth_10_token"]);

  useEffect(() => {
    // ensure that only coaches can edit their own profiles
    if (currentUser && currentUser.id !== coachId) {
      navigate("/");
    }
  }, [currentUser, coachId, navigate]);

  const handleSubmit = async (values: UserPublic) => {
    await menApiAuthClient()
      .put("/user", {
        ...values,
        linkedin_url: ensureHttps(values.linkedin_url),
        instagram_url: ensureHttps(values.instagram_url),
        facebook_url: ensureHttps(values.facebook_url),
        website_url: ensureHttps(values.website_url),
        booking_url: ensureHttps(values.booking_url),
        id: currentUser.id,
      })
      .then(() => {
        const user = {
          ...currentUser,
          ...values,
        };
        setCurrentUser(user);
        setCookie("growth_10_03142023", user, {
          path: "/",
          secure: true,
          expires: new Date(Date.now() + 3600 * 1000 * 48),
          sameSite: true,
        });
        enqueueSnackbar("Profile updated successfully!", {
          variant: "success",
        });
      })
      .catch((err) => {
        console.error(err);
        enqueueSnackbar("Something went wrong. Please try again.", {
          variant: "error",
        });
      });
  };

  if (!currentUser) {
    return null;
  }

  return (
    <PageWrapper>
      <Container maxW="container.lg">
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
              achievements1: currentUser.achievements1 || "",
              achievements2: currentUser.achievements2 || "",
              achievements3: currentUser.achievements3 || "",
            }}
            validationSchema={Yup.object().shape({
              first_name: Yup.string().required("Required"),
              last_name: Yup.string().required("Required"),
              email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
              city: Yup.string(),
              state: Yup.string(),
              phone_number: Yup.string()
                .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Invalid phone number")
                .required("Required"),
              linkedin_url: Yup.string()
                .matches(urlRegex, "Invalid URL")
                .required("Required"),
              instagram_url: Yup.string().matches(urlRegex, "Invalid URL"),
              facebook_url: Yup.string().matches(urlRegex, "Invalid URL"),
              website_url: Yup.string().matches(urlRegex, "Invalid URL"),
              booking_url: Yup.string()
                .matches(urlRegex, "Invalid URL")
                .test(
                  "calendly",
                  "URL must be a Calendly URL.",
                  (value) => value && value.includes("calendly.com")
                )
                .required("Required"),
              bio: Yup.string()
                .max(500, "Must be 500 charatcers or less")
                .required("Required"),
              achievements1: Yup.string()
                .max(15, "Must be 15 charatcers or less")
                .required("At least one achievement is required"),
              achievements2: Yup.string().max(
                15,
                "Must be 15 charatcers or less"
              ),
              achievements3: Yup.string().max(
                15,
                "Must be 15 charatcers or less"
              ),
            })}
            onSubmit={async (
              values: UserPublic,
              { setSubmitting }: FormikHelpers<UserPublic>
            ) => {
              await handleSubmit(values);
              setSubmitting(false);
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
                    <FormControl
                      isRequired
                      mb="4"
                      isInvalid={
                        props.touched.first_name && !!props.errors.first_name
                      }
                    >
                      <FormLabel htmlFor="first_name">First Name</FormLabel>
                      <Input
                        variant="outline"
                        id="first_name"
                        name="first_name"
                        value={props.values.first_name}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        placeholder="John"
                      />
                      <FormErrorMessage>
                        {props.errors.first_name}
                      </FormErrorMessage>
                    </FormControl>
                  </Box>
                  <Box flexBasis="50%">
                    <FormControl
                      isRequired
                      isInvalid={
                        props.touched.last_name && !!props.errors.last_name
                      }
                    >
                      <FormLabel htmlFor="last_name">Last Name</FormLabel>
                      <Input
                        variant="outline"
                        id="last_name"
                        name="last_name"
                        value={props.values.last_name}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        placeholder="Savage"
                      />
                      <FormErrorMessage>
                        {props.errors.last_name}
                      </FormErrorMessage>
                    </FormControl>
                  </Box>
                  <Box flexBasis="50%" paddingEnd="6">
                    <FormControl
                      isInvalid={props.touched.city && !!props.errors.city}
                    >
                      <FormLabel htmlFor="city">City</FormLabel>
                      <Input
                        variant="outline"
                        id="city"
                        name="city"
                        value={props.values.city}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        placeholder="Nashville"
                      />
                      <FormErrorMessage>{props.errors.city}</FormErrorMessage>
                    </FormControl>
                  </Box>
                  <Box flexBasis="50%">
                    <FormControl
                      isInvalid={props.touched.state && !!props.errors.state}
                    >
                      <FormLabel htmlFor="state">State</FormLabel>
                      <Select
                        id="state"
                        name="state"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
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
                      <FormErrorMessage>{props.errors.state}</FormErrorMessage>
                    </FormControl>
                  </Box>
                  <Box flexBasis="100%" marginTop={10} marginBottom={6}>
                    <Heading as="h2" size="md" fontWeight="normal">
                      Contact Information
                    </Heading>
                  </Box>
                  <Box flexBasis="50%" paddingEnd="6">
                    <FormControl
                      isRequired
                      mb="4"
                      isInvalid={props.touched.email && !!props.errors.email}
                    >
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input
                        variant="outline"
                        id="email"
                        name="email"
                        value={props.values.email}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        placeholder="john.savage@mentumm.com"
                      />
                      <FormErrorMessage>{props.errors.email}</FormErrorMessage>
                    </FormControl>
                  </Box>
                  <Box flexBasis="50%">
                    <FormControl
                      isRequired
                      isInvalid={
                        props.touched.phone_number &&
                        !!props.errors.phone_number
                      }
                    >
                      <FormLabel htmlFor="phone_number">Phone Number</FormLabel>
                      <Input
                        type="tel"
                        variant="outline"
                        id="phone_number"
                        name="phone_number"
                        value={props.values.phone_number}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        placeholder="1235555555"
                      />
                      <FormErrorMessage>
                        {props.errors.phone_number}
                      </FormErrorMessage>
                    </FormControl>
                  </Box>
                  <Box flexBasis="50%" paddingEnd="6">
                    <FormControl
                      isRequired
                      mb="4"
                      isInvalid={
                        props.touched.linkedin_url &&
                        !!props.errors.linkedin_url
                      }
                    >
                      <FormLabel htmlFor="linkedin_url">
                        LinkedIn Profile
                      </FormLabel>
                      <Input
                        variant="outline"
                        id="linkedin_url"
                        name="linkedin_url"
                        value={props.values.linkedin_url}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        placeholder="https://linkedin.com/in/john.savage"
                      />
                      <FormErrorMessage>
                        {props.errors.linkedin_url}
                      </FormErrorMessage>
                    </FormControl>
                  </Box>
                  <Box flexBasis="50%">
                    <FormControl
                      isInvalid={
                        props.touched.instagram_url &&
                        !!props.errors.instagram_url
                      }
                    >
                      <FormLabel htmlFor="instagram_url">
                        {"Instagram Profile (Optional)"}
                      </FormLabel>
                      <Input
                        variant="outline"
                        id="instagram_url"
                        name="instagram_url"
                        value={props.values.instagram_url}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        placeholder="https://instagram.com/john.savage"
                      />
                      <FormErrorMessage>
                        {props.errors.instagram_url}
                      </FormErrorMessage>
                    </FormControl>
                  </Box>
                  <Box flexBasis="50%" paddingEnd="6">
                    <FormControl
                      mb="4"
                      isInvalid={
                        props.touched.facebook_url &&
                        !!props.errors.facebook_url
                      }
                    >
                      <FormLabel htmlFor="facebook_url">
                        {"Facebook Profile (Optional)"}
                      </FormLabel>
                      <Input
                        variant="outline"
                        id="facebook_url"
                        name="facebook_url"
                        value={props.values.facebook_url}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        placeholder="https://facebook.com/john.savage"
                      />
                      <FormErrorMessage>
                        {props.errors.facebook_url}
                      </FormErrorMessage>
                    </FormControl>
                  </Box>
                  <Box flexBasis="50%">
                    <FormControl
                      isInvalid={
                        props.touched.website_url && !!props.errors.website_url
                      }
                    >
                      <FormLabel htmlFor="website_url">
                        {"Website URL (Optional)"}
                      </FormLabel>
                      <Input
                        variant="outline"
                        id="website_url"
                        name="website_url"
                        value={props.values.website_url}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        placeholder="https://johnsavage-consulting.com"
                      />
                      <FormErrorMessage>
                        {props.errors.website_url}
                      </FormErrorMessage>
                    </FormControl>
                  </Box>
                  <Box flexBasis="100%" marginTop={10} marginBottom={6}>
                    <Heading as="h2" size="md" fontWeight="normal">
                      Mentumm-specific Calendly Booking Link
                    </Heading>
                  </Box>
                  <Box flex={1}>
                    <FormControl
                      isRequired
                      isInvalid={
                        props.touched.booking_url && !!props.errors.booking_url
                      }
                    >
                      <FormLabel htmlFor="booking_url">
                        Enter your Mentumm-specific Calendly link
                      </FormLabel>
                      <Input
                        variant="outline"
                        id="booking_url"
                        name="booking_url"
                        value={props.values.booking_url}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        placeholder="https://calendly.com/johnsavage-mentumm"
                      />
                      <FormErrorMessage>
                        {props.errors.booking_url}
                      </FormErrorMessage>
                    </FormControl>
                  </Box>
                  <Box flexBasis="100%" marginTop={10} marginBottom={6}>
                    <Heading as="label" size="md" fontWeight="normal">
                      Public Bio
                    </Heading>
                  </Box>
                  <Box flex={1}>
                    <FormControl
                      isRequired
                      isInvalid={props.touched.bio && !!props.errors.bio}
                    >
                      <FormLabel htmlFor="bio">
                        Please limit to one paragraph. You can write about your
                        years of experience, industry, or skills.
                      </FormLabel>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={props.values.bio}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        placeholder="John resides in Nashville, TN where he loves to fish, golf, spend time with this family, and play the latest video games. He prides himself on human connection."
                      />
                      <FormErrorMessage>{props.errors.bio}</FormErrorMessage>
                    </FormControl>
                  </Box>
                </Box>
                <Box>
                  <Achievements {...props} />
                </Box>
                <Button
                  type="submit"
                  disabled={props.isSubmitting}
                  mt="6"
                  size="lg"
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </PageWrapper>
  );
};
