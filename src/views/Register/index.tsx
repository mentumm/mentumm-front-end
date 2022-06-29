import { Center, Container, Image } from "@chakra-ui/react";
import React from "react";
import { createUseStyles } from "react-jss";
import RegisterForm from "../../components/RegisterForm";
import { UserLoginProps } from "../../types";
import landing_logo from "./landing_logo.png";

const useStyles = createUseStyles({
  root: {
    position: "relative",
    width: "100%",
    textAlign: "center",
  },
  parentColumn: {
    display: "inline-block",
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
          <Container
            maxW="md"
            paddingTop={{ base: "4", md: "8" }}
            paddingBottom={{ base: "2", md: "6" }}
          >
            <Center>
              <Image
                src={landing_logo}
                alt="Mentumm banner"
                // maxW="md"
                w={{ base: "auto", lg: "500px" }}
              />
            </Center>
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
