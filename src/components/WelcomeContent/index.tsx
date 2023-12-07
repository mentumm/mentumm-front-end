import React from 'react';
import {
  Box,
  Container,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'

export const WelcomeContent = ({ isCoach }) => {
  const userText = [
    {
      heading: 'One-on-One Coaching',
      description: 'Work with dedicated coach of your choice'
    },
    {
      heading: 'Leadership Workshops',
      description: 'Develop your skills in critical areas'
    },
    {
      heading: 'Action Planning',
      description: 'Organize your key issues and goals'
    },
  ]

  const coachText = [
    {
      heading: 'Coaching Sessions: ',
      description: 'access past & future sessions'
    },
    {
      heading: 'Your Profile: ',
      description: 'Edit your public appearance'
    },
    {
      heading: 'Leadership Workshop:',
      description: 'view the content users access'
    },
  ]

  const dynamicText = isCoach ? coachText : userText;

  return (
    <Container
      centerContent
      mt="16em"
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
          <Box
            pt={4}
            borderBottom="1px solid #2CBBBC"
            minW="container.sm"
          >
            <Text fontSize="2xl" fontWeight="700" color="white" fontFamily="Montserrat">
              {content.heading}
            </Text>
            <Text pb={1} color="white">
              {content.description}
            </Text>
          </Box>
        ))}
      </Stack>
    </Container>
  )
}

