import React from 'react';
import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalFooter,
  Button,
  ModalCloseButton,
} from '@chakra-ui/react'
import { InlineWidget } from 'react-calendly';
import { CoachType, CurrentUser, } from '../../../types';

type BookingMoalProps = {
  coach: CoachType,
  currentUser: CurrentUser,
  calendlyIsOpen: boolean,
  calendlyOnClose: () => void,

}

const BookingModal: React.FC<BookingMoalProps> = ({
  coach,
  currentUser,
  calendlyIsOpen,
  calendlyOnClose,
}) => {
  return (
    <Modal
      isOpen={calendlyIsOpen}
      onClose={calendlyOnClose}
      isCentered
      size="xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Book your session{" "}
          {coach &&
            (`with ${`${coach.first_name} ${coach.last_name}`}`)
          }
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InlineWidget
            url={coach && coach.booking_url}
            utm={{
              utmSource: coach && String(coach.id),
            }}
            prefill={{
              email: currentUser?.email,
              name: `${currentUser?.first_name} ${currentUser?.last_name}`,
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={calendlyOnClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default BookingModal;