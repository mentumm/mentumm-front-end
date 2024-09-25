import React, { useState } from "react";
import {
  Box,
  Divider,
  HStack,
  Icon,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { CoachProps } from "../../types";
import { Card } from "./Card";
import { CardContent } from "./CardContent";
import { CardHeader } from "./CardHeader";
import { UserAvatar } from "./UserAvatar";
import BookingInfo from "./BookingInfo";
import LocalPin from "../../assets/Icons/LocalPin";
import { generateCoachTags, getLocationText } from "./utils";
import CoachProfileDrawer from "../CoachProfileDrawer";

const Coach = ({ coachInfo, slug, booking, currentUser }: CoachProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { first_name, last_name, styles, city, state, photo_url } = coachInfo;
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box
        w='26em'
        minW='24em'
        as='section'
        cursor={isHovered ? 'pointer' : 'null'}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onOpen}
      >
        <Card
          bgColor='transparent'
        >
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={4}
          >
            <UserAvatar
              boxSize='150px'
              borderRadius='8px'
              name={`${first_name} ${last_name}`}
              src={
                photo_url
                  ? photo_url
                  : "https://mentumm.com/wp-content/uploads/2022/06/mentumm_profile.png"
              }
            />
            <CardContent mt='3 !important' >
              <CardHeader title={`${first_name} ${last_name}`} isHovered={isHovered} />
              <Stack mt={1}>
                <HStack fontSize="md" mt={2}>
                  <Icon isHovered={isHovered} as={LocalPin} color='white' />
                  <Text color='white'>
                    {getLocationText(city, state)}
                  </Text>
                </HStack>
                <Divider
                  colorScheme='brand'
                  maxW='95%'
                  borderColor='brand.300'
                  borderBottomWidth={isHovered ? '2px' : '1px'}
                />
              </Stack>
              <VStack alignItems='baseline' mt={isHovered ? '7px' : '8px'}>
                {styles ? generateCoachTags(styles, slug, isHovered) : null}
              </VStack>
            </CardContent>
            {!!booking && (
              <BookingInfo
                booking={booking}
                coach={coachInfo}
                currentUser={currentUser}
              />
            )}
          </Stack>
        </Card>
      </Box>
      <CoachProfileDrawer
        onClose={onClose}
        isOpen={isOpen}
        coachInfo={coachInfo}
        currentUser={currentUser}
      />
    </>
  );
};

export default Coach;
