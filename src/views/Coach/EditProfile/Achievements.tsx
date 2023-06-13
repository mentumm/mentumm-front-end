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
import { createUseStyles } from "react-jss";
import { UserPublic } from "../../../types";

const useStyles = createUseStyles({
  root: {},
});

const Achievements = (props: FormikProps<UserPublic>) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
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
          <Input id="achievements1" placeholder="Enter Achievement" />
          <Input id="achievements2" placeholder="Enter Achievement" />
          <Input id="achievements3" placeholder="Enter Achievement" />
        </Stack>
      </FormControl>
    </div>
  );
};

export default Achievements;
