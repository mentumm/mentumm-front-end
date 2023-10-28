import React, { useEffect, useState } from "react";
import {
  AbsoluteCenter,
  Box,
  Spinner,
} from "@chakra-ui/react";
import { CurrentUserProps } from "../../types";
import { useSearchParams } from "react-router-dom";
import { menApiAuthClient } from "../../clients/mentumm";
import Success from "./success";

const BookingConfirmation: React.FC<CurrentUserProps> = ({ currentUser }) => {
  const [bookingRes, setBookingRes] = useState(null);
  const [bookingError, setBookingError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const assignedTo = searchParams.get("assigned_to");
  const eventTypeUUID = searchParams.get("event_type_uuid");
  const eventTypeName = searchParams.get("event_type_name");
  const eventStartTime = searchParams.get("event_start_time");
  const eventEndTime = searchParams.get("event_end_time");
  const inviteeUUID = searchParams.get("invitee_uuid");
  const inviteeFullName = searchParams.get("invitee_full_name");
  const inviteeEmail = searchParams.get("invitee_email");
  const inviteeAnswer = searchParams.get("answer_1");
  const utmSource = searchParams.get("utm_source");

  useEffect(() => {
    const confirmBooking = async () => {
      try {
        const booking = await menApiAuthClient().post("/user/book-coach", {
          user_id: currentUser.id,
          coach_id: utmSource,
          event_end_time: eventEndTime,
          event_start_time: eventStartTime,
          event_type_name: eventTypeName,
          event_type_uuid: eventTypeUUID,
          invitee_email: inviteeEmail,
          invitee_full_name: inviteeFullName,
          invitee_uuid: inviteeUUID,
          assignedTo,
          inviteeAnswer,
        });
        setBookingRes(booking);
        setIsLoading(false);
      } catch (error) {
        setBookingError(true);
        setIsLoading(false);
        throw new Error("Could not record booking");
      }
    };
    confirmBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(bookingRes);

  return (
    <Box>
      {isLoading && (
        <AbsoluteCenter>
          <Spinner />
        </AbsoluteCenter>
      )}

      {bookingRes && (
        <Success currentUser={currentUser} />
      )}

      {bookingError && (
        <Box>
          An error occurred
        </Box>
      )}
    </Box>
  )
};

export default BookingConfirmation;
