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
  useToast,
} from "@chakra-ui/react";
import ReviewForm from "./ReviewForm";
import { CoachReviewProps, ReviewFormType } from "../../types";
import { menApiAuthClient } from "../../clients/mentumm";

const CoachReview: React.FC<CoachReviewProps> = ({
  isOpen,
  onClose,
  coach,
  currentUser,
  userCoachId,
}) => {
  const toast = useToast();

  const submitForm = async (rating: ReviewFormType) => {
    try {
      const reviewCoach = await menApiAuthClient().post(
        "/coach/rating",
        rating
      );

      if (reviewCoach) {
        toast({
          title: "Review Submitted!",
          description: `We've submitted your review for ${`${coach.first_name} ${coach.last_name}`}.`,
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "bottom-right",
        });
        onClose(true);
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
              {coach ? `${coach.first_name} ${coach.last_name}` : null}
            </Heading>
            <ReviewForm
              currentUser={currentUser}
              coach={coach}
              userCoachId={userCoachId}
            />
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CoachReview;
