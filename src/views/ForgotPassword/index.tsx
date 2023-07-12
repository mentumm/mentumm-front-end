import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import * as Yup from "yup";
import logo from "../../../src/assets/mentumm-logo.svg";
import { Formik, Form } from "formik";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

const REACT_APP_NODE_API = process.env.REACT_APP_NODE_API || "";

export const ForgotPassword = () => {
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    await axios
      .post(`${REACT_APP_NODE_API}/v1/user/forgot-password`, {
        email: values.email,
      })
      .then(() => {
        enqueueSnackbar("Password Reset Link sent!", {
          variant: "success",
        });
        setSuccess(true);
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
          email: "",
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
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
          return (
            <Form>
              <Heading as="label" size="lg" fontWeight="normal">
                Recover Password
              </Heading>
              <FormControl isInvalid={touched.email && !!errors.email}>
                <FormHelperText>
                  Don't worry. Happens to the best of us.
                </FormHelperText>
                <Box mt={8}>
                  {success ? (
                    <Text>
                      An email has been sent. Please click the link when you get
                      it.
                    </Text>
                  ) : (
                    <Box>
                      <FormLabel>Your Email</FormLabel>
                      <Input
                        id="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                      {errors.email && touched.email && (
                        <FormErrorMessage>
                          {String(errors.email)}
                        </FormErrorMessage>
                      )}
                      <Button
                        type="submit"
                        mt={6}
                        size="lg"
                        isLoading={isSubmitting}
                      >
                        Email Recovery Link
                      </Button>
                    </Box>
                  )}
                </Box>
              </FormControl>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};
