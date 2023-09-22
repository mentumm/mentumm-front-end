import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Center,
  Heading,
  HStack,
  Image,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import envConfig from '../../../../envConfig';
import { Workshop } from '../../../../types';
import { menApiAuthClient } from '../../../../clients/mentumm';

export const WorkshopsSection = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);

  const getRandomTwoWorkshops = arr => {
    const firstIndex = Math.floor(Math.random() * arr.length);
    let secondIndex;

    do {
      secondIndex = Math.floor(Math.random() * arr.length);
    } while (secondIndex === firstIndex);

    return [arr[firstIndex], arr[secondIndex]];
  };

  useEffect(() => {
    const getWorkshops = async () => {
      try {
        const results = await menApiAuthClient().get<Workshop[]>(
          `${envConfig.API_URL}/v1/workshops`
        );
        // rendering 2 random workshops for the time being.
        setWorkshops(getRandomTwoWorkshops(results.data));
      } catch (error) {
        throw new Error("Could not load Workshops!");
      }
    };
    getWorkshops();
  }, []);

  return (
    <Box shadow="base">
      <Container
        minW="100%"
        mt={4}
        bgColor="#3168B2"
      >
        <Center>
          <Heading
            fontWeight="regular"
            size="sm"
            my={3}
            color="white"
          >
            WORKSHOPS
          </Heading>
        </Center>
      </Container>
      <Center mt={4} >
        <HStack>
          {workshops.map((workshop) => (
            <Link to={`/workshops/${workshop.slug}`}>
              <Image
                src={workshop.thumbnail_url}
                alt={workshop.name}
                h="12.5em"
                w="23.5em"
              />
            </Link>
          ))}
        </HStack>
      </Center>
      <Center>
        <Button
          as={Link}
          minW="25%"
          to="/search"
          size="lg"
          borderRadius="3xl"
          my={8}
          bgColor="#3168B2"
          fontSize="md"
          fontWeight="regular"
        >
          Download Workbook
        </Button>
      </Center>
    </Box>
  )
}