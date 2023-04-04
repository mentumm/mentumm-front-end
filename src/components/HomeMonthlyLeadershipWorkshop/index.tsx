import React, { useEffect, useState } from "react";
import { Heading, Spinner, Box, Image, Icon } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { menApiAuthClient } from "../../clients/mentumm";
import envConfig from "../../envConfig";
import { Workshop } from "../../types";
import logo from "../../assets/mentumm-logo.svg";
import { createUseStyles } from "react-jss";
import { FaPlay } from "react-icons/fa";

const useStyles = createUseStyles({
  video: {
    width: "375px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "black",
  },
  controlsContainer: {
    display: "flex",
    marginTop: "16px",
    width: "100%",
  },
  play: {
    width: "56px",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px 6px",
    borderRadius: "4px",
    marginRight: "8px",
  },
  scrubberContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    padding: "12px 8px",
    borderRadius: "4px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: "1",
  },
  scrubber: {
    width: "100%",
    height: "4px",
    borderRadius: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    margin: "0 8px",
  },
});

type WorkShopThumbnailProps = {
  workshop: Workshop;
};

const WorkShopThumbnail = ({ workshop }: WorkShopThumbnailProps) => {
  const classes = useStyles();

  return (
    <Link to="/monthly-leadership-workshop">
      <Box
        className={classes.video}
        p={2}
        shadow={{ md: "base" }}
        rounded={{ sm: "lg" }}
        _hover={{
          shadow: "lg",
        }}
      >
        <Image src={logo} mt={2} width={150} />
        <Heading mt={6} mb={6} size="md">
          {workshop.name}
        </Heading>
        <Box className={classes.controlsContainer}>
          <Box className={classes.play}>
            <Icon as={FaPlay} width={3} height={3} color="#FFF" />
          </Box>
          <Box className={classes.scrubberContainer}>
            <Box className={classes.scrubber}></Box>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export const HomeMonthlyLeadershipWorkshop = () => {
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

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {workshops.length ? (
        <Box>
          <Heading fontWeight="normal" fontSize={24} mt={12} mb={6}>
            Monthly Leadership Workshop
          </Heading>
          <WorkShopThumbnail workshop={workshops[0]} />
        </Box>
      ) : null}
    </>
  );
};
