import React from "react";
import { useNavigate } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { CurrentUser } from "../../types";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import {
  Button,
  FormLabel,
  Textarea,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Stack,
  Input,
  FormControl,
} from "@chakra-ui/react";
import axios from "axios";
import envConfig from "../../envConfig";

const useStyles = createUseStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    textAlign: "flex-start",
    "& > div": {
      padding: [10, 0],
    },
  },
  heading: {
    fontSize: 24,
    margin: [20, 0],
  },
  sliders: {
    "& > label": {
      paddingBottom: 15,
    },
  },
  errors: {
    color: "red",
    padding: [5, 0],
  },
});

type ActionPlanProps = {
  currentUser: CurrentUser;
};

const ActionPlan = ({ currentUser }: ActionPlanProps): JSX.Element => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    const keyActionItems = [
      values.keyActionItem1,
      values.keyActionItem2,
      values.keyActionItem3,
      values.keyActionItem4,
      values.keyActionItem5,
    ];

    await axios
      .post(`${envConfig.API_URL}/v1/action-plans`, {
        user_id: currentUser.id,
        personal_rank: values.personalRank,
        professional_rank: values.professionalRank,
        health_wellness_rank: values.healthWellnessRank,
        work_life_balance_rank: values.workLifeBalanceRank,
        motivation_rank: values.motivationRank,
        relationships_rank: values.relationshipsRank,
        personal_issues_field: values.personalIssues,
        professional_issues_field: values.professionalIssues,
        decisions_field: values.decisions,
        leadership_process_field: values.leadershipProcess,
        key_action_items: keyActionItems,
      })
      .then(() => {
        enqueueSnackbar(
          "Action Plan created! Your coach will discuss your monthly goals with you.",
          {
            variant: "success",
          }
        );
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      })
      .catch(() => {
        enqueueSnackbar("Something went wrong. Please try again.", {
          variant: "error",
        });
      });
  };

  return (
    <div className={classes.root}>
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
          personalIssues: Yup.string().required("Please fill out this field"),
          professionalIssues: Yup.string().required(
            "Please fill out this field"
          ),
          decisions: Yup.string().required("Please fill out this field"),
          leadershipProcess: Yup.string().required(
            "Please fill out this field"
          ),
          keyActionItem1: Yup.string().required("Please fill out this field"),
          keyActionItem2: Yup.string().required("Please fill out this field"),
          keyActionItem3: Yup.string().required("Please fill out this field"),
          keyActionItem4: Yup.string().required("Please fill out this field"),
          keyActionItem5: Yup.string().required("Please fill out this field"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          await handleSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, handleChange, values, errors, touched }) => (
          <Form className={classes.form}>
            <h1 className={classes.heading}>Your Monthly Action Plan</h1>
            <FormLabel>Rank yourself 1-10 in the following areas:</FormLabel>
            <FormControl className={classes.sliders}>
              <FormLabel>Personal</FormLabel>
              <Slider
                id="personalRank"
                name="personalRank"
                defaultValue={values.personalRank}
                min={1}
                max={10}
                onChange={(value) =>
                  handleChange({ target: { value, name: "personalRank" } })
                }
              >
                <SliderMark
                  value={values.personalRank}
                  mt="-8"
                  ml="-1"
                  fontSize="sm"
                >
                  {values.personalRank}
                </SliderMark>
                <SliderTrack>
                  <SliderFilledTrack bg="#3182CE" />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </FormControl>
            <FormControl className={classes.sliders}>
              <FormLabel>Professional</FormLabel>
              <Slider
                id="professionalRank"
                name="professionalRank"
                defaultValue={values.professionalRank}
                min={1}
                max={10}
                onChange={(value) =>
                  handleChange({ target: { value, name: "professionalRank" } })
                }
              >
                <SliderMark
                  value={values.professionalRank}
                  mt="-8"
                  ml="-1"
                  fontSize="sm"
                >
                  {values.professionalRank}
                </SliderMark>
                <SliderTrack>
                  <SliderFilledTrack bg="#3182CE" />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </FormControl>
            <FormControl className={classes.sliders}>
              <FormLabel>Health and Wellness</FormLabel>
              <Slider
                id="healthWellnessRank"
                name="healthWellnessRank"
                defaultValue={values.healthWellnessRank}
                min={1}
                max={10}
                onChange={(value) =>
                  handleChange({
                    target: { value, name: "healthWellnessRank" },
                  })
                }
              >
                <SliderMark
                  value={values.healthWellnessRank}
                  mt="-8"
                  ml="-1"
                  fontSize="sm"
                >
                  {values.healthWellnessRank}
                </SliderMark>
                <SliderTrack>
                  <SliderFilledTrack bg="#3182CE" />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </FormControl>
            <FormControl className={classes.sliders}>
              <FormLabel>Work-Life Balance</FormLabel>
              <Slider
                id="workLifeBalanceRank"
                name="workLifeBalanceRank"
                defaultValue={values.workLifeBalanceRank}
                min={1}
                max={10}
                onChange={(value) =>
                  handleChange({
                    target: { value, name: "workLifeBalanceRank" },
                  })
                }
              >
                <SliderMark
                  value={values.workLifeBalanceRank}
                  mt="-8"
                  ml="-1"
                  fontSize="sm"
                >
                  {values.workLifeBalanceRank}
                </SliderMark>
                <SliderTrack>
                  <SliderFilledTrack bg="#3182CE" />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </FormControl>
            <FormControl className={classes.sliders}>
              <FormLabel>Motivation</FormLabel>
              <Slider
                id="motivationRank"
                name="motivationRank"
                defaultValue={values.motivationRank}
                min={1}
                max={10}
                onChange={(value) =>
                  handleChange({ target: { value, name: "motivationRank" } })
                }
              >
                <SliderMark
                  value={values.motivationRank}
                  mt="-8"
                  ml="-1"
                  fontSize="sm"
                >
                  {values.motivationRank}
                </SliderMark>
                <SliderTrack>
                  <SliderFilledTrack bg="#3182CE" />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </FormControl>
            <FormControl className={classes.sliders}>
              <FormLabel>Relationships</FormLabel>
              <Slider
                id="relationshipsRank"
                name="relationshipsRank"
                defaultValue={values.relationshipsRank}
                min={1}
                max={10}
                onChange={(value) =>
                  handleChange({ target: { value, name: "relationshipsRank" } })
                }
              >
                <SliderMark
                  value={values.relationshipsRank}
                  mt="-8"
                  ml="-1"
                  fontSize="sm"
                >
                  {values.relationshipsRank}
                </SliderMark>
                <SliderTrack>
                  <SliderFilledTrack bg="#3182CE" />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </FormControl>
            <FormControl>
              <FormLabel>
                What are the most important personal issues you are currently
                navigating?
              </FormLabel>
              <Textarea
                id="personalIssues"
                name="personalIssues"
                onChange={handleChange}
                value={values.personalIssues}
              />
              {errors.personalIssues && touched.personalIssues && (
                <div className={classes.errors}>{errors.personalIssues}</div>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>
                What are the most important professional issues you are
                currently navigating?
              </FormLabel>
              <Textarea
                id="professionalIssues"
                name="professionalIssues"
                onChange={handleChange}
                value={values.professionalIssues}
              />
              {errors.professionalIssues && touched.professionalIssues && (
                <div className={classes.errors}>
                  {errors.professionalIssues}
                </div>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>
                What are the most important decisions you need to make in the
                next 90 days?
              </FormLabel>
              <Textarea
                id="decisions"
                name="decisions"
                onChange={handleChange}
                value={values.decisions}
              />
              {errors.decisions && touched.decisions && (
                <div className={classes.errors}>{errors.decisions}</div>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>
                What is working and not working right now with your leadership
                process?
              </FormLabel>
              <Textarea
                id="leadershipProcess"
                name="leadershipProcess"
                onChange={handleChange}
                value={values.leadershipProcess}
              />
              {errors.leadershipProcess && touched.leadershipProcess && (
                <div className={classes.errors}>{errors.leadershipProcess}</div>
              )}
            </FormControl>
            <FormControl>
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
                {errors.keyActionItem1 && touched.keyActionItem1 && (
                  <div className={classes.errors}>{errors.keyActionItem1}</div>
                )}
                <Input
                  id="keyActionItem2"
                  name="keyActionItem2"
                  type="text"
                  onChange={handleChange}
                  value={values.keyActionItem2}
                />
                {errors.keyActionItem2 && touched.keyActionItem2 && (
                  <div className={classes.errors}>{errors.keyActionItem2}</div>
                )}
                <Input
                  id="keyActionItem3"
                  name="keyActionItem3"
                  type="text"
                  onChange={handleChange}
                  value={values.keyActionItem3}
                />
                {errors.keyActionItem3 && touched.keyActionItem3 && (
                  <div className={classes.errors}>{errors.keyActionItem3}</div>
                )}
                <Input
                  id="keyActionItem4"
                  name="keyActionItem4"
                  type="text"
                  onChange={handleChange}
                  value={values.keyActionItem4}
                />
                {errors.keyActionItem4 && touched.keyActionItem4 && (
                  <div className={classes.errors}>{errors.keyActionItem4}</div>
                )}
                <Input
                  id="keyActionItem5"
                  name="keyActionItem5"
                  type="text"
                  onChange={handleChange}
                  value={values.keyActionItem5}
                />
                {errors.keyActionItem5 && touched.keyActionItem5 && (
                  <div className={classes.errors}>{errors.keyActionItem5}</div>
                )}
              </Stack>
            </FormControl>
            <Button
              bg="#5DBABD"
              color="white"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ActionPlan;
