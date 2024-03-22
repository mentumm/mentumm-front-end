import React, { useEffect, useState } from "react";
import { Center, Box, Spinner, VStack, Heading, Flex } from "@chakra-ui/react";
import { CurrentUserProps } from "../../types";
import { useSearchParams } from "react-router-dom";
import { menApiAuthClient } from "../../clients/mentumm";
import BookingSuccess from "./success";
import BookingError from "./error";
import { SvgLayer } from "../../components/Waves/svgLayer";

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

  const bgImage =
    "https://mentummportal.sfo3.digitaloceanspaces.com/mentumm-splash.jpeg";

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
          employer_id: currentUser.employer_id,
        });
        setBookingRes(booking);
        setIsLoading(false);
      } catch (error) {
        setBookingError(true);
        setIsLoading(false);
        throw new Error(error);
      }
    };
    confirmBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      height="100vh"
      bgImage={`url(${bgImage})`}
      bgPos="center center"
      bgSize="cover"
    >
      <Box>
        <SvgLayer vbHeight="527">
          <path
            d="M1440 55.0362V492H0V0C160.575 75.0766 406.2 180.288 710.55 182.008C1024.35 183.878 1277.1 131.234 1440 55.0362Z"
            fill="#2CBBBC"
          />
        </SvgLayer>
        <SvgLayer vbHeight="527">
          <path
            d="M0 55.0362V527H1440V0C1279.43 75.0766 1033.8 180.288 729.45 182.008C415.65 183.878 162.9 131.234 0 55.0362Z"
            fill="#0D1C31"
          />
        </SvgLayer>
      </Box>

      <Flex
        direction="column"
        h="100%"
        justify="flex-end"
        position="relative"
        bottom="20%"
      >
        {isLoading && (
          <Center pt={8}>
            <VStack>
              <Heading as="h2" size="xl" pb={8}>
                Confirming your session...
              </Heading>
              <Spinner size="xl" colorScheme="brand" color="brand.500" />
            </VStack>
          </Center>
        )}

        {bookingRes?.data[0] && <BookingSuccess currentUser={currentUser} />}

        {bookingError && <BookingError />}
      </Flex>
    </Flex>
  );
};

export default BookingConfirmation;
