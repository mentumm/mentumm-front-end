import { CloseIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Flex,
  FormErrorMessage,
  FormHelperText,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { FormikHelpers, FormikProps } from "formik";
import React, { useRef } from "react";
import { UserPublic } from "../../types";

interface FileInputProps {
  props: FormikProps<UserPublic>;
  currentUser: UserPublic;
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    props: FormikHelpers<UserPublic>
  ) => void;
  handleFileClear: (props: FormikHelpers<UserPublic>) => void;
  profileImage: File | null;
}

const FileInput = ({
  props,
  profileImage,
  currentUser,
  handleFileChange,
  handleFileClear,
}: FileInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Flex alignItems="center" h={200} w={400} overflow="hidden" mb="10px">
        {profileImage && (
          <Image
            src={URL.createObjectURL(profileImage)}
            alt="profile"
            objectFit="cover"
          />
        )}
        {!profileImage && props.values.photo_url && (
          <Image src={props.values.photo_url} alt="profile" objectFit="cover" />
        )}
        {!profileImage && !props.values.photo_url && (
          <Flex
            h="100%"
            w="100%"
            objectFit="cover"
            background="#E2E8F0"
            alignItems="center"
            justifyContent="center"
            color="#718096"
            fontSize={80}
          >
            {`${currentUser.first_name[0]}${currentUser.last_name[0]}`}
          </Flex>
        )}
      </Flex>
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleFileChange(e, props)}
        style={{ display: "none" }}
      />
      <ButtonGroup>
        <Button type="button" onClick={() => fileInputRef.current.click()}>
          Upload Image
        </Button>
        {(profileImage || props.values.photo_url) && (
          <IconButton
            aria-label="Clear Image"
            icon={<CloseIcon />}
            onClick={() => handleFileClear(props)}
          />
        )}
      </ButtonGroup>
      <FormErrorMessage>{props.errors.photo_url}</FormErrorMessage>
      <FormHelperText>
        Choose a photo that best fits the landscape aspect ratio above.
      </FormHelperText>
    </>
  );
};

export default FileInput;
