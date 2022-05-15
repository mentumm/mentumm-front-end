import { Center, Container, Divider, Heading, Stack } from "@chakra-ui/react";
import React from "react";
import { createUseStyles } from "react-jss";
import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterAction from "../../components/RegisterAction";

const useStyles = createUseStyles({
  root: {
    position: "relative",
    width: "100%",
    textAlign: "center",
  },
  parentColumn: {
    display: "inline-block",
    width: "80%",
    paddingTop: "8vh",
  },
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
  },
});

const Login: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.parentColumn}>
        <div className={classes.container}>
          <Container maxW="md" py={{ base: "12", md: "24" }}>
            <Stack spacing="8">
              <Heading textAlign="center">Growth Portal Login</Heading>
            </Stack>
          </Container>
        </div>
        <div className={classes.container}>
          <LoginForm />
          <div style={{ paddingTop: "80px" }}>
            <Center height="350px">
              <Divider orientation="vertical" />
            </Center>
          </div>
          <RegisterAction />
        </div>
      </div>
    </div>
  );
};

export default Login;
