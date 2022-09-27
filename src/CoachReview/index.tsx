import React from "react";
import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import ReviewForm from "./ReviewForm";
import axios from "axios";
import envConfig from "../envConfig";
import { CoachReviewProps, ReviewFormType } from "../types";

const CoachReview: React.FC<CoachReviewProps> = ({
  isOpen,
  onClose,
  coach,
  currentUser,
}) => {
  const submitForm = (rating: ReviewFormType) => {
    try {
      const reviewCoach = axios.post(
        `${envConfig.API_URL}/v1/coach/rating`,
        rating
      );

      if (reviewCoach) {
        onClose();
      }
    } catch (error) {
      throw new error("Unable to submit Coach review");
    }
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent
        borderRadius="xl"
        mx={{ base: "2.5", lg: "16" }}
        overflow="hidden"
        maxWidth="3xl"
      >
        <ModalCloseButton
          top="0"
          right="0"
          size="md"
          borderRadius="none"
          borderBottomLeftRadius="md"
        />
        <ModalBody
          px={{ base: "5", md: "12", lg: "16" }}
          py={{ base: "10", md: "12", lg: "16" }}
          pb={{ base: "6" }}
        >
          <Stack spacing={2}>
            <Heading
              fontSize="2xl"
              fontWeight="semibold"
              color={useColorModeValue("black", "white")}
            >
              Rate Your Experience with:
            </Heading>
            <Heading
              as="h4"
              fontSize="lg"
              fontWeight="medium"
              color={useColorModeValue("black", "white")}
            >
              {coach ? coach.name : null}
            </Heading>
            <ReviewForm
              submitForm={submitForm}
              currentUser={currentUser}
              coach={coach}
            />
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CoachReview;
