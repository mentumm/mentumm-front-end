import React, { useRef } from 'react';
import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Spacer,
  Icon,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { GamePS, StreetSignIcon, SuccessIcon } from '../../../assets/Icons/StyleIcons';
import { Link } from 'react-router-dom';
import ActionPlan from '../../ActionPlan';
import { CurrentUser } from '../../../types';

interface Props {
  currentUser: CurrentUser;
}

export const ServicesForYou = ({ currentUser }: Props) => {
  const { isOpen, onOpen: onActionPlanOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLDivElement>(null);

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
        {/* First Card */}
        <Card
          bgColor='brand.700'
          w='100%'
          pl={2}
          borderRadius='lg'
          position='relative'
          overflow='hidden'
          h='200px'
          as={Link}
          to='/search'
        >
          <CardBody display='flex' flexDirection='column' justifyContent='space-between' position='relative'>
            <Box maxW='70%' mb={2}>
              <Text fontSize='sm' color='gray.400' mt={2} mb={2} fontFamily='Montserrat' maxW='80%' lineHeight='16px'>
                Work with the dedicated coach of your choice
              </Text>
            </Box>
            <Box pb='10px'>
              <Text fontSize='20px' fontWeight='400' color='white' mb={1} fontFamily='Saira' lineHeight='32px'>
                Book Your Next
              </Text>
              <Text fontSize='24px' fontWeight='bold' color='white' fontFamily='Saira' lineHeight='shorter'>
                Coaching Session
              </Text>
            </Box>
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

        {/* Second Card */}
        <Card
          bgColor='brand.700'
          w='100%'
          pl={2}
          borderRadius='lg'
          position='relative'
          overflow='hidden'
          h='200px'
          _hover={{ cursor: 'pointer' }}
          as={Link}
          to='/certificate-program/1'
        >
          <CardBody display='flex' flexDirection='column' justifyContent='space-between' position='relative'>
            <Box maxW='70%' mb={2}>
              <Text fontSize='sm' color='gray.400' mt={2} mb={2} fontFamily='Montserrat' maxW='80%' lineHeight='16px'>
                Develop your skills in critical areas
              </Text>
            </Box>
            <Box pb='10px'>
              <Text fontSize='20px' fontWeight='400' color='white' mb={1} fontFamily='Saira' lineHeight='32px'>
                Complete a
              </Text>
              <Text fontSize='24px' fontWeight='bold' color='white' fontFamily='Saira' lineHeight='shorter'>
                Certificate Program
              </Text>
            </Box>
            <Icon
              as={SuccessIcon}
              boxSize='110px'
              color='blue.600'
              position='absolute'
              top='4'
              right='4'
            />
          </CardBody>
        </Card>

        <Spacer />

        {/* Third Card */}
        <Card
          bgColor='brand.700'
          w='100%'
          pl={2}
          borderRadius='lg'
          position='relative'
          overflow='hidden'
          h='200px'
          _hover={{ cursor: 'pointer' }}
          onClick={onActionPlanOpen}
          ref={btnRef}
        >
          <CardBody display='flex' flexDirection='column' justifyContent='space-between' position='relative'>
            <Box maxW='70%' mb={2}>
              <Text fontSize='sm' color='gray.400' mt={2} mb={2} fontFamily='Montserrat' maxW='80%' lineHeight='16px'>
                Organize your key issues and goals
              </Text>
            </Box>
            <Box pb='10px'>
              <Text fontSize='20px' fontWeight='400' color='white' mb={1} fontFamily='Saira' lineHeight='32px'>
                Update Your
              </Text>
              <Text fontSize='24px' fontWeight='bold' color='white' fontFamily='Saira' lineHeight='shorter'>
                Action Plan
              </Text>
            </Box>
            <Icon
              as={GamePS}
              boxSize='150px'
              color='blue.600'
              position='absolute'
              top='5'
              right='-5'
            />
          </CardBody>
        </Card>
      </Flex>
      <ActionPlan
        isOpen={isOpen}
        currentUser={currentUser}
        onClose={onClose}
      />
    </Box>
  );
};