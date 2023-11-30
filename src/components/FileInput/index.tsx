import { CloseIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  FormErrorMessage,
  FormHelperText,
  IconButton,
} from "@chakra-ui/react";
import { FormikHelpers, FormikProps } from "formik";
import React, { useRef } from "react";
import { createUseStyles } from "react-jss";
import { UserPublic } from "../../types";

const useStyles = createUseStyles({
  profileImageContainer: {
    display: "flex",
    alignItems: "center",
    height: 200,
    width: 400,
    overflow: "hidden",
    marginBottom: 10,
  },
  profileImage: {
    width: "100%",
    height: "auto",
    objectFit: "cover",
  },
  profileImageDefault: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    backgroundColor: "#E2E8F0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#718096",
    fontSize: 80,
  },
});

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
  const classes = useStyles();
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className={classes.profileImageContainer}>
        {profileImage && (
          <img src={URL.createObjectURL(profileImage)} alt="profile" />
        )}
        {!profileImage && props.values.photo_url && (
          <img src={props.values.photo_url} alt="profile" />
        )}
        {!profileImage && !props.values.photo_url && (
          <div className={classes.profileImageDefault}>
            {`${currentUser.first_name[0]}${currentUser.last_name[0]}`}
          </div>
        )}
      </div>
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
