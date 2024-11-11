import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
  Box,
} from "@chakra-ui/react";
import { Module, Point } from "../../data/mock/certificatePrograms";

const ModuleModal = ({ module }: { module: Module }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button variant="onTeal" onClick={onOpen}>
        Learn More
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minWidth="800px">
          <ModalHeader fontSize="24px">{module.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* VIMEO PLACEHOLDER */}
            <Box
              width="100%"
              paddingBottom="56.25%" // 16:9 aspect ratio
              position="relative"
              backgroundColor="gray.100"
              mb={4}
            />
            {module.points.map((point: Point) => (
              <Box key={point.subTitle} mb={4}>
                <Text fontWeight="bold">{point.subTitle}</Text>
                <Text>{point.description}</Text>
              </Box>
            ))}
          </ModalBody>

          <ModalFooter>
            <Button variant="onTealAlt" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModuleModal;
