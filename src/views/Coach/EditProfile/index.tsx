import {
  Heading,
  Box,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  Text,
  Flex,
  FormControl,
  FormErrorMessage,
  Container,
  Center,
  InputGroup,
  InputRightElement,
  Tag,
  HStack,
  FormHelperText,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import PageWrapper from "../../../components/PageWrapper";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { UserPublic, CoachType } from "../../../types";
import { usStates } from "../../../utils/states";
import { menApiAuthClient } from "../../../clients/mentumm";
import { mixpanelEvent } from "../../../helpers";
import { useSnackbar } from "notistack";
import { useCookies } from "react-cookie";
import Achievements from "./Achievements";
import Hobbies from "./Hobbies";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { Link } from "react-router-dom";

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
  const [showPassword, setShowPassword] = useState(false)
  const [coachStyles, setCoachStyles] = useState([]);
  const handlePasswordShowClick = () => setShowPassword(!showPassword)
  const [coachExpertise, setCoachExpertise] = useState([]);

  useEffect(() => {
    // ensure that only coaches can edit their own profiles
    if (currentUser && currentUser.id !== coachId) {
      navigate("/");
    }

    // query for coach data
    const loadCoach = async () => {
      try {
        const singleCoach = await menApiAuthClient().get("/coaches", {
          params: {
            id: currentUser.id,
          },
        });

        const coach: CoachType = singleCoach.data[0];
        setCoachStyles(coach.styles);

        mixpanelEvent("Coach Edit Profile Viewed", {
          "Coach ID": coach.id,
          "Coach Name": `${coach.first_name} ${coach.last_name}`,
          "Coach Styles": coachStyles.map((style) => style.name),
        });
      } catch (error) {
        console.log("Problem loading Coach Profile", error);
        throw new Error(error);
      }
    };
    loadCoach();

  }, [currentUser, coachId, navigate]);

  const handleUpdate = async (values: UserPublic) => {
    const {
      achievements1,
      achievements2,
      achievements3,
      hobbies1,
      hobbies2,
      hobbies3,
      hobbies4,
      hobbies5,
      hobbies6,
      update_password,
      retype_password,
      ...rest
    } = values;

    const updateValues = {
      ...rest,
      linkedin_url: ensureHttps(values.linkedin_url),
      instagram_url: ensureHttps(values.instagram_url),
      facebook_url: ensureHttps(values.facebook_url),
      website_url: ensureHttps(values.website_url),
      booking_url: ensureHttps(values.booking_url),
      achievements: JSON.stringify([
        achievements1,
        achievements2,
        achievements3,
      ]),
      hobbies: JSON.stringify([
        hobbies1,
        hobbies2,
        hobbies3,
        hobbies4,
        hobbies5,
        hobbies6,
      ]),
      id: currentUser.id,
    };
    update_password && (updateValues.password = update_password);

    await menApiAuthClient()
      .put("/user", updateValues)
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

  const handleSubmit = async (values: UserPublic) => {
    handleUpdate(values);
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
              hobbies1: currentUser.hobbies1 || "",
              hobbies2: currentUser.hobbies2 || "",
              hobbies3: currentUser.hobbies3 || "",
              hobbies4: currentUser.hobbies4 || "",
              hobbies5: currentUser.hobbies5 || "",
              hobbies6: currentUser.hobbies6 || "",
            }}
            validationSchema={Yup.object().shape({
              first_name: Yup.string().required("Required"),
              last_name: Yup.string().required("Required"),
              email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
              update_password: Yup.string().oneOf(
                [Yup.ref("retype_password")],
                "Passwords do not match"
              ),
              retype_password: Yup.string().oneOf(
                [Yup.ref("update_password")],
                "Passwords do not match"
              ),
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
                .max(100, "Must be 100 charatcers or less")
                .required("At least one achievement is required"),
              achievements2: Yup.string().max(
                100,
                "Must be 100 charatcers or less"
              ),
              achievements3: Yup.string().max(
                100,
                "Must be 100 charatcers or less"
              ),
              hobbies1: Yup.string()
                .max(25, "Must be 25 charatcers or less")
                .required("At least one hobby is required"),
              hobbies2: Yup.string().max(25, "Must be 25 charatcers or less"),
              hobbies3: Yup.string().max(25, "Must be 25 charatcers or less"),
              hobbies4: Yup.string().max(25, "Must be 25 charatcers or less"),
              hobbies5: Yup.string().max(25, "Must be 25 charatcers or less"),
              hobbies6: Yup.string().max(25, "Must be 25 charatcers or less"),
            })}
            validateOnChange
            onSubmit={async (
              values: UserPublic,
              { setSubmitting }: FormikHelpers<UserPublic>
            ) => {
              await handleSubmit(values);
              setSubmitting(false);
            }}
          >
            {(props) => {
              const {
                touched: { update_password, retype_password },
              } = props;
              const isTouchedPassword = !!(update_password && retype_password);
              return (
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
                        <FormErrorMessage>
                          {props.errors.state}
                        </FormErrorMessage>
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
                        <FormErrorMessage>
                          {props.errors.email}
                        </FormErrorMessage>
                      </FormControl>
                    </Box>
                    <Box flexBasis="50%">
                      <FormControl
                        isRequired
                        isInvalid={!!props.errors.phone_number}
                      >
                        <FormLabel htmlFor="phone_number">
                          Phone Number
                        </FormLabel>
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
                        isInvalid={!!props.errors.linkedin_url}
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
                          props.touched.website_url &&
                          !!props.errors.website_url
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
                        isInvalid={!!props.errors.booking_url}
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
                      <FormControl isRequired isInvalid={!!props.errors.bio}>
                        <FormLabel htmlFor="bio">
                          Please limit to one paragraph. You can write about
                          your years of experience, industry, or skills.
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
                    <Box flexBasis="100%" mt={10}>
                      <Flex>
                        <Heading
                          pt="2px"
                          as="h2"
                          size="md"
                          fontWeight="normal"
                        >
                          Top Areas of Expertise
                        </Heading>
                        {coachExpertise.length ? (
                          <Link to={`/coach/${currentUser.id}/expertise`}>
                            <Button
                              ml={2}
                              size="sm"
                              variant="ghost"
                            >
                              Edit
                            </Button>
                          </Link>
                        ) :
                          null
                        }
                      </Flex>
                      <Text fontSize="xs">
                        Select up to 6 Areas of Expertise
                      </Text>
                      <Box>
                        <HStack
                          mt={2}
                          spacing={2}>
                          {
                            coachExpertise.length ?
                              (coachExpertise.map((style) =>
                                <Tag
                                  color="white"
                                  bg="blue.600">
                                  {style.name}
                                </Tag>))
                              :
                              (<Link to={`/coach/${currentUser.id}/expertise`}>
                                <Tag
                                  mt={2}
                                  _hover={{ bg: "#5DBABD", color: "white" }}>
                                  ADD AREAS OF EXPERTISE
                                </Tag>
                              </Link>)
                          }
                        </HStack>
                      </Box>
                    </Box>
                    <Box flexBasis="100%" mt={10}>
                      <Flex>
                        <Heading
                          pt="2px"
                          as="h2"
                          size="md"
                          fontWeight="normal"
                        >
                          Coaching Styles
                        </Heading>
                        {coachStyles.length ? (
                          <Link to={`/coach/${currentUser.id}/coaching-style`}>
                            <Button
                              ml={2}
                              size="sm"
                              variant="ghost"
                            >
                              Edit
                            </Button>
                          </Link>
                        ) :
                          null
                        }
                      </Flex>
                      <FormControl>
                        <FormHelperText mt={0}>
                          Select up to 2 Coaching Styles
                        </FormHelperText>
                      </FormControl>
                      <Box>
                        <HStack
                          mt={2}
                          spacing={2}>
                          {
                            coachStyles.length ?
                              (coachStyles.map((style) =>
                                <Tag
                                  color="white"
                                  bg="blue.600">
                                  {style.name}
                                </Tag>))
                              :
                              (<Link to={`/coach/${currentUser.id}/coaching-style`}>
                                <Tag
                                  mt={2}
                                  _hover={{ bg: "#5DBABD", color: "white" }}>
                                  ADD COACHING STYLES
                                </Tag>
                              </Link>)
                          }
                        </HStack>
                      </Box>
                    </Box>
                    <Box flexBasis="100%" marginTop={4} marginBottom={6}>
                      <Achievements {...props} />
                      <Hobbies {...props} />
                      <Box flexBasis="100%" marginTop={10} marginBottom={6}>
                        <Heading as="label" size="md" fontWeight="normal">
                          Change Password
                        </Heading>
                      </Box>
                      <Box w="60%">
                        <FormControl
                          isInvalid={
                            isTouchedPassword && !!props.errors.retype_password
                          }
                        >
                          <Flex mt={4}>
                            <InputGroup>
                              <Input
                                htmlSize={26}
                                w="auto"
                                variant="outline"
                                id="update_password"
                                name="update_password"
                                type={showPassword ? "text" : "password"}
                                value={props.values.password}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                placeholder="Password"
                                marginRight={2}
                              />
                              <InputRightElement mr={4}>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  colorScheme={showPassword ? "blue" : "brand"}
                                  onClick={handlePasswordShowClick}
                                >
                                  {showPassword ? (
                                    <ViewIcon />
                                  ) : (
                                    <ViewOffIcon />
                                  )}
                                </Button>
                              </InputRightElement>
                            </InputGroup>
                            <InputGroup>
                              <Input
                                htmlSize={26}
                                autoComplete="new-password"
                                w="auto"
                                variant="outline"
                                id="retype_password"
                                name="retype_password"
                                type={showPassword ? "text" : "password"}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                placeholder="Retype Password"
                              />
                              <InputRightElement mr={4}>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={handlePasswordShowClick}
                                >
                                  {showPassword ? (
                                    <ViewIcon />
                                  ) : (
                                    <ViewOffIcon />
                                  )}
                                </Button>
                              </InputRightElement>
                            </InputGroup>
                          </Flex>
                          <Center>
                            <FormErrorMessage>
                              {props.errors.retype_password}
                            </FormErrorMessage>
                          </Center>
                        </FormControl>
                      </Box>
                    </Box>
                  </Box>
                  <Button
                    type="submit"
                    isDisabled={
                      props.isSubmitting || !!Object.keys(props.errors).length
                    }
                    mt="6"
                    size="lg"
                  >
                    Submit
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </Box>
      </Container>
    </PageWrapper>
  );
};
