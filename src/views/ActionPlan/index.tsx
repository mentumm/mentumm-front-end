import React, { MutableRefObject, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActionPlanForm, CurrentUser } from "../../types";
import { Form, Formik, FormikValues } from "formik";
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
  Text,
  Input,
  FormControl,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import envConfig from "../../envConfig";
import { menApiAuthClient } from "../../clients/mentumm";

type ActionPlanProps = {
  isOpen: boolean;
  currentUser: CurrentUser;
  onClose: () => void;
};

const ActionPlan = ({
  isOpen,
  onClose,
  currentUser,
}: ActionPlanProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [actionPlan, setActionPlan] = useState<ActionPlanForm | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getActionPlan = async () => {
      try {
        const actionPlanResponse = await menApiAuthClient().get<ActionPlanForm>(
          `/action-plans/${currentUser.id}/${new Date().toISOString()}`
        );
        if (actionPlanResponse.data) {
          setActionPlan(actionPlanResponse.data);
        }
        setLoading(false);
      } catch (error) {
        enqueueSnackbar("Could not fetch Action Plan!", { variant: "error" });
        setLoading(false);
      }
    };

    if (currentUser) {
      getActionPlan();
    }
  }, [currentUser, enqueueSnackbar]);

  const handleSubmit = async (values: FormikValues) => {
    const keyActionItems = [
      values.keyActionItem1,
      values.keyActionItem2,
      values.keyActionItem3,
      values.keyActionItem4,
      values.keyActionItem5,
    ];

    const actionPlanValues = {
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
    };

    try {
      if (actionPlan) {
        await axios.patch(`${envConfig.API_URL}/v1/action-plans`, {
          ...actionPlanValues,
          action_plan_id: actionPlan.id,
        });
        enqueueSnackbar("Action Plan updated!", { variant: "success" });
      } else {
        await axios.post(`${envConfig.API_URL}/v1/action-plans`, {
          ...actionPlanValues,
        });
        enqueueSnackbar("Your Action Plan Has Been Submitted!", { variant: "success" });
      }
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
    }
  };

  if (loading) return null;

  return (
    <Drawer
      placement="bottom"
      onClose={onClose}
      isOpen={isOpen}
      size="full"
    >
      <DrawerOverlay />
      <DrawerContent
        w="960px"
        h="487px"
        mt={3}
        borderTopRadius="24px"
        mx="auto"
        maxW="100%"
        bgColor='#2CBBBC'
      >
        <DrawerCloseButton
          size="lg"
          top="20px"
          right="20px"
          zIndex={1}
        />
        <DrawerHeader
          pb={4}
          textAlign="center"
          fontSize="2xl"
          fontWeight="bold"
        >
          Your Monthly Action Plan
        </DrawerHeader>
        <DrawerBody
          p={6}
          overflowY="auto"
          maxH="calc(100% - 80px)"
          bgColor='#0D1C31'
          color='white'
        >
          <Formik
            initialValues={{
              personalRank: actionPlan?.personal_rank || 1,
              professionalRank: actionPlan?.professional_rank || 1,
              healthWellnessRank: actionPlan?.health_wellness_rank || 1,
              workLifeBalanceRank: actionPlan?.work_life_balance_rank || 1,
              motivationRank: actionPlan?.motivation_rank || 1,
              relationshipsRank: actionPlan?.relationships_rank || 1,
              personalIssues: actionPlan?.personal_issues_field || "",
              professionalIssues: actionPlan?.professional_issues_field || "",
              decisions: actionPlan?.decisions_field || "",
              leadershipProcess: actionPlan?.leadership_process_field || "",
              keyActionItem1: actionPlan?.key_action_items[0] || "",
              keyActionItem2: actionPlan?.key_action_items[1] || "",
              keyActionItem3: actionPlan?.key_action_items[2] || "",
              keyActionItem4: actionPlan?.key_action_items[3] || "",
              keyActionItem5: actionPlan?.key_action_items[4] || "",
            }}
            validationSchema={Yup.object({
              personalRank: Yup.number().min(1).max(10).required("Required"),
              professionalRank: Yup.number().min(1).max(10).required("Required"),
              healthWellnessRank: Yup.number().min(1).max(10).required("Required"),
              workLifeBalanceRank: Yup.number().min(1).max(10).required("Required"),
              motivationRank: Yup.number().min(1).max(10).required("Required"),
              relationshipsRank: Yup.number().min(1).max(10).required("Required"),
              personalIssues: Yup.string().required("Please fill out this field"),
              professionalIssues: Yup.string().required("Please fill out this field"),
              decisions: Yup.string().required("Please fill out this field"),
              leadershipProcess: Yup.string().required("Please fill out this field"),
              keyActionItem1: Yup.string().required("Please fill out at least one key action item"),
              keyActionItem2: Yup.string(),
              keyActionItem3: Yup.string(),
              keyActionItem4: Yup.string(),
              keyActionItem5: Yup.string(),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              await handleSubmit(values);
              setSubmitting(false);
              onClose();
            }}
          >
            {({ isSubmitting, handleChange, values, errors, touched }) => (
              <Form>
                {/* Personal Rank */}
                <FormControl mb={4}>
                  <FormLabel>Personal</FormLabel>
                  <Slider
                    id="personalRank"
                    name="personalRank"
                    value={values.personalRank}
                    min={1}
                    max={10}
                    mt={3}
                    onChange={(value) =>
                      handleChange({ target: { value, name: "personalRank" } })
                    }
                  >
                    <SliderMark value={values.personalRank} mt="-8" ml="-1" fontSize="sm">
                      {values.personalRank}
                    </SliderMark>
                    <SliderTrack>
                      <SliderFilledTrack bg="#3182CE" />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                  {errors.personalRank && touched.personalRank && (
                    <Text color="red.500" fontSize="sm">
                      {errors.personalRank}
                    </Text>
                  )}
                </FormControl>

                {/* Professional Rank */}
                <FormControl mb={4}>
                  <FormLabel>Professional</FormLabel>
                  <Slider
                    id="professionalRank"
                    name="professionalRank"
                    value={values.professionalRank}
                    min={1}
                    max={10}
                    mt={3}
                    onChange={(value) =>
                      handleChange({ target: { value, name: "professionalRank" } })
                    }
                  >
                    <SliderMark value={values.professionalRank} mt="-8" ml="-1" fontSize="sm">
                      {values.professionalRank}
                    </SliderMark>
                    <SliderTrack>
                      <SliderFilledTrack bg="#3182CE" />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                  {errors.professionalRank && touched.professionalRank && (
                    <Text color="red.500" fontSize="sm">
                      {errors.professionalRank}
                    </Text>
                  )}
                </FormControl>

                {/* Health and Wellness Rank */}
                <FormControl mb={4}>
                  <FormLabel>Health and Wellness</FormLabel>
                  <Slider
                    id="healthWellnessRank"
                    name="healthWellnessRank"
                    value={values.healthWellnessRank}
                    min={1}
                    max={10}
                    mt={3}
                    onChange={(value) =>
                      handleChange({
                        target: { value, name: "healthWellnessRank" },
                      })
                    }
                  >
                    <SliderMark value={values.healthWellnessRank} mt="-8" ml="-1" fontSize="sm">
                      {values.healthWellnessRank}
                    </SliderMark>
                    <SliderTrack>
                      <SliderFilledTrack bg="#3182CE" />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                  {errors.healthWellnessRank && touched.healthWellnessRank && (
                    <Text color="red.500" fontSize="sm">
                      {errors.healthWellnessRank}
                    </Text>
                  )}
                </FormControl>

                {/* Work-Life Balance Rank */}
                <FormControl mb={4}>
                  <FormLabel>Work-Life Balance</FormLabel>
                  <Slider
                    id="workLifeBalanceRank"
                    name="workLifeBalanceRank"
                    value={values.workLifeBalanceRank}
                    min={1}
                    max={10}
                    mt={3}
                    onChange={(value) =>
                      handleChange({
                        target: { value, name: "workLifeBalanceRank" },
                      })
                    }
                  >
                    <SliderMark value={values.workLifeBalanceRank} mt="-8" ml="-1" fontSize="sm">
                      {values.workLifeBalanceRank}
                    </SliderMark>
                    <SliderTrack>
                      <SliderFilledTrack bg="#3182CE" />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                  {errors.workLifeBalanceRank && touched.workLifeBalanceRank && (
                    <Text color="red.500" fontSize="sm">
                      {errors.workLifeBalanceRank}
                    </Text>
                  )}
                </FormControl>

                {/* Motivation Rank */}
                <FormControl mb={4}>
                  <FormLabel>Motivation</FormLabel>
                  <Slider
                    id="motivationRank"
                    name="motivationRank"
                    value={values.motivationRank}
                    min={1}
                    max={10}
                    mt={3}
                    onChange={(value) =>
                      handleChange({ target: { value, name: "motivationRank" } })
                    }
                  >
                    <SliderMark value={values.motivationRank} mt="-8" ml="-1" fontSize="sm">
                      {values.motivationRank}
                    </SliderMark>
                    <SliderTrack>
                      <SliderFilledTrack bg="#3182CE" />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                  {errors.motivationRank && touched.motivationRank && (
                    <Text color="red.500" fontSize="sm">
                      {errors.motivationRank}
                    </Text>
                  )}
                </FormControl>

                {/* Relationships Rank */}
                <FormControl mb={4}>
                  <FormLabel>Relationships</FormLabel>
                  <Slider
                    id="relationshipsRank"
                    name="relationshipsRank"
                    value={values.relationshipsRank}
                    min={1}
                    max={10}
                    mt={3}
                    onChange={(value) =>
                      handleChange({ target: { value, name: "relationshipsRank" } })
                    }
                  >
                    <SliderMark value={values.relationshipsRank} mt="-8" ml="-1" fontSize="sm">
                      {values.relationshipsRank}
                    </SliderMark>
                    <SliderTrack>
                      <SliderFilledTrack bg="#3182CE" />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                  {errors.relationshipsRank && touched.relationshipsRank && (
                    <Text color="red.500" fontSize="sm">
                      {errors.relationshipsRank}
                    </Text>
                  )}
                </FormControl>

                {/* Personal Issues */}
                <FormControl mb={4}>
                  <FormLabel>
                    What are the most important personal issues you are currently navigating?
                  </FormLabel>
                  <Textarea
                    id="personalIssues"
                    name="personalIssues"
                    onChange={handleChange}
                    value={values.personalIssues}
                  />
                  {errors.personalIssues && touched.personalIssues && (
                    <Text color="red.500" fontSize="sm">
                      {errors.personalIssues}
                    </Text>
                  )}
                </FormControl>

                {/* Professional Issues */}
                <FormControl mb={4}>
                  <FormLabel>
                    What are the most important professional issues you are currently navigating?
                  </FormLabel>
                  <Textarea
                    id="professionalIssues"
                    name="professionalIssues"
                    onChange={handleChange}
                    value={values.professionalIssues}
                  />
                  {errors.professionalIssues && touched.professionalIssues && (
                    <Text color="red.500" fontSize="sm">
                      {errors.professionalIssues}
                    </Text>
                  )}
                </FormControl>

                {/* Decisions */}
                <FormControl mb={4}>
                  <FormLabel>
                    What are the most important decisions you need to make in the next 90 days?
                  </FormLabel>
                  <Textarea
                    id="decisions"
                    name="decisions"
                    onChange={handleChange}
                    value={values.decisions}
                  />
                  {errors.decisions && touched.decisions && (
                    <Text color="red.500" fontSize="sm">
                      {errors.decisions}
                    </Text>
                  )}
                </FormControl>

                {/* Leadership Process */}
                <FormControl mb={4}>
                  <FormLabel>
                    What is working and not working right now with your leadership process?
                  </FormLabel>
                  <Textarea
                    id="leadershipProcess"
                    name="leadershipProcess"
                    onChange={handleChange}
                    value={values.leadershipProcess}
                  />
                  {errors.leadershipProcess && touched.leadershipProcess && (
                    <Text color="red.500" fontSize="sm">
                      {errors.leadershipProcess}
                    </Text>
                  )}
                </FormControl>

                {/* Key Action Items */}
                <FormControl mb={4}>
                  <FormLabel>
                    What are the key action items you are focused on accomplishing?
                  </FormLabel>
                  <Stack spacing={3}>
                    <Input
                      id="keyActionItem1"
                      name="keyActionItem1"
                      type="text"
                      color='black'
                      onChange={handleChange}
                      value={values.keyActionItem1}
                      placeholder="Key Action Item 1"
                    />
                    {errors.keyActionItem1 && touched.keyActionItem1 && (
                      <Text color="red.500" fontSize="sm">
                        {errors.keyActionItem1}
                      </Text>
                    )}
                    <Input
                      id="keyActionItem2"
                      name="keyActionItem2"
                      type="text"
                      color='black'
                      onChange={handleChange}
                      value={values.keyActionItem2}
                      placeholder="Key Action Item 2"
                    />
                    {errors.keyActionItem2 && touched.keyActionItem2 && (
                      <Text color="red.500" fontSize="sm">
                        {errors.keyActionItem2}
                      </Text>
                    )}
                    <Input
                      id="keyActionItem3"
                      name="keyActionItem3"
                      type="text"
                      color='black'
                      onChange={handleChange}
                      value={values.keyActionItem3}
                      placeholder="Key Action Item 3"
                    />
                    {errors.keyActionItem3 && touched.keyActionItem3 && (
                      <Text color="red.500" fontSize="sm">
                        {errors.keyActionItem3}
                      </Text>
                    )}
                    <Input
                      id="keyActionItem4"
                      name="keyActionItem4"
                      type="text"
                      color='black'
                      onChange={handleChange}
                      value={values.keyActionItem4}
                      placeholder="Key Action Item 4"
                    />
                    {errors.keyActionItem4 && touched.keyActionItem4 && (
                      <Text color="red.500" fontSize="sm">
                        {errors.keyActionItem4}
                      </Text>
                    )}
                    <Input
                      id="keyActionItem5"
                      name="keyActionItem5"
                      type="text"
                      color='black'
                      onChange={handleChange}
                      value={values.keyActionItem5}
                      placeholder="Key Action Item 5"
                    />
                    {errors.keyActionItem5 && touched.keyActionItem5 && (
                      <Text color="red.500" fontSize="sm">
                        {errors.keyActionItem5}
                      </Text>
                    )}
                  </Stack>
                </FormControl>

                <Button
                  type="submit"
                  variant='onBlue'
                  isLoading={isSubmitting}
                  mt={4}
                  width="100%"
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default ActionPlan;