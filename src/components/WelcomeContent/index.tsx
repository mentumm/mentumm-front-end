import React from 'react';
import {
  Box,
  Container,
  Heading,
  Stack,
  Text,
  Flex,
  Image,
  Divider,
} from '@chakra-ui/react'
import signpostIcon from '../../assets/Icons/signposts.svg';
import gamePsIcon from '../../assets/Icons/game-ps.svg';
import successIcon from '../../assets/Icons/success.svg';

export const WelcomeContent = ({ isCoach }) => {
  const userText = [
    {
      heading: 'One-on-One Coaching',
      description: 'Work with dedicated coach of your choice',
      icon: signpostIcon
    },
    {
      heading: 'Leadership Workshops',
      description: 'Develop your skills in critical areas',
      icon: successIcon,
    },
    {
      heading: 'Action Planning',
      description: 'Organize your key issues and goals',
      icon: gamePsIcon
    },
  ]

  const coachText = [
    {
      heading: 'Coaching Sessions: ',
      description: 'access past & future sessions',
      icon: signpostIcon
    },
    {
      heading: 'Your Profile: ',
      description: 'Edit your public appearance',
      icon: successIcon
    },
    {
      heading: 'Leadership Workshop:',
      description: 'view the content users access',
      icon: gamePsIcon,
    },
  ]

  const dynamicText = isCoach ? coachText : userText;

  return (
    <Container
      centerContent
      mt="20em"
      display="flex"
      maxW="container.lg"
      zIndex="2"
      mb={2}
    >
      <Stack>
        <Heading color='white' mx="auto" pb={8}>
          You now have access to ...
        </Heading>
        {dynamicText.map(content => (
          <Box>
            <Flex justifyContent="space-evently">
              <Box
                pt={4}
                minW="container.sm"
              >
                <Text fontSize="2xl" fontWeight="700" color="white" fontFamily="Montserrat">
                  {content.heading}
                </Text>
                <Text pb={1} color="white">
                  {content.description}
                </Text>
              </Box>
              <Image src={content.icon} />
            </Flex>
            <Divider borderColor="#2CBBBC" opacity={1} />
          </Box>
        ))}
      </Stack>
    </Container>
  )
}

