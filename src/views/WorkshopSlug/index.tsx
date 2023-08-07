import React, { useEffect, useState } from "react";
import { menApiAuthClient } from "../../clients/mentumm";
import { Workshop } from "../../types";
import { Button, Heading, Text, Icon, Spinner } from "@chakra-ui/react";
import { GoDesktopDownload } from "react-icons/go";
import VimeoVideo from "../../components/WorkshopSlug/VimeoVideo";
import envConfig from "../../envConfig";
import { mixpanelEvent } from "../../helpers";
import { useParams } from "react-router";
import PageWrapper from "../../components/Wrappers/PageWrapper";

const WorkshopSlug: React.FC = () => {
  const [workshop, setWorkshop] = useState<Workshop>(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    const getWorkshop = async () => {
      try {
        setLoading(true);

        const results = await menApiAuthClient().get<Workshop>(
          `${envConfig.API_URL}/v1/workshops/${slug}`
        );

        setWorkshop(results.data);
      } catch (error) {
        throw new Error("Could not load Workshops!");
      } finally {
        setLoading(false);
      }
    };
    getWorkshop();
  }, [slug]);

  const downloadWorkbook = (workshop: Workshop) => {
    window.open(workshop.workbook_url);

    mixpanelEvent("Clicked Download Workbook", {
      "Workshop Slug": workshop.slug,
    });
  };

  const handleOnPlay = (workshop: Workshop) => {
    mixpanelEvent("Played Workshop Video", {
      "Workshop Slug": workshop.slug,
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
    <PageWrapper>
      <Heading size="lg" textAlign="left">
        Leadership Workshop
      </Heading>

      <Text mt={4} mb={4}>
        Please watch the following video and follow the content by downloading
        the workbook below:
      </Text>

      {loading ? <Spinner /> : <WorkshopVideo workshop={workshop} />}
    </PageWrapper>
  );
};

export default WorkshopSlug;
