import React from "react";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import { FormikProps } from "formik";
import { UserPublic } from "../../../types";

const Hobbies = (props: FormikProps<UserPublic>) => {
  return (
    <Box>
      <Box flexBasis="100%" marginTop={10} marginBottom={6}>
        <Heading as="label" size="md" fontWeight="normal">
          Favorite Hobbies
        </Heading>
      </Box>
      <FormControl
        isRequired
      >
        <FormLabel htmlFor="hobbies">
          {"Use short form response (1-2 words per hobby)"}
        </FormLabel>
      </FormControl>
      <SimpleGrid columns={2} spacing={4}>
        <FormControl
          isInvalid={
            props.touched.hobbies1 && !!props.errors.hobbies1}
        >
          <Input
            id="hobbies1"
            name="hobbies1"
            placeholder="Enter Hobby"
            value={props.values.hobbies1}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
          />
          <FormErrorMessage>{props.errors.hobbies1}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={props.touched.hobbies2 && !!props.errors.hobbies2}
        >
          <Input
            id="hobbies2"
            name="hobbies2"
            placeholder="Enter Hobby"
            value={props.values.hobbies2}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
          />
          <FormErrorMessage>{props.errors.hobbies2}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={props.touched.hobbies3 && !!props.errors.hobbies3}
        >
          <Input
            id="hobbies3"
            name="hobbies3"
            placeholder="Enter Hobby"
            value={props.values.hobbies3}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
          />
          <FormErrorMessage>{props.errors.hobbies3}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={props.touched.hobbies4 && !!props.errors.hobbies4}
        >
          <Input
            id="hobbies4"
            name="hobbies4"
            placeholder="Enter Hobby"
            value={props.values.hobbies4}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
          />
          <FormErrorMessage>{props.errors.hobbies4}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={props.touched.hobbies5 && !!props.errors.hobbies5}
        >
          <Input
            id="hobbies5"
            name="hobbies5"
            placeholder="Enter Hobby"
            value={props.values.hobbies5}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
          />
          <FormErrorMessage>{props.errors.hobbies5}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={props.touched.hobbies6 && !!props.errors.hobbies6}
        >
          <Input
            id="hobbies6"
            name="hobbies6"
            placeholder="Enter Hobby"
            value={props.values.hobbies6}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
          />
          <FormErrorMessage>{props.errors.hobbies6}</FormErrorMessage>
        </FormControl>
      </SimpleGrid>
    </Box>
  );
};

export default Hobbies;
