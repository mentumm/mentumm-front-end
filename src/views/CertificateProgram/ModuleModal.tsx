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
import { Module, Point } from "../../data/certificatePrograms";

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
            <Box
              width="100%"
              paddingBottom="56.25%"
              position="relative"
              mb={4}
              backgroundColor="gray.100"
            >
              <iframe
                title={`${module.title} Video`}
                src={`https://player.vimeo.com/video/${module.vimeoId}`}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </Box>
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
