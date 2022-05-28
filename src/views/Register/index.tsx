import { Container, Heading, Stack } from "@chakra-ui/react";
import React from "react";
import { createUseStyles } from "react-jss";
import RegisterForm from "../../components/RegisterForm";
import { UserLoginProps } from "../../types";

const useStyles = createUseStyles({
  root: {
    position: "relative",
    width: "100%",
    textAlign: "center",
  },
  parentColumn: {
    display: "inline-block",
    width: "80%",
  },
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
  },
});

const Register: React.FC<UserLoginProps> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.parentColumn}>
        <div className={classes.container}>
          <Container maxW="md" py={{ base: "12", md: "24" }}>
            <Stack spacing="8">
              <Heading textAlign="center">Growth Portal Sign Up</Heading>
            </Stack>
          </Container>
        </div>
        <div className={classes.container}>
          <RegisterForm
            currentUser={props.currentUser}
            setCurrentUser={props.setCurrentUser}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
