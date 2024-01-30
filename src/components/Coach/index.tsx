import {
  Box,
  Divider,
  HStack,
  Icon,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { CoachProps } from "../../types";
import { Card } from "./Card";
import { CardContent } from "./CardContent";
import { CardHeader } from "./CardHeader";
import { UserAvatar } from "./UserAvatar";
import BookingInfo from "./BookingInfo";
import { Link } from "react-router-dom";
import LocalPin from "../../assets/Icons/LocalPin";
import { generateCoachTags, getLocationText, generateCoachUrl } from "./utils";

const Coach: React.FC<CoachProps> = ({ coachInfo, slug, booking, currentUser }) => {
  const { first_name, last_name, styles, city, state, photo_url } = coachInfo;

  return (
    <Link to={`/coach/${generateCoachUrl(coachInfo)}`} style={{ display: 'flex' }}>
      <Box w="26em " as="section" >
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
              <CardHeader title={`${first_name} ${last_name}`} />
              <Stack mt={2}>
                <HStack fontSize="md" mt={2}>
                  <Icon as={LocalPin} color='white' />
                  <Text
                    color='white'
                  >
                    {getLocationText(city, state)}
                  </Text>
                </HStack>
                <Divider colorScheme='brand' maxW='95%' borderColor='brand.500' />
              </Stack>
              <VStack alignItems='baseline' mt={2}>
                {styles ? generateCoachTags(styles, slug) : null}
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
    </Link>
  );
};

export default Coach;
