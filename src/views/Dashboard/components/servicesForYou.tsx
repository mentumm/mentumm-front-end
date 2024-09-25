import React from 'react';
import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Spacer,
  Icon,
  Text,
} from '@chakra-ui/react';
import { StreetSignIcon } from '../../../assets/Icons/StyleIcons';

export const ServicesForYou = () => {
  return (
    <Box>
      <Heading
        color='white'
        size='md'
        fontFamily='Montserrat'
        fontWeight='400'
        borderBottom='2px solid #2CBBBC'
        pb='0.5em'
      >
        Services for You
      </Heading>
      <Flex mt='1em' justifyContent='space-evenly' gap='0.25em'>
        <Card bgColor='brand.700' w='100%' pl={2} borderRadius='lg' position='relative' overflow='hidden' h='200px'>
          <CardBody display='flex' flexDirection='column' justifyContent='space-between' position='relative'>
            <Box maxW='70%' mb={2}>
              {/* Top text */}
              <Text fontSize='sm' color='gray.400' mt={2} mb={2} fontFamily='Montserrat' maxW='80%' lineHeight='16px'>
                Work with the dedicated coach of your choice
              </Text>
            </Box>
            <Box pb='10px' >
              {/* Middle text */}
              <Text fontSize='20px' fontWeight='400' color='white' mb={1} fontFamily='Saira' lineHeight='32px'>
                Book Your Next
              </Text>
              {/* Bottom text */}
              <Text fontSize='24px' fontWeight='bold' color='white' fontFamily='Saira' lineHeight='shorter'>
                Coaching Session
              </Text>
            </Box>

            {/* Icon */}
            <Icon
              as={StreetSignIcon}
              boxSize='164px'
              color='blue.600'
              position='absolute'
              top='0'
              right='-2'
              opacity={0.15}
            />
          </CardBody>
        </Card>
        <Spacer />
        <Card bgColor='blue' w='100%'>
          <CardBody>

          </CardBody>
        </Card>
        <Spacer />
        <Card bgColor='green' w='100%'>
          <CardBody>

          </CardBody>
        </Card>
      </Flex>
    </Box>
  )
}