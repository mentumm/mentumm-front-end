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
  Input
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import React from 'react';
import * as Yup from "yup";
import logo from "../Register/mentumm-logo.svg";
import { menApiAuthClient } from '../../clients/mentumm';
import { enqueueSnackbar } from 'notistack';

export const ResetPassword = () => {
  const handleSubmit = async (values, { setSubmitting }) => {
    await menApiAuthClient()
      .post('/user/reset-password', { token: '001', password: values.new_password }) //change token
      .then(() => {
        enqueueSnackbar("Password Reset Successfully!", {
          variant: "success",
        });
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
  }

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
          new_password: '',
          retype_password: '',
        }}
        validationSchema={Yup.object().shape({
          new_password: Yup.string().oneOf(
            [Yup.ref("retype_password")],
            "Passwords do not match"
          ),
          retype_password: Yup.string().oneOf(
            [Yup.ref("update_password")],
            "Passwords do not match"
          ),
        })}
        validateOnChange
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleChange, handleBlur, values, isSubmitting }) => {
          return (
            <Form>
              <Heading
                as="label"
                size="lg"
                fontWeight="normal"
              >
                Change Password
              </Heading>
              <FormControl
                isInvalid={touched.email && !!errors.email}
              >
                <Box
                  mt={8}
                >
                  <FormLabel
                  >
                    New Password
                  </FormLabel>
                  <Input
                    mb={8}
                    id="new_password"
                    name="new_password"
                    placeholder='Password'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {errors.new_password && touched.new_password && (
                    <FormErrorMessage>
                      {String(errors.new_password)}
                    </FormErrorMessage>
                  )}
                  <FormLabel
                  >
                    Retype Your New Password
                  </FormLabel>
                  <Input
                    id="retype_password"
                    name="retype_password"
                    placeholder='Password'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.retype_password}
                  />
                  {errors.retype_password && errors.retype_password && (
                    <FormErrorMessage>
                      {String(errors.retype_password)}
                    </FormErrorMessage>
                  )}
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
  )
}