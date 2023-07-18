import React from 'react';
import {
  Button,
} from '@chakra-ui/react';
import { mixpanelEvent } from '../../../helpers';
import { CoachType } from '../../../types';

type BookCoachingButtonProps = {
  coach: CoachType,
  calendlyOnOpen: () => void,
}

const BookCoachingButton: React.FC<BookCoachingButtonProps> = ({
  coach,
  calendlyOnOpen
}) => {
  return (
    <Button
      onClick={() => {
        mixpanelEvent("Clicked Book Coach", {
          "Coach Name": coach &&
            (`${coach.first_name} ${coach.last_name}`),
          "Coach ID": coach && coach.id,
        });
        calendlyOnOpen();
      }}
    >
      Book Your Coaching Session
    </Button>
  )
}

export default BookCoachingButton;