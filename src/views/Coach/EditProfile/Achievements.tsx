import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { FormikProps } from "formik";
import React from "react";
import { UserPublic } from "../../../types";

const Achievements = (props: FormikProps<UserPublic>) => {
  return (
    <Box>
      <Box flexBasis="100%" marginTop={10} marginBottom={6}>
        <Heading as="label" size="md" fontWeight="normal">
          Top Achievements
        </Heading>
      </Box>
      <FormControl isRequired>
        <FormLabel htmlFor="achievements">
          {"Use short form response (up to 15 words per achievement)"}
        </FormLabel>
        <Stack direction="column" spacing={4}>
          <Input
            id="achievements1"
            name="achievements1"
            placeholder="Enter Achievement"
            value={props.values.achievements1}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
          />
          <Input
            id="achievements2"
            name="achievements2"
            placeholder="Enter Achievement"
            value={props.values.achievements2}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
          />
          <Input
            id="achievements3"
            name="achievements3"
            placeholder="Enter Achievement"
            value={props.values.achievements3}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
          />
        </Stack>
      </FormControl>
    </Box>
  );
};

export default Achievements;
