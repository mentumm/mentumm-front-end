import React, { useEffect, useState } from "react";
import { menApiAuthClient } from "../../clients/mentumm";
import { Workshop } from "../../types";
import { Link } from "react-router-dom";
import {
  Heading,
  Text,
  Spinner,
  Image,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import envConfig from "../../envConfig";
import PageWrapper from "../../components/PageWrapper";

const WorkshopsPage: React.FC = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWorkshops = async () => {
      try {
        setLoading(true);

        const results = await menApiAuthClient().get<Workshop[]>(
          `${envConfig.API_URL}/v1/workshops`
        );

        setWorkshops(results.data);
      } catch (error) {
        throw new Error("Could not load Workshops!");
      } finally {
        setLoading(false);
      }
    };
    getWorkshops();
  }, []);

  const WorkShopDetails = () => {
    return (
      <Grid templateColumns="repeat(3, 1fr)" gap={8}>
        {workshops.map((workshop) => (
          <GridItem key={workshop.id}>
            <Link to={`/workshops/${workshop.slug}`}>
              <Image src={workshop.thumbnail_url} alt={workshop.name} />
            </Link>
          </GridItem>
        ))}
      </Grid>
    );
  };

  return (
    <PageWrapper>
      <Heading size="lg" textAlign="left">
        All Leadership Workshops
      </Heading>

      <Text mt={4} mb={4}>
        Select from the Workshops below to level up your leadership skills.
      </Text>

      {loading ? <Spinner /> : <WorkShopDetails />}
    </PageWrapper>
  );
};

export default WorkshopsPage;
