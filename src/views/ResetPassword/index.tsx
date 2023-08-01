import {
  Box,
  Button,
  Center,
  Image,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import logo from "../../../src/assets/mentumm-logo.svg";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const REACT_APP_NODE_API = process.env.REACT_APP_NODE_API || "";

const ResetPassword = () => {
  const { tokenId } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)

  const handlePasswordShowClick = () => setShowPassword(!showPassword)

  const handleSubmit = async (values, { setSubmitting }) => {
    await axios
      .post(`${REACT_APP_NODE_API}/v1/user/reset-password`, {
        reset_password_token: tokenId,
        password: values.new_password,
      })
      .then(() => {
        enqueueSnackbar("Password Reset Successfully!", {
          variant: "success",
        });
        navigate('/')
      })
      .catch((err) => {
        console.error(err);
        enqueueSnackbar("Something went wrong. Please try again.", {
          variant: "error",
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Container
      maxW="md"
      paddingTop={{ base: "4", md: "8" }}
      paddingBottom={{ base: "2", md: "6" }}
    >
      <Center>
        <Image
          src={logo}
          mb={20}
          alt="mentumm banner"
          w={{ base: "auto", lg: "233px" }}
        />
      </Center>
      <Formik
        initialValues={{
          new_password: "",
          retype_password: "",
        }}
        validationSchema={Yup.object().shape({
          new_password: Yup.string()
            .required("New password is required"),
          retype_password: Yup.string()
            .oneOf([Yup.ref("new_password"), null], "Passwords do not match")
            .required("Please confirm your password"),
        })}
        validateOnChange
        onSubmit={handleSubmit}
      >
        {({
          errors,
          touched,
          handleChange,
          handleBlur,
          values,
          isSubmitting,
        }) => {
          const bothTouched = touched.new_password && touched.retype_password;
          return (
            <Form>
              <Heading as="label" size="lg" fontWeight="normal">
                Change Password
              </Heading>
              <FormControl isInvalid={bothTouched && !!(errors.new_password || errors.retype_password)}>
                <Box mt={8}>
                  <FormLabel>New Password</FormLabel>
                  <InputGroup>
                    <Input
                      mb={8}
                      id="new_password"
                      name="new_password"
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
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
                  <FormLabel>Retype Your New Password</FormLabel>
                  <InputGroup>
                    <Input
                      id="retype_password"
                      name="retype_password"
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.retype_password}
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
                  <FormErrorMessage>
                    {String(errors.retype_password)}
                  </FormErrorMessage>
                  <Button
                    type="submit"
                    mt={6}
                    size="lg"
                    isLoading={isSubmitting}
                  >
                    Change Password
                  </Button>
                </Box>
              </FormControl>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default ResetPassword;
