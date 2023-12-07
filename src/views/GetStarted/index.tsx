// import {
//   Box,
//   Container,
//   Flex,
//   Heading,
//   Image,
//   Button,
//   Stack,
//   UnorderedList,
//   ListItem,
// } from "@chakra-ui/react";
// import React from "react";
// import { createUseStyles, DefaultTheme } from "react-jss";
// import { Link } from "react-router-dom";
// import { CurrentUserProps } from "../../types";
// import welcome from "./welcome.png";

// const useStyles = createUseStyles((theme: DefaultTheme) => ({
//   root: {
//     display: "flex",
//     width: "100%",
//   },
//   column: {
//     width: "100%",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   image: {
//     position: "relative",
//     width: "75%",
//     margin: "0 auto",
//   },
//   margin: {
//     marginBottom: "24px",
//   },
//   list: {
//     paddingLeft: 24,
//     fontSize: 24,
//     "& > li": {
//       marginBottom: 24,
//     },
//     "& > li::marker": {
//       fontWeight: "bold",
//     },
//   },
// }));

// const GetStarted: React.FC<CurrentUserProps> = ({ currentUser }) => {
//   const classes = useStyles();
//   const isCoach = currentUser?.role === 'coach';

//   return (
//     <div className={classes.root}>
//       <div className={classes.column}>
//         <Container maxW="100%">
//           <Flex
//             dir="row"
//             alignItems="center"
//             justifyContent="center"
//             gap={{ base: "0", md: "12" }}
//             direction={{ base: "column-reverse", md: "row" }}
//             minH="calc(100vh - 200px)"
//           >
//             <Stack
//               align={["center", "center", "flex-start", "flex-start"]}
//               alignItems="center"
//             >
//               <Box maxW="750px" position="relative">
//                 <Heading as="h2" size="xl" className={classes.margin}>
//                   Welcome to mentumm,{" "}
//                   {currentUser ? `${currentUser.first_name}!` : null}
//                 </Heading>
//                 <Heading
//                   as="h1"
//                   size="lg"
//                   className={classes.margin}
//                   fontWeight="normal"
//                 >
//                   {isCoach
//                     ? 'Great Coaching Opportunities, For You 😎'
//                     : 'Monthly Leadership Development, For You 😎'
//                   }

//                 </Heading>
//                 <UnorderedList className={classes.list}>
//                   <ListItem>
//                     <strong>
//                       {isCoach
//                         ? 'Your Profile: '
//                         : 'Leadership Workshop: '
//                       }
//                     </strong>
//                     {isCoach
//                       ? 'edit your public appearance'
//                       : 'learn a new skill each month'
//                     }
//                   </ListItem>
//                   <ListItem>
//                     <strong>
//                       {isCoach
//                         ? 'Coaching Sessions: '
//                         : 'One-on-One Coaching: '
//                       }
//                     </strong>
//                     {isCoach
//                       ? 'access past & future sessions'
//                       : 'learn a new skill each month'
//                     }
//                   </ListItem>
//                   <ListItem>
//                     <strong>
//                       {isCoach
//                         ? 'Leadership Workshops: '
//                         : 'Action Planning: '
//                       }
//                     </strong>
//                     {isCoach
//                       ? 'view the content users access'
//                       : 'organize your key issues and goals each month'
//                     }
//                   </ListItem>
//                 </UnorderedList>
//                 <Button
//                   as={Link}
//                   to={isCoach ? `/coach/${currentUser.id}/coaching-style` : "/get-started/coaching-style"}
//                   mt={2}
//                   padding={7}
//                   fontWeight="bold"
//                 >
//                   GET STARTED
//                 </Button>
//               </Box>
//             </Stack>
//             <Stack>
//               <Box maxW="md" width="448px">
//                 <Image
//                   src={welcome}
//                   alt="Person Searching for a Coach"
//                   maxW={{ base: "100%", md: "85%", lg: "100%" }}
//                   objectFit="cover"
//                 />
//               </Box>
//             </Stack>
//           </Flex>
//         </Container>
//       </div>
//     </div>
//   );
// };

import {
  Box,
  Flex,
  Heading,
  VStack,
  Image,
  Text,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { CurrentUserProps } from "../../types";
import logo from "../../assets/minimal-mentumm-logo.svg";
import { WaveLayer } from "../../components/WaveLayer";
import tealWave from '../../assets/teal-wave.svg';
import tealWaveSmall from '../../assets/teal-wave-small.svg';
import marineWave from '../../assets/marine-wave.svg';
import marineRectangle from '../../assets/marine-rectangle.svg';
import marineWaveSmall from '../../assets/marine-wave-small.svg';
import { WelcomeContent } from "../../components/WelcomeContent";

const GetStarted: React.FC<CurrentUserProps> = ({ currentUser }) => {
  const bgImage = 'https://mentummportal.sfo3.digitaloceanspaces.com/mentumm-splash.jpeg';
  const isCoach = currentUser?.role === 'coach';

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      height="100vh"
      bgImage={`url(${bgImage})`}
      bgPos="center center"
      bgSize="cover"
    >
      <VStack
        position="absolute"
        top="0"
        pt={8}
        textAlign="center"
      >
        <Image src={logo} boxSize="150px" />
        <Heading size="4xl" fontWeight="400" color="white">
          Welcome to mentumm,{' '}
          {currentUser
            ? (
              <Box as="span">
                <Text as="b">
                  {currentUser.first_name}
                </Text>
                {`!`}
              </Box>
            )
            : null}
        </Heading>
      </VStack>
      <Box>
        <WaveLayer src={tealWave} mb="12em" />
        <WaveLayer src={marineWave} mb="12em" />
        <WaveLayer src={marineRectangle} />
        <WaveLayer src={tealWaveSmall} mb="-25px" />
        <WaveLayer src={marineWaveSmall} mb="-25px" />
      </Box>
      <WelcomeContent />
      <Box max-height="38px" mt="2em">
        <Link
          to={isCoach ? `/coach/${currentUser.id}/coaching-style` : "/get-started/coaching-style"}
        >
          <Button
            borderRadius="30px"
            bgColor="white"
            colorScheme="brand"
            color="brand.500"
            _hover={{
              backgroundColor: "#2CBBBC",
              color: "white",
            }}
            max-height="38px"
            width="360px"
            fontWeight="bold"
            mt={2}
            padding={7}
          >
            GET STARTED
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};


export default GetStarted;
