import React from 'react';
import { Container, HStack, Image, VStack, Text, Center } from '@chakra-ui/react';
import homeOverviewIcon from '../../assets/home-overview-icon.svg';
import coachingIcon from '../../assets/coaching-icon.svg';
import workshopIcon from '../../assets/workshop-icon.svg';
import planningIcon from '../../assets/planning-icon.svg';
import { Link } from 'react-router-dom';

export const HomeNav = () => {
  return (
    <Container minW="100%" my={8} >
      <Center>
        <HStack spacing={24}>
          <VStack as={Link} to="/">
            <Image src={homeOverviewIcon} alt="home-overview" />
            <Text fontSize="sm" >
              MY OVERVIEW
            </Text>
          </VStack>
          <VStack as={Link} to="#coaching">
            <Image src={coachingIcon} alt="coaching" />
            <Text fontSize="sm" color="#8A4FFF" >
              COACHING
            </Text>
          </VStack>
          <VStack as={Link} to="#workshops">
            <Image src={workshopIcon} alt="workshop" />
            <Text fontSize="sm" color="#3168B2" >
              WORKSHOPS
            </Text>
          </VStack>
          <VStack as={Link} to="#planning">
            <Image src={planningIcon} alt="planning" />
            <Text fontSize="sm" color="#861657" >
              PLANNING
            </Text>
          </VStack>
        </HStack>
      </Center>
    </Container>
  )
}