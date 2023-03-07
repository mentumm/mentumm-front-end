import React from "react";
import { createUseStyles } from "react-jss";
import { CurrentUser } from "../../types";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, FormLabel, Input, Stack } from "@chakra-ui/react";

const useStyles = createUseStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

type ActionPlanProps = {
  currentUser: CurrentUser;
};

const ActionPlan = ({ currentUser }: ActionPlanProps): JSX.Element => {
  const classes = useStyles();

  const handleSubmit = async (values: any) => {
    // console.log(values);
  };

  return (
    <div className={classes.root}>
      <div>Your Monthly Action Plan</div>
      <Formik
        initialValues={{
          personalRank: 1,
          professionalRank: 1,
          healthWellnessRank: 1,
          workLifeBalanceRank: 1,
          motivationRank: 1,
          relationshipsRank: 1,
          personalIssues: "",
          professionalIssues: "",
          decisions: "",
          leadershipProcess: "",
          keyActionItem1: "",
          keyActionItem2: "",
          keyActionItem3: "",
          keyActionItem4: "",
          keyActionItem5: "",
        }}
        validationSchema={Yup.object({
          personalRank: Yup.number(),
          professionalRank: Yup.number(),
          healthWellnessRank: Yup.number(),
          workLifeBalanceRank: Yup.number(),
          motivationRank: Yup.number(),
          relationshipsRank: Yup.number(),
          personalIssues: Yup.string(),
          professionalIssues: Yup.string(),
          decisions: Yup.string(),
          leadershipProcess: Yup.string(),
          keyActionItem1: Yup.string(),
          keyActionItem2: Yup.string(),
          keyActionItem3: Yup.string(),
          keyActionItem4: Yup.string(),
          keyActionItem5: Yup.string(),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values);
          await handleSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, handleChange, values }) => (
          <Form>
            <FormLabel>
              What are the most important personal issues you are currently
              navigating?
            </FormLabel>
            <Input
              id="personalIssues"
              name="personalIssues"
              type="text"
              onChange={handleChange}
              value={values.personalIssues}
            />
            <FormLabel>
              What are the most important professional issues you are currently
              navigating?
            </FormLabel>
            <Input
              id="professionalIssues"
              name="professionalIssues"
              type="text"
              onChange={handleChange}
              value={values.professionalIssues}
            />
            <FormLabel>
              What are the most important decisions you need to make in the next
              90 days?
            </FormLabel>
            <Input
              id="decisions"
              name="decisions"
              type="text"
              onChange={handleChange}
              value={values.decisions}
            />
            <FormLabel>
              What is working and not working right now with your leadership
              process?
            </FormLabel>
            <Input
              id="leadershipProcess"
              name="leadershipProcess"
              type="text"
              onChange={handleChange}
              value={values.leadershipProcess}
            />
            <FormLabel>
              What are the key action items you are focused on accomplishing?
            </FormLabel>
            <Stack>
              <Input
                id="keyActionItem1"
                name="keyActionItem1"
                type="text"
                onChange={handleChange}
                value={values.keyActionItem1}
              />
              <Input
                id="keyActionItem2"
                name="keyActionItem2"
                type="text"
                onChange={handleChange}
                value={values.keyActionItem2}
              />
              <Input
                id="keyActionItem3"
                name="keyActionItem3"
                type="text"
                onChange={handleChange}
                value={values.keyActionItem3}
              />
              <Input
                id="keyActionItem4"
                name="keyActionItem4"
                type="text"
                onChange={handleChange}
                value={values.keyActionItem4}
              />
              <Input
                id="keyActionItem5"
                name="keyActionItem5"
                type="text"
                onChange={handleChange}
                value={values.keyActionItem5}
              />
            </Stack>
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ActionPlan;
