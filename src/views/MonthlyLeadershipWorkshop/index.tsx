import React, { useEffect, useState } from "react";
import { menApiAuthClient } from "../../clients/mentumm";
import { Workshop } from "../../types";
import {
  Button,
  Container,
  Heading,
  Text,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import { GoDesktopDownload } from "react-icons/go";
import VimeoVideo from "../../components/MonthlyLeadershipWorkshop/VimeoVideo";
import envConfig from "../../envConfig";
import { mixpanelEvent } from "../../helpers";

const MonthlyLeadershipWorkshop: React.FC = () => {
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

  const downloadWorkbook = (workshop: Workshop) => {
    window.open(workshop.workbook_url);

    mixpanelEvent("Clicked Download Workbook", {
      "Workshop Id": workshop.id,
    });
  };

  const handleOnPlay = (workshop: Workshop) => {
    mixpanelEvent("Played Workshop Video", {
      "Workshop Id": workshop.id,
    });
  };

  type WorkShopVideoProps = {
    workshop: Workshop;
  };

  const WorkshopVideo: React.FC<WorkShopVideoProps> = ({ workshop }) => {
    return (
      <>
        <VimeoVideo
          videoId={workshop.vimeo_id}
          onPlay={() => handleOnPlay(workshop)}
        />

        <Heading size="md" textAlign="left" mt={8}>
          Workbook for this Workshop (please download)
        </Heading>

        <Button mt={4} onClick={() => downloadWorkbook(workshop)}>
          Download Workbook&nbsp;
          <Icon as={GoDesktopDownload} />
        </Button>
      </>
    );
  };

  return (
    <Container maxW={1270}>
      <Heading size="lg" textAlign="left" mt={8}>
        Your Monthly Leadership Workshop
      </Heading>

      <Text mt={4} mb={4}>
        Please watch the following video and follow the content by downloading
        the workbook below:
      </Text>

      {loading ? <Spinner /> : <WorkshopVideo workshop={workshops[0]} />}
    </Container>
  );
};

export default MonthlyLeadershipWorkshop;
