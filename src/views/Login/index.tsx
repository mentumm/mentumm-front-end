import { Center, Container, Divider, Image } from "@chakra-ui/react";
import React from "react";
import { createUseStyles } from "react-jss";
import LoginForm from "../../components/LoginForm";
import RegisterAction from "../../components/RegisterAction";
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
    width: "100%",
  },
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
  },
});

const Login: React.FC<UserLoginProps> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.parentColumn}>
        <Container
          paddingTop={{ base: "4", md: "8" }}
          paddingBottom={{ base: "2", md: "6" }}
        >
          <Center>
            <Image src={landing_logo} alt="Mentumm banner" maxW="md" />
          </Center>
        </Container>
      </div>
      <div className={classes.container}>
        <LoginForm
          currentUser={props.currentUser}
          setCurrentUser={props.setCurrentUser}
        />
        <div style={{ paddingTop: "80px" }}>
          <Center height="350px">
            <Divider orientation="vertical" />
          </Center>
        </div>
        <RegisterAction />
      </div>
    </div>
  );
};

export default Login;
