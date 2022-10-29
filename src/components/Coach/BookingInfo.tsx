import { Box, Button, Text, useDisclosure } from "@chakra-ui/react";
import * as React from "react";
import { CoachBooking, CoachType, CurrentUser } from "../../types";
import { format } from 'date-fns';
import { mixpanelEvent } from "../../helpers";
import CoachReview from "../CoachReview";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";

interface IProps {
  booking: CoachBooking;
  coach: CoachType;
  currentUser: CurrentUser;
}

const BookingInfo = ({booking, coach, currentUser}: IProps) => {
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const {
    isOpen: isReviewOpen,
    onOpen: onReviewOpen,
    onClose: onReviewClose,
  } = useDisclosure();

  
  const start = new Date(booking.event_start_time);
  const isPast = start < new Date();

  const onClose = (success) => {
    success && setReviewSubmitted(true);
    onReviewClose();
  }

  return (
    <Box
      textAlign="center"
    >
      <Text fontWeight="bold" mt={4}>{format(start, 'EEEE')}</Text>
      <Text whiteSpace="nowrap" mt={2}>{format(start, 'MMMM d, yyyy')}</Text>
      <Text whiteSpace="nowrap" mt={2}>{format(start, 'h:mmaaa')}</Text>
      {isPast && (
        (booking.user_review || reviewSubmitted) ? (
          <Text color="#717171" fontWeight="bold" mt={6}><FontAwesomeIcon icon={faCheckCircle} /> Review Submitted</Text>
        ) : (
        <Button
          mt={6}
          colorScheme="brand"
          variant="solid"
          onClick={() => {
            mixpanelEvent("Clicked Review Coach", {
              "Coach Name": coach ? coach.name : null,
              "Coach ID": coach ? coach.id : null,
              "User ID": currentUser ? currentUser.id : null,
              "Employer ID": currentUser ? currentUser.employer_id : null,
            });
            onReviewOpen();
          }}
        >
          Leave a Review
          <CoachReview
            isOpen={isReviewOpen}
            onOpen={onReviewOpen}
            onClose={onClose}
            coach={coach}
            currentUser={currentUser}
            userCoachId={booking.id}
          />
        </Button>
        )
      )}
    </Box>
  );
};

export default BookingInfo;
