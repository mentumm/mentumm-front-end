import React, { useEffect, useRef, useState } from "react";
import { menApiAuthClient } from "../../../clients/mentumm";
import { EditProfileWrapper } from "../../../components/Wrappers/EditProfileWrapper";
import { urlRegex } from "../../../helpers/validators";
import { useNavigate, useParams } from "react-router";
import { useSnackbar } from "notistack";
import { Form, Formik, FormikHelpers } from "formik";
import { UserPublic } from "../../../types";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Select,
} from "@chakra-ui/react";
import { usStates } from "../../../utils/states";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import * as Yup from "yup";
import { useCookies } from "react-cookie";
import FileInput from "../../../components/FileInput";

const EditUserProfile = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState(null);
  const [, setCookie] = useCookies(["growth_10_03142023"]);

  useEffect(() => {
    if (currentUser && currentUser.id !== userId) {
      navigate("/");
    }
  }, [currentUser, navigate, userId]);

  const handlePasswordShowClick = () => setShowPassword(!showPassword);

  const handleUpdate = async (values: UserPublic) => {
    const { update_password } = values;
    const formData = new FormData();

    if (profileImage) {
      formData.append("avatar", profileImage);
    }

    for (const key in values) {
      if (key !== "update_password" && key !== "retype_password") {
        formData.append(key, values[key]);
      }
    }

    formData.append("id", currentUser.id);
    update_password && formData.append("password", update_password);

    try {
      await menApiAuthClient()
        .put("/user", formData)
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
        });
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Something went wrong. Please try again.", {
        variant: "error",
      });
    }
  };

  const handleSubmit = async (values: UserPublic) => {
    handleUpdate(values);
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    props: FormikHelpers<UserPublic>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileType = file.type;
      const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validImageTypes.includes(fileType)) {
        props.setFieldError(
          "photo_url",
          "Invalid file type. Must be a .jpg, .jpeg, or .png."
        );
        props.setFieldTouched("photo_url", true, false);
        return;
      }
      if (file.size > 12000000) {
        props.setFieldError(
          "photo_url",
          "File size too large. Must be less than 12MB."
        );
        props.setFieldTouched("photo_url", true, false);
        return;
      }
      props.setFieldError("photo_url", "");
      setProfileImage(file);
    }
  };

  const handleFileClear = (props: FormikHelpers<UserPublic>) => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setProfileImage(null);
    props.setFieldValue("photo_url", "");
  };

  if (!currentUser) {
    return null;
  }

  return (
    <EditProfileWrapper>
      <Formik
        initialValues={{
          first_name: currentUser?.first_name || "",
          last_name: currentUser?.last_name || "",
          city: currentUser?.city || "",
          state: currentUser?.state || "",
          email: currentUser?.email || "",
          phone_number: currentUser?.phone_number || "",
          linkedin_url: currentUser?.linkedin_url || "",
          photo_url: currentUser?.photo_url || "",
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
          city: Yup.string().required("Required"),
          state: Yup.string().required("Required"),
          phone_number: Yup.string().matches(
            /^(\+\d{1,3}[- ]?)?\d{10}$/,
            "Invalid phone number"
          ),
          linkedin_url: Yup.string().matches(urlRegex, "Invalid URL"),
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
                    Profile Picture
                  </Heading>
                </Box>
                <FormControl isInvalid={!!props.errors.photo_url}>
                  <FileInput
                    props={props}
                    currentUser={currentUser}
                    handleFileChange={handleFileChange}
                    handleFileClear={handleFileClear}
                    profileImage={profileImage}
                  />
                </FormControl>
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
                    isRequired
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
                    isRequired
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
                <Box flexBasis="100%">
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
                <Box flexBasis="50%" paddingEnd="6">
                  <FormControl isInvalid={!!props.errors.phone_number}>
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
                <Box flexBasis="50%">
                  <FormControl mb="4" isInvalid={!!props.errors.linkedin_url}>
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
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
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
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
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
              <Button
                type="submit"
                isDisabled={props.isSubmitting}
                mt="6"
                size="lg"
              >
                Submit
              </Button>
            </Form>
          );
        }}
      </Formik>
    </EditProfileWrapper>
  );
};

export default EditUserProfile;
