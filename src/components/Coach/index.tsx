import React, { useState } from "react";
import {
  Box,
  Divider,
  HStack,
  Icon,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CoachProps } from "../../types";
import { Card } from "./Card";
import { CardContent } from "./CardContent";
import { CardHeader } from "./CardHeader";
import { UserAvatar } from "./UserAvatar";
import BookingInfo from "./BookingInfo";
import LocalPin from "../../assets/Icons/LocalPin";
import { generateCoachTags, getLocationText } from "./utils";

const Coach: React.FC<CoachProps> = ({ coachInfo, slug, booking, currentUser }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { first_name, last_name, styles, city, state, photo_url } = coachInfo;

  return (
    <Box
      w='26em'
      as='section'
      cursor={isHovered ? 'pointer' : 'null'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
              <Divider colorScheme='brand' maxW='95%' borderColor='brand.500' />
            </Stack>
            <VStack alignItems='baseline' mt={2}>
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
  );
};

export default Coach;
