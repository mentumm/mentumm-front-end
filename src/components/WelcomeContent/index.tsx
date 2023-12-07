import React from 'react';
import {
  Box,
  Container,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'

export const WelcomeContent = () => {
  const contentText = [
    {
      heading: 'One-on-One Coaching',
      description: 'Work with dedicated coach of your choice'
    },
    {
      heading: 'Leadership Workshop',
      description: 'Develop your skills in critical areas'
    },
    {
      heading: 'Action Planning',
      description: 'Organize your key issues and goals'
    },
  ]

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
        {contentText.map(content => (
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

