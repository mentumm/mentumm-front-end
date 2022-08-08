import {
  Button,
  Center,
  Container,
  Divider,
  Hide,
  Image,
  Show,
} from "@chakra-ui/react";
import React from "react";
import { createUseStyles } from "react-jss";
import { useNavigate } from "react-router";
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
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <div className={classes.parentColumn}>
        <Container
          paddingTop={{ base: "4", md: "8" }}
          paddingBottom={{ base: "2", md: "6" }}
        >
          <Center>
            <Image
              src={landing_logo}
              alt="mentumm banner"
              w={{ base: "auto", lg: "500px" }}
            />
          </Center>
        </Container>
      </div>
      <div className={classes.container}>
        <LoginForm
          currentUser={props.currentUser}
          setCurrentUser={props.setCurrentUser}
        />
        <Hide below="md">
          <div style={{ paddingTop: "20px" }}>
            <Center height="350px">
              <Divider orientation="vertical" />
            </Center>
          </div>
          <RegisterAction />
        </Hide>
      </div>
      <Show below="lg">
        <Container paddingTop={{ base: "4" }}>
          Not a current user?{" "}
          <Button
            variant="link"
            colorScheme="brand"
            size="sm"
            onClick={() => navigate("/sign-up")}
          >
            Register now!
          </Button>
        </Container>
      </Show>
    </div>
  );
};

export default Login;
